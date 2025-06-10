<!-- 
显示单个文章缩略图、标题、摘要、统计信息、分类、标签等
-->

<template>
    <div class="post-container px-2 py-2 flex flex-col gap-3">
        <div class="flex flex-row items-center gap-4 max-h-36">
            <!-- 文章缩略图 -->
            <a v-if="post.thumbnail" :href="post.path" class="h-full min-w-16 max-w-36 sm:max-w-48">
                <img class="rounded-md object-cover transition-all hover:scale-105 hover:shadow-md"
                    :src="post.path + post.thumbnail" :alt="post.thumbnail_alt">
            </a>

            <div class="flex flex-col gap-1">
                <!-- 文章标题 -->
                <a :href="post.path">
                    <h2
                        class="text-[var(--c-80)] font-bold text-xl hover:text-[var(--c-theme)] transition-all hover:underline">
                        {{ post.title }}
                    </h2>
                </a>

                <!-- 文章摘要 -->
                <div v-if="post.excerpt"
                    class="post-excerpt post-content text-[var(--c-60)] text-sm line-clamp-5 border-b-1 border-[var(--c-sep)]">
                    {{ post.excerpt }}
                </div>
            </div>
        </div>

        <!-- 文章统计信息 -->
        <div class="flex flex-wrap items-center gap-x-2 text-sm text-[var(--c-70)]">
            <span class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:add-circle-fill" width="16" />
                <time class="w-max">{{ formatDate(post.date) }}</time>
            </span>

            <span v-if="post.updated" class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:refresh-3-fill" width="16" />
                <time class="w-max">{{ formatDate(post.updated) }}</time>
            </span>

            <span class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:book-2-fill" width="16" />
                <p class="w-max">{{ wordCount }} words, {{ readingTime }} min</p>
            </span>

            <!-- 分类 -->
            <span v-if="post.categories?.length" class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:classify-2-fill" width="16"
                    class="group-hover:scale-125 transition-transform group-hover:text-[var(--c-theme)]" />
                <template v-for="(category, index) in post.categories" :key="index">
                    <a class="underline underline-offset-2" :href="category.path.toLowerCase()">
                        {{ category.name }}
                    </a>
                </template>
            </span>
        </div>

        <!-- 标签 -->
        <div v-if="showTags && post.tags?.length">
            <TagList :tags="post.tags" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import TagList from '@/components/post/PostTag.vue'
import type { Post } from '@/stores/post'


const props = defineProps<{
    post: Post
    showTags?: boolean
}>()

const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0]
}

const wordCount = computed(() => {
    return props.post.content?.split(/\s+/).length || 0
})

const readingTime = computed(() => {
    return Math.ceil(wordCount.value / 400) // 假设阅读速度为每分钟400字
})
</script>
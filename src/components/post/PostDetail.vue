<!-- 单篇文章的详细信息 -->
<template>
    <!-- <FancyboxGallery />
    <TableOfContents /> -->
    <section class="px-6 max-w-prose mx-auto md:px-0">
        <!-- 文章头部 -->
        <header class="py-4">
            <div class="flex flex-col gap-2 pt-4 md:pt-6">
                <!-- 标题 -->
                <div id="article-title" class="leading-snug">
                    <p class="text-3xl font-bold text-[var(--c-100)] mb-4">{{ post.title }}</p>
                </div>

                <!-- 元数据 -->
                <div>
                    <section class="flex flex-col gap-x-2 gap-y-1 text-sm text-[var(--c-100)]">
                        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <!-- 日期 -->
                            <div class="flex items-center gap-1">
                                <Icon width="18" icon="mingcute:add-circle-fill" />
                                Created: <time class="w-max">{{ formatDate(post.date) }}</time>
                            </div>
                            <div v-if="post.updated" class="flex items-center gap-1">
                                <Icon width="18" icon="mingcute:refresh-3-fill" />
                                Edited: <time class="w-max">{{ formatDate(post.updated) }}</time>
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-x-3 gap-y-3">

                            <!-- 字数统计 -->
                            <span class="flex items-center gap-1">
                                <Icon width="18" icon="mingcute:book-2-fill" />
                                <span>{{ post.wordCount }} words, {{ post.readTime }} min</span>
                            </span>

                            <!-- 分类 -->
                            <span class="flex flex-row items-center gap-1 group hover:underline">
                                <Icon class="transition-all group-hover:scale-125 mr-0" width="18"
                                    icon="mingcute:classify-2-fill" />
                                <a :href="`/categories/${post.category}`" class="article-category">
                                    {{ post.category }}
                                </a>
                            </span>
                        </div>
                    </section>
                </div>

                <!-- 标签 -->
                <div v-if="post.tags">
                    <TagList :tags="post.tags" />
                </div>
            </div>
        </header>

        <!-- 目录 -->
        <Toc v-if="post.content" :content="post.content" />

        <!-- 文章内容 -->
        <article class="post-content prose m-auto dark:prose-invert" v-html="post.content"></article>

        <!-- 上一篇/下一篇导航 -->
        <!-- <div class="flex justify-between mt-4 pt-4 border-t border-[var(--c-sep)] text-sm gap-2 text-[var(--c-50)]">
            <div v-if="post.prev">
                <a :href="post.prev.path"
                    class="transition-all flex justify-center hover:-translate-x-1 hover:text-[var(--c-80)]">
                    <Icon width="20" icon="mingcute:left-fill" data-inline="false" />
                    {{ post.prev.title }}
                </a>
            </div>
            <div v-if="post.next">
                <a :href="post.next.path"
                    class="flex justify-center hover:translate-x-1 transition-transform hover:text-[var(--c-100)]">
                    {{ post.next.title }}
                    <Icon width="20" icon="mingcute:right-fill" data-inline="false" />
                </a>
            </div>
        </div> -->

    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import type { Post } from '@/stores/post'
import { usePostStore, formatDate } from '@/stores/post'
import TagList from '@/components/post/PostTag.vue'
// import TableOfContents from '@/components/post/TableOfContents.vue'
// import FancyboxGallery from '@/components/post/FancyboxGallery.vue'


const route = useRoute()
const postStore = usePostStore()

const post = computed(() => {
    if (route.path.startsWith('/archives/')) {
        const archiveId = route.params.archive as string
        return postStore.posts.find(post => post.id === archiveId) as Post;
    }
    return {} as Post
})

</script>

<style scoped></style>
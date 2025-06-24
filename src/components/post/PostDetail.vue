<!-- 单篇文章的详细信息 -->
<template>
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
        <!-- <Toc v-if="post.content" :content="post.content" /> -->

        <!-- 文章内容 -->
        <!-- <article class="post-content prose m-auto dark:prose-invert" v-html="post.content"></article> -->
        <MarkdownRenderer :source="post.content" />

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
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import type { Post } from '@/types/post'
import { createEmptyPost } from '@/types/post'
import { usePostStore, formatDate } from '@/stores/post'
import TagList from '@/components/post/PostTag.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
// import TableOfContents from '@/components/post/TableOfContents.vue'
// import FancyboxGallery from '@/components/post/FancyboxGallery.vue'


const route = useRoute()
const postStore = usePostStore()

// 在上面 <template> 中，如果直接使用 post.xxx，但是 post 实际上对应的值还没加载的话，会直接导致页面崩溃而不会执行挂载，因此可以先给定一个默认值
const post = ref<Post>(createEmptyPost())

// 通过挂载组件获取数据，如果没有拿到对应的数据，给出定一个默认的数据值
onMounted(async () => {
    const archiveId = route.params.archive as string

    if (postStore.posts.length === 0) {
        await postStore.fetchPosts()
    }

    post.value = postStore.getPostById(archiveId) ?? createEmptyPost()
})

</script>

<style scoped></style>
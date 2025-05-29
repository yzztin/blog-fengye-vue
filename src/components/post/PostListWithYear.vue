<template>
    <section class="px-2 py-8 max-w-prose mx-auto gap-4 grid grid-cols-1">
        <template v-for="(yearGroup, year) in groupedPosts" :key="year">
            <!-- 年份背景 -->
            <div class="relative pointer-events-none h-[30px] -z-50">
                <div class="absolute -top-6 w-[100%]">
                    <p class="text-clip overflow-hidden text-9xl font-extrabold text-[var(--c-theme)] opacity-10 dark:opacity-20"
                        :class="yearAlignCenter ? 'text-center' : '-translate-x-3'">
                        {{ year }}
                    </p>
                </div>
            </div>

            <!-- 该年份的文章列表 -->
            <div v-for="post in yearGroup" :key="post.id" class="w-full">
                <PostListItem :post="post" :show-tags="showTags" />
            </div>
        </template>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PostListItem from './PostListItem.vue'

interface Post {
    id: string
    title: string
    date: Date
    excerpt: string
    tags?: string[]
    category?: string
}

const props = defineProps<{
    posts: Post[]
    showTags?: boolean
    yearAlignCenter?: boolean
}>()

// 按年份分组文章
const groupedPosts = computed(() => {
    const groups: Record<string, Post[]> = {}

    props.posts
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .forEach(post => {
            const year = post.date.getFullYear().toString()
            if (!groups[year]) {
                groups[year] = []
            }
            groups[year].push(post)
        })

    return groups
})
</script>
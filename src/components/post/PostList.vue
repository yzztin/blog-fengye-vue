<!--
1. 按日期排序文章
2. 显示年份北京
3. 使用网格布局展示文章列表
-->

<template>
    <section class="px-2 py-8 max-w-prose mx-auto gap-4 grid grid-cols-1">
        <template v-for="(post, index) in sortedPosts" :key="index">
            <!-- 年份背景 -->
            <!-- <div v-if="shouldShowYear(post)" class="relative pointer-events-none h-[30px] -z-50"> -->
            <div v-if="shouldShowYear(post)" class="relative h-[30px]">
                <div class="absolute -top-6 w-[100%]">
                    <p
                        class="text-center text-clip overflow-hidden text-9xl font-extrabold text-[var(--c-theme)] opacity-10 dark:opacity-20">
                        {{ getYear(post.date) }}
                    </p>
                </div>
            </div>
            <!-- 文章项 -->
            <PostListItem :post="post" :show-tags="showTags" />
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
    featured?: boolean
    path?: string
    content?: string
    thumbnail?: string
    thumbnail_alt?: string
    updated?: Date
    categories?: Array<{ name: string; path: string }>
}

const props = defineProps<{
    posts: Post[]
    showTags?: boolean
}>()

// 根据日期排序文章
const sortedPosts = computed(() => {
    // 扩展运算符 [...props.posts]，作用是创建 props.posts 数组的一个浅拷贝。
    // getTime() 获取时间戳
    return [...props.posts].sort((a, b) => b.date.getTime() - a.date.getTime())
})

const getYear = (date: Date) => {
    console.log('获取年份，日期:', date)
    return new Date(date).getFullYear()
}

// 判断是否需要显示年份背景，只在第一次出现该年份时显示
const shouldShowYear = (post: Post) => {
    const currentYear = getYear(post.date)
    // indexOf 方法找到当前帖子 post 在 sortedPosts.value 数组中的索引位置
    const prevPost = sortedPosts.value[sortedPosts.value.indexOf(post) - 1]
    return !prevPost || getYear(prevPost.date) !== currentYear
}
</script>
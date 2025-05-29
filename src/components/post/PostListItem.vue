<template>
    <article class="mb-8">
        <h2 class="text-2xl font-bold mb-2">
            <router-link :to="`/post/${post.id}`" class="hover:text-[var(--c-theme)]">
                {{ post.title }}
            </router-link>
        </h2>

        <div class="flex items-center text-[var(--c-50)] text-sm mb-2">
            <time :datetime="post.date.toISOString()">
                {{ formatDate(post.date) }}
            </time>
            <span v-if="post.category" class="mx-2">·</span>
            <span v-if="post.category" class="hover:text-[var(--c-theme)]">
                {{ post.category }}
            </span>
        </div>

        <p class="text-[var(--c-60)] mb-4">{{ post.excerpt }}</p>

        <div v-if="showTags && post.tags?.length" class="flex flex-wrap gap-2">
            <router-link v-for="tag in post.tags" :key="tag" :to="`/tag/${tag}`"
                class="text-sm px-2 py-1 bg-[var(--c-10)] text-[var(--c-60)] rounded hover:bg-[var(--c-theme)] hover:text-white">
                {{ tag }}
            </router-link>
        </div>
    </article>
</template>

<script setup lang="ts">
interface Post {
    id: string
    title: string
    date: Date
    excerpt: string
    tags?: string[]
    category?: string
}

defineProps<{
    post: Post
    showTags?: boolean
}>()

// 格式化日期
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date)
}
</script>
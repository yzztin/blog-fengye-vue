<template>
    <div class="space-y-8">
        <article v-for="post in posts" :key="post.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-2xl font-bold mb-4">
                <router-link :to="'/post/' + post.id" class="hover:text-primary">
                    {{ post.title }}
                </router-link>
            </h2>
            <div class="text-gray-600 dark:text-gray-400 mb-4">
                {{ post.excerpt }}
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span class="mr-4">{{ post.date }}</span>
                <span class="mr-4">{{ post.category }}</span>
                <div v-if="showTags" class="flex space-x-2">
                    <span v-for="tag in post.tags" :key="tag" class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
interface Post {
    id: string
    title: string
    excerpt: string
    date: string
    category: string
    tags: string[]
}

defineProps<{
    posts: Post[]
    showTags?: boolean
}>()
</script>
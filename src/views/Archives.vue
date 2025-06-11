<template>
    <PostList :posts="postStore.posts" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PostList from '@/components/post/PostList.vue'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()


onMounted(async () => {
    console.log("调用 onMounted")
    await postStore.fetchPosts()
    console.log('Posts 结果:', postStore.posts)
})
</script>


<style scoped></style>
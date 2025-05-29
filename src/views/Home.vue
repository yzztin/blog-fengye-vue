<template>
  <div class="container">
    <Profile />
    <Divider />
    <FeaturedPosts />
    <PostListWithYear :posts="posts" :show-tags="true" :year-align-center="true" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Profile from '@/components/home/Profile.vue'
import Divider from '@/components/common/Divider.vue'
import FeaturedPosts from '@/components/home/FeaturedPosts.vue'
import PostListWithYear from '@/components/post/PostListWithYear.vue'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const { posts } = postStore

onMounted(async () => {
  await postStore.fetchPosts()
})
</script>
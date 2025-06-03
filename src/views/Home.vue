<template>
  <div class="container mx-auto">
    <Profile />
    <Divider />
    <FeaturedPosts />

    <!-- <PostListWithYear :posts="posts" :show-tags="true" :year-align-center="true" /> -->
  </div>
</template>

<script setup lang="ts">
import Profile from '@/components/home/Profile.vue'
import Divider from '@/components/common/Divider.vue'
import FeaturedPosts from '@/components/home/FeaturedPosts.vue'
// import PostListWithYear from '@/components/post/PostListWithYear.vue'


</script>
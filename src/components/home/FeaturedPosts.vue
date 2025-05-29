<template>
  <div>
    <Divider />
    <div class="flex flex-row items-center gap-2 text-[var(--c-50)]">
      <iconify-icon width="28" icon="mingcute:star-fill"></iconify-icon>
      <p class="text-center text-3xl">Featured Posts</p>
    </div>
    <PostList :posts="featuredPosts" :show-tags="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Divider from '../common/Divider.vue'
import PostList from './PostList.vue'

const featuredPosts = ref([
  // 精选文章数据
])
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-row items-center gap-2 text-[var(--c-50)]">
      <!-- 这里是通过 cdn 使用 iconify -->
      <!-- <span class="iconify" data-icon="mingcute:star-fill" style="font-size: 28px;"></span> -->
      <iconify-icon width="28" icon="mingcute:star-fill"></iconify-icon>

      <!-- 这是使用 Icon 组件 -->
      <Icon icon="mingcute:star-fill" width="28" />

      <p class="text-center text-3xl">Featured Posts</p>
    </div>
  </div>
  <PostList :posts="featuredPosts" :show-tags="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'  // 引入 Icon 组件
import PostList from './PostList.vue'


// 模拟精选文章数据
const featuredPosts = ref([
  {
    id: '1',
    title: '精选文章示例',
    excerpt: '这是一篇精选文章的摘要...',
    date: '2024-03-29',
    category: '技术',
    tags: ['Vue3', 'TypeScript']
  }
])
</script>

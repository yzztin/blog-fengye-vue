<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="text-xl font-bold text-primary">
            Fengye
          </router-link>
          <div class="space-x-4">
            <router-link to="/" class="hover:text-primary">首页</router-link>
            <router-link to="/archives" class="hover:text-primary">归档</router-link>
            <router-link to="/categories" class="hover:text-primary">分类</router-link>
            <router-link to="/tags" class="hover:text-primary">标签</router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow container py-8">
      <slot></slot>
    </main>

    <footer class="bg-white dark:bg-gray-800 shadow mt-8">
      <div class="container py-6">
        <p class="text-center text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Fengye. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script> 
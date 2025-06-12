<template>
    <nav class="post-toc toc text-sm w-40 relative top-32 right-4 opacity-70 hidden lg:block"
        :style="{ position: 'fixed !important' }"></nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import tocbot from 'tocbot'
import 'tocbot/dist/tocbot.css'

interface TocOptions {
    tocSelector: string
    contentSelector: string
    headingSelector: string
    hasInnerContainers: boolean
    scrollSmooth: boolean
    scrollSmoothDuration: number
    scrollSmoothOffset: number
}

const tocOptions: TocOptions = {
    tocSelector: '.post-toc',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    hasInnerContainers: true,
    scrollSmooth: true,
    scrollSmoothDuration: 300,
    scrollSmoothOffset: -100
}

onMounted(() => {
    // 初始化 tocbot
    tocbot.init(tocOptions)
})

// 组件卸载时销毁 tocbot
onUnmounted(() => {
    tocbot.destroy()
})
</script>

<style scoped>
.post-toc {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}

/* 自定义滚动条样式 */
.post-toc::-webkit-scrollbar {
    width: 4px;
}

.post-toc::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
}

.post-toc::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
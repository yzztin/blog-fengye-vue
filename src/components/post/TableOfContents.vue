<template>
    <nav class="post-toc toc text-sm w-40 relative top-32 right-4 opacity-70 hidden lg:block"
        style="position: fixed !important;"></nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import tocbot from 'tocbot'
import 'tocbot/dist/tocbot.css'

const tocOptions = {
    tocSelector: '.post-toc',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
}

function addHeadingIds() {
    const contentElement = document.querySelector('.post-content')
    if (contentElement) {
        const headings = contentElement.querySelectorAll('h1, h2, h3')
        headings.forEach((heading, index) => {
            if (!heading.id) {
                // 用标题文本生成唯一ID
                const text = heading.textContent?.trim() || ''
                const hash = btoa(unescape(encodeURIComponent(text))).replace(/=/g, '').slice(0, 8)
                heading.id = `heading-${hash}-${index}`
            }
        })
        return headings.length > 0
    }
    return false
}

async function initToc() {
    await nextTick()
    // 销毁旧的 toc
    tocbot.destroy()
    // 多次尝试，直到有标题为止
    let tryCount = 0
    const tryInit = () => {
        if (addHeadingIds()) {
            tocbot.init(tocOptions)
        } else if (tryCount < 10) {
            tryCount++
            setTimeout(tryInit, 200)
        }
    }
    tryInit()
}

onMounted(initToc)
onUnmounted(() => {
    tocbot.destroy()
})
</script>

<style scoped></style>
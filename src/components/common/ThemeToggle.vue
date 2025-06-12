<template>
    <button id="toggle-dark" @click="toggleDark">
        <icon :icon="isDark ? 'ic:round-dark-mode' : 'ic:round-light-mode'" />
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

interface ThemeSetting {
    value: 'auto' | 'dark' | 'light'
}

const isDark = ref(false)
const prefersDark = ref(false)

// 初始化主题
const initTheme = () => {
    // 检测系统主题偏好
    prefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches

    // 获取保存的主题设置
    const setting = localStorage.getItem('hexo-color-scheme') as ThemeSetting['value'] || 'auto'

    // 设置初始主题
    if (setting === 'dark' || (prefersDark.value && setting !== 'light')) {
        document.documentElement.classList.add('dark')
        isDark.value = true
    }
}

// 切换 Giscus 主题
const toggleGiscusTheme = () => {
    const giscusFrame = document.querySelector('iframe.giscus-frame')
    if (giscusFrame) {
        giscusFrame.contentWindow?.postMessage(
            {
                giscus: {
                    setConfig: {
                        theme: isDark.value ? 'dark' : 'light'
                    }
                }
            },
            'https://giscus.app'
        )
    }
}

// 切换主题
const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)

    // 更新主题设置
    if (prefersDark.value === isDark.value) {
        localStorage.setItem('hexo-color-scheme', 'auto')
    } else {
        localStorage.setItem('hexo-color-scheme', isDark.value ? 'dark' : 'light')
    }

    toggleGiscusTheme()
}

// 监听系统主题变化
const handleThemeChange = (e: MediaQueryListEvent) => {
    const setting = localStorage.getItem('hexo-color-scheme') as ThemeSetting['value'] || 'auto'
    if (setting === 'auto') {
        document.documentElement.classList.toggle('dark', e.matches)
        isDark.value = e.matches
        toggleGiscusTheme()
    }
}

onMounted(() => {
    initTheme()

    // 添加系统主题变化监听
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', handleThemeChange)
})

onUnmounted(() => {
    // 移除系统主题变化监听
    window.matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleThemeChange)
})
</script>

<style scoped>
button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
}

button:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.dark button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
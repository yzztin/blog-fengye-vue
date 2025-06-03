<template>
    <div style="height: 100vh; width: 100vw; overflow: hidden; padding: 0; margin: 0;">
        <iframe :src="iframeSrc" width="100%" height="100%" frameborder="0" style="border: none;"></iframe>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const iframeSrc = ref('')

onMounted(() => {
    // 使用 window.location.origin 保证路径正确
    iframeSrc.value = `${window.location.origin}/clock.html`
})
</script>
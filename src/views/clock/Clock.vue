<template>
  <div class="clock-container">
    <iframe :src="htmlContent" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const htmlContent = ref('')

onMounted(async () => {
  const response = await fetch('/src/views/clock/clock.html')
  const text = await response.text()
  htmlContent.value = `data:text/html;charset=utf-8,${encodeURIComponent(text)}`

})
</script>

<style scoped>
.clock-container {
  width: 100%;
  height: 100vh;
}
</style>
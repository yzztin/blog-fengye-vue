<script setup lang="ts">
</script>

<template>
  <!-- 
  vue 组件的根入口 
  RouterView 要和 createRouter 搭配使用，在 ./src/router/index.ts 中创建 router 实例并应用于 vue app 实例里，
  RouterView 会自动匹配渲染路径下的组件
  -->
  <RouterView />

</template>

<style scoped></style>

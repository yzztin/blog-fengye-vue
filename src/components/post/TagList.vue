<!--
显示文章标签列表
-->
<template>
    <div class="flex flex-wrap gap-2">
        <router-link v-for="tag in tags" :key="tag" :to="`/tag/${tag}`"
            class="text-sm px-2 py-1 bg-[var(--c-10)] text-[var(--c-60)] rounded hover:bg-[var(--c-theme)] hover:text-white">
            {{ tag }}
        </router-link>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    tags: string[]
}>()
</script>
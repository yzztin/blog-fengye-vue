<template>
    <div class="flex flex-row items-center gap-4">
        <!-- v-for v-if 这种语法，不能同时放在一个标签内 -->
        <template v-for="item in socialLinks.links">
            <a v-if="item.url" :key="item.name" :href="item.url" target="_blank" rel="noopener noreferrer"
                class="text-[var(--c-50)] hover:text-[var(--c-theme)] transition-colors">
                <Icon :icon="item.icon" width="24" />
            </a>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSocialLink } from '@/stores/useConfig'

const socialLinks = useSocialLink()

</script>
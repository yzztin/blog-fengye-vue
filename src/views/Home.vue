<template>
  <div class="flex flex-col gap-0">
    <Profile />
    <FeaturedPosts v-if="showFeaturedPosts" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Profile from '../components/home/Profile.vue'
import FeaturedPosts from '../components/home/FeaturedPosts.vue'

const showFeaturedPosts = ref(true)
</script> 
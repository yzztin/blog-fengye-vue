<template>
  <div class="index-info-container pt-6 text-[var(--c-70)]">
    <div class="flex flex-col items-center justify-center">
      <img v-if="showProfileImage" 
           :src="portrait" 
           :alt="title"
           class="rounded-3xl w-36 sm:w-48 hover:scale-[1.04] transition-transform" />
      
      <h1 class="site-title text-center text-5xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent pb-4 pt-6 font-black">
        {{ title }}
      </h1>
      
      <p class="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-[var(--c-80)]">
        {{ subtitle }}
      </p>
      
      <div class="flex flex-wrap items-center justify-center gap-4 my-6 font-bold text-lg">
        <div class="flex flex-row items-center gap-1">
          <iconify-icon width="24" icon="mingcute:building-1-fill"></iconify-icon>
          <p>{{ location }}</p>
        </div>
        <div class="flex flex-row items-center gap-1 group">
          <iconify-icon class="transition-transform group-hover:scale-125" width="24" icon="mingcute:idcard-fill"></iconify-icon>
          <a :href="cvPath" class="group-hover:underline">
            Resume ({{ cvLastUpdateDate }})
          </a>
        </div>
      </div>
      
      <div class="description-container max-w-prose mx-auto grid grid-cols-1">
        <div class="text-left p-8">
          <p v-html="description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showProfileImage = ref(true)
const portrait = ref('/path/to/portrait.jpg')
const title = ref('网站标题')
const subtitle = ref('网站副标题')
const location = ref('你的位置')
const cvPath = ref('/path/to/cv.pdf')
const cvLastUpdateDate = ref('2024-03-29')
const description = ref('网站描述')
</script>

import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    title: '网站标题',
    subtitle: '网站副标题',
    description: '网站描述',
    // ... 其他配置
  })
})

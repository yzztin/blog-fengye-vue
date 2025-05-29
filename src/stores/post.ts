import { defineStore } from 'pinia'

interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  featured?: boolean
}

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    featuredPosts: [] as Post[]
  }),
  
  actions: {
    async fetchPosts() {
      // 这里添加获取文章的逻辑
      // 可以从 API 或本地文件获取
    },
    
    async fetchFeaturedPosts() {
      // 这里添加获取精选文章的逻辑
      // 可以从 API 或本地文件获取
    }
  }
}) 
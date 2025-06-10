import { defineStore } from 'pinia'
import { ref } from 'vue'

// 导出 Post 接口供其他文件使用
export interface Post {
  id: string
  title: string
  date: Date
  excerpt: string
  tags?: string[]
  category?: string
  featured?: boolean
  path?: string
  content?: string
  thumbnail?: string
  thumbnail_alt?: string
  updated?: Date
  categories?: Array<{ name: string; path: string }>
}

export const usePostStore = defineStore('post', () => {

  const posts = ref<Post[]>([])

  // 获取文章列表
  const fetchPosts = async () => {

    posts.value = [
      {
        id: '1',
        title: 'Vue3 组合式 API 最佳实践',
        date: new Date('2025-03-29'),
        excerpt: '本文介绍了 Vue3 组合式 API 的使用技巧和最佳实践...',
        content: '本文介绍了 Vue3 组合式 API 的使用技巧和最佳实践，深入理解 TypeScript 的类型系统，掌握类型体操的基本技巧',
        category: '前端',
        tags: ['Vue3', 'TypeScript', '最佳实践'],
        featured: true
      },
      {
        id: '2',
        title: 'TypeScript 类型体操入门',
        date: new Date('2024-03-28'),
        excerpt: '深入理解 TypeScript 的类型系统，掌握类型体操的基本技巧...',
        category: 'ts',
        tags: ['TypeScript', '类型系统']
      }
    ]
  }

  return {
    posts,
    fetchPosts
  }
}) 
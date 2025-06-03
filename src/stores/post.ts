import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Post {
  id: string
  title: string
  date: Date
  excerpt: string
  tags?: string[]
  category?: string
  featured?: boolean
}

export const usePostStore = defineStore('post', () => {
  // 状态
  const posts = ref<Post[]>([])

  // 按年份分组的文章
  // const postsByYear = computed(() => {
  //   const groups: Record<string, Post[]> = {}

  //   posts.value
  //     .sort((a, b) => b.date.getTime() - a.date.getTime())
  //     .forEach(post => {
  //       const year = post.date.getFullYear().toString()
  //       if (!groups[year]) {
  //         groups[year] = []
  //       }
  //       groups[year].push(post)
  //     })

  //   return groups
  // })

  // 获取文章列表
  const fetchPosts = async () => {

    posts.value = [
      {
        id: '1',
        title: 'Vue3 组合式 API 最佳实践',
        date: new Date('2024-03-29'),
        excerpt: '本文介绍了 Vue3 组合式 API 的使用技巧和最佳实践...',
        category: '前端',
        tags: ['Vue3', 'TypeScript', '最佳实践'],
        featured: true
      },
      {
        id: '2',
        title: 'TypeScript 类型体操入门',
        date: new Date('2024-03-28'),
        excerpt: '深入理解 TypeScript 的类型系统，掌握类型体操的基本技巧...',
        category: '前端',
        tags: ['TypeScript', '类型系统']
      }
    ]
  }

  return {
    posts,
    // postsByYear,
    fetchPosts
  }
}) 
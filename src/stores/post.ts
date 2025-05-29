import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Post {
  id: string
  title: string
  date: Date
  excerpt: string
  tags?: string[]
  category?: string
}

export const usePostStore = defineStore('post', () => {
  // 状态
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 按年份分组的文章
  const postsByYear = computed(() => {
    const groups: Record<string, Post[]> = {}

    posts.value
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .forEach(post => {
        const year = post.date.getFullYear().toString()
        if (!groups[year]) {
          groups[year] = []
        }
        groups[year].push(post)
      })

    return groups
  })

  // 获取文章列表
  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      // TODO: 替换为实际的 API 调用
      // 模拟数据
      posts.value = [
        {
          id: '1',
          title: 'Vue3 组合式 API 最佳实践',
          date: new Date('2024-03-29'),
          excerpt: '本文介绍了 Vue3 组合式 API 的使用技巧和最佳实践...',
          category: '前端',
          tags: ['Vue3', 'TypeScript', '最佳实践']
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
    } catch (e) {
      error.value = e instanceof Error ? e.message : '获取文章列表失败'
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    postsByYear,
    fetchPosts
  }
}) 
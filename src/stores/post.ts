import { defineStore } from 'pinia'
import { ref } from 'vue'

// 导出 Post 接口供其他文件使用
export interface Post {
  id?: string
  title: string
  date: Date
  excerpt: string
  wordCount?: number
  readTime?: number
  tags?: string[]
  category?: string
  featured?: boolean
  path?: string
  content?: string
  thumbnail?: string
  thumbnail_alt?: string
  updated?: Date
}

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
}

const usePostStore = defineStore('post', () => {

  const posts = ref<Post[]>([])

  // 获取文章列表
  const fetchPosts = async () => {

    const rawPosts: Post[] = [
      {
        title: 'Vue3 组合式 API 最佳实践',
        date: new Date('2025-03-29'),
        updated: new Date('2025-06-11'),
        excerpt: '本文介绍了 Vue3 组合式 API 的使用技巧和最佳实践...',
        content: '本文介绍了 Vue3 组合式 API 的使用技巧和最佳实践，深入理解 TypeScript 的类型系统，掌握类型体操的基本技巧',
        category: '前端',
        tags: ['Vue3', 'TypeScript', '最佳实践'],
        featured: true
      },
      {
        title: 'TypeScript 类型体操入门',
        date: new Date('2025-05-28'),
        excerpt: '深入理解 TypeScript 的类型系统，掌握类型体操的基本技巧...',
        category: 'ts',
        tags: ['TypeScript', '类型系统']
      }
    ]

    // 生成id、统计字数和阅读时间
    const processedPosts = rawPosts.map(post => {
      // 提取时间戳并格式化为 YYYYMMDD 格式
      const dataForId = `${post.date.getFullYear()}${String(post.date.getMonth() + 1).padStart(2, '0')}${String(post.date.getDate()).padStart(2, '0')}`;

      // 处理标题，如果标题超过 10 个字，截取前 10 个字并在末尾加上 *
      let title = post.title
      if (title.length > 10) {
        title = title.slice(0, 10) + '*';
      }

      // 生成 ID
      const id = `${dataForId}-${title}`;

      // 计算字数和阅读时间
      const wordCount = post.content?.split(/\s+/).length || 0;
      const readTime = Math.ceil(wordCount / 400);

      return {
        // 扩展运算符 [...posts]，作用是创建 posts 数组的一个浅拷贝。
        ...post,
        id,
        wordCount,
        readTime
      };
    });

    // 根据创建时间排序
    // getTime() 获取时间戳
    processedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

    // 更新 posts
    posts.value = processedPosts;
  }

  return {
    posts,
    fetchPosts
  }
})

export { formatDate, usePostStore }
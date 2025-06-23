import { marked } from 'marked'
import type { Post, PostFrontMatter } from '@/types/post'

// 配置 marked 选项
marked.setOptions({
    gfm: true,
    breaks: true
})

/**
 * 简单的 Front Matter 解析器（不依赖 gray-matter）
 */
function parseFrontMatter(content: string): { data: any, content: string } {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = content.match(frontMatterRegex)

    if (!match) {
        return { data: {}, content }
    }

    const [, frontMatterStr, markdownContent] = match
    const data: any = {}

    // 解析 YAML 格式的 Front Matter
    const lines = frontMatterStr.split('\n')

    for (const line of lines) {
        if (line.trim() === '') continue

        if (line.includes(':')) {
            const [key, ...valueParts] = line.split(':')
            const value = valueParts.join(':').trim()

            if (key.trim() === 'tags') {
                // 处理标签数组
                if (value.startsWith('[') && value.endsWith(']')) {
                    // JSON 数组格式: [tag1, tag2]
                    try {
                        data.tags = JSON.parse(value.replace(/'/g, '"'))
                    } catch {
                        data.tags = []
                    }
                } else {
                    // YAML 数组格式，需要继续读取下面的行
                    data.tags = []
                    continue
                }
            } else if (key.trim() === 'featured') {
                data[key.trim()] = value.toLowerCase() === 'true'
            } else {
                // 移除引号
                data[key.trim()] = value.replace(/^['"]|['"]$/g, '')
            }
        } else if (line.trim().startsWith('- ') && data.tags) {
            // YAML 数组项
            data.tags.push(line.trim().substring(2))
        }
    }

    return { data, content: markdownContent }
}

/**
 * 解析 Markdown 文件内容
 */
export function parseMarkdown(content: string): Post {
    const { data, content: markdownContent } = parseFrontMatter(content)
    const frontMatter = data as PostFrontMatter

    // 解析 Markdown 为 HTML
    const htmlContent = marked(markdownContent)

    // 计算字数和阅读时间
    const wordCount = markdownContent.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 400)

    return {
        title: frontMatter.title || 'no title',
        date: frontMatter.date ? new Date(frontMatter.date) : new Date(),
        updated: frontMatter.updated ? new Date(frontMatter.updated) : undefined,
        excerpt: frontMatter.excerpt,
        content: htmlContent,
        category: frontMatter.category,
        tags: frontMatter.tags || [],
        featured: frontMatter.featured || false,
        thumbnail: frontMatter.thumbnail,
        thumbnail_alt: frontMatter.thumbnail_alt,
        wordCount,
        readTime,
    }
}

/**
 * 获取所有文章文件
 */
export async function getPostFiles(): Promise<string[]> {
    // 使用 Vite 的 import.meta.glob 动态导入
    const modules = import.meta.glob('/src/assets/_posts/*.md', {
        as: 'raw',
        eager: false
    })

    return Object.keys(modules).map(path => {
        const filename = path.split('/').pop() || ''
        return filename
    })
}

/**
 * 读取单个文章文件
 */
export async function readPostFile(filename: string): Promise<string> {
    try {
        const modules = import.meta.glob('/src/assets/_posts/*.md', {
            as: 'raw',
            eager: false
        })

        const path = `/src/assets/_posts/${filename}`
        const loader = modules[path]

        if (!loader) {
            throw new Error(`Post file not found: ${filename}`)
        }

        const content = await loader()
        return content as string
    } catch (error) {
        console.error(`Error reading post file ${filename}:`, error)
        throw error
    }
}
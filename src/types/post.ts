// 导出 Post 接口供其他文件使用 - 保持与原有结构一致
export interface Post {
    id?: string
    title: string
    date: Date
    excerpt?: string
    wordCount?: number
    readTime?: number
    tags?: string[]
    category?: string
    featured?: boolean
    path?: string
    content?: string | any
    thumbnail?: string
    thumbnail_alt?: string
    updated?: Date
    slug?: string // 文件名（不含扩展名）
}

export interface PostFrontMatter {
    title: string
    date: string
    updated?: string
    excerpt?: string
    category?: string
    tags?: string[]
    featured?: boolean
    thumbnail?: string
    thumbnail_alt?: string
}
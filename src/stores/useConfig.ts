import { defineStore } from 'pinia'
// import portraitImage from '@/assets/images/portrait.jpg'

interface BaseConfig {
  title: string
  portrait: string
  subtitle: string
  location: string
  cvPath: string
  cvLastUpdateDate: string
  description: string
}

interface NavItem {
  path: string
  name: string
  icon: string
  showName?: boolean
}

interface SocialLink {
  name: string
  url: string
  icon: string
}

const useBaseConfig = defineStore('baseConfig', {
  state: (): BaseConfig => ({
    title: import.meta.env.VITE_TITLE,
    subtitle: import.meta.env.VITE_SUBTITLE,
    portrait: import.meta.env.VITE_PORTRAIT,
    location: import.meta.env.VITE_LOCATION,
    cvPath: import.meta.env.VITE_CV_PATH,
    cvLastUpdateDate: import.meta.env.VITE_CV_LAST_UPDATE_DATE,
    description: import.meta.env.VITE_DESCRIPTION
  }),
  actions: {
    descriptionClean() {
      return this.description.replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
  }
})

// 社交链接配置
const useSocialLink = defineStore('socialLink', {
  // 这里存放的值是一个 object 对象 { links: [] }
  // 如果直接通过 pinia 存放一个列表 []，那么取值的时候实际上拿到的是 pinia store 对象，而不是单纯的数组列表，这会影响 v-for 时的样式
  state: (): { links: SocialLink[] } => ({
    links: [
      {
        name: 'GitHub',
        url: import.meta.env.VITE_GITHUB_URL,
        icon: 'mingcute:github-fill'
      },
      {
        name: 'Email',
        url: `mailto:${import.meta.env.VITE_EMAIL}`,
        icon: 'mdi:email'
      },
      {
        name: 'Twitter',
        url: import.meta.env.VITE_TWITTER_URL,
        icon: 'mingcute:social-x-fill'
      },
    ]
  })
})

const useHeaderStore = defineStore('header', {
  state: (): { navItems: NavItem[] } => ({
    navItems: [
      {
        path: '/posts',
        name: 'Posts',
        icon: 'mingcute:inbox-fill'
      },
      {
        path: '/categories',
        name: 'Categories',
        icon: 'mingcute:classify-3-fill'
      },
      {
        path: '/tags',
        name: 'Tags',
        icon: 'mingcute:tag-2-fill'
      },
    ]
  })
})

export {
  useBaseConfig,
  useHeaderStore,
  useSocialLink
}

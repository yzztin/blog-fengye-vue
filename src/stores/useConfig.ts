import { defineStore } from 'pinia'

interface NavItem {
  path: string
  name: string
  icon: string
  showName?: boolean
}

interface HeaderState {
  siteTitle: string
  navItems: NavItem[]

}

export const useHeaderStore = defineStore('header', {
  state: (): HeaderState => ({
    siteTitle: 'Yzz\'s Blog',
    navItems: [
      // {
      //     path: '/',
      //     name: 'Home',
      //     icon: 'mingcute:home-fill'
      // },
      {
        path: '/archives',
        name: 'Archives',
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
      // {
      //     path: '/about',
      //     name: '关于',
      //     icon: 'mingcute:user-fill'
      // }
      {
        path: '/clock',
        name: '',
        icon: 'mingcute:time-fill'
      }
    ]
  })
})

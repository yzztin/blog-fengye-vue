import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../views/Home.vue'
import { usePageTitleStore } from '../stores/pageTitle'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,  // 父级路由组件，在 DefaultLayout.vue 中使用 router-view 显示子路由的内容
      children: [   // 子路由
        {
          path: '',  // 空路径表示与父级路径相同
          name: 'home',
          component: Home
        },
        {
          path: 'archives',
          name: 'archives',
          component: () => import('../views/Archives.vue')
        },
        {
          path: 'archives/:archive',
          name: 'archive',
          component: () => import('../views/ArchiveDetail.vue')
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('../views/Categories.vue')
        },
        {
          path: 'categories/:category',
          name: 'category',
          component: () => import('../views/Categories.vue')
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('../views/Tags.vue')
        },
        {
          path: 'tags/:tag',
          name: 'tag',
          component: () => import('../views/Tags.vue')
        },

      ]
    },
    {
      path: '/clock',
      beforeEnter: (to, from, next) => {
        // 使用原生跳转
        window.location.href = '/clock.html'
      },
      component: {
        template: '<div></div>'  // 空组件占位，避免类型检查报错
      }
    }
  ]
})

const updateTitlePaths = ['archives', 'categories', 'tags', 'post']

router.beforeEach((to, from, next) => {
  // 如果 path 在 updateTitlePaths 内，就更新标题
  const currentPath = to.path.replace(/^\//, '')
  if (updateTitlePaths.includes(currentPath)) {
    const pageTitleStore = usePageTitleStore()
    pageTitleStore.updateTitle(to.name as string)
  }

  next()
})

export default router
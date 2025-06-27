import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Home from '@/views/Home.vue'
import { usePageTitleStore } from '@/stores/pageTitle'


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
          component: Home,
          meta: { title: '' },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/About.vue'),
          meta: { title: 'About me' },
        },
        {
          path: 'archives',
          name: 'archives',
          component: () => import('@/views/Archives.vue'),
          meta: { title: 'Archive' },
        },
        {
          path: 'archives/:archive',
          name: 'archive',
          component: () => import('@/views/ArchiveDetail.vue'),
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/Categories.vue'),
          meta: { title: 'Category' },
        },
        {
          path: 'categories/:categoryName',
          name: 'category',
          component: () => import('@/views/Categories.vue'),
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('@/views/Tags.vue'),
          meta: { title: 'Tag' },
        },
        {
          path: 'tags/:tag',
          name: 'tag',
          component: () => import('@/views/Tags.vue')
        },
      ]
    },
  ]
})

router.afterEach((to) => {
  const titleFromMeta = to.meta.title

  if (typeof titleFromMeta === 'string') {
    usePageTitleStore().updateTitle(titleFromMeta)
  }
})

export default router
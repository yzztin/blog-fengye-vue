import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/DefaultLayout.vue'
import Home from '@/views/Home.vue'
import { usePageTitleStore } from '@/stores/pageTitle'


const router = createRouter({
  // 历史模式路由，使用 HTML5 History API 的历史记录模式
  // 路径地址将会是 localhost:3000/about，而不是带有 # 号的片段模式，如 localhost:3000/#/about
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,  // 父级路由组件，在 DefaultLayout.vue 中使用 router-view 显示子路由的内容
      children: [   // 子路由
        {
          path: '',  // 空路径表示与父级路径相同，即 / 路径
          name: 'home',  // 路径唯一名称值
          component: Home,
          meta: { title: '' },  // meta 字段用于附加任意自定义信息到路由记录上的对象
        },
        {
          path: 'about', // 路径会是 xxx/about
          name: 'about',
          component: () => import('@/views/About.vue'),
          meta: { title: 'About me' },
        },
        {
          path: 'posts',
          name: 'posts',
          component: () => import('@/views/Posts.vue'),
          meta: { title: 'Post' },
        },
        {
          path: 'posts/:post',
          name: 'post',
          component: () => import('@/views/PostDetail.vue'),
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

// 路由跳转后，自动执行定义的函数代码
// to 是跳转的目标路由对象
router.afterEach((to) => {
  const titleFromMeta = to.meta.title  // 获取定义好的路由附加信息字段

  // 使用 pinia store 里定义的方法更新状态
  if (typeof titleFromMeta === 'string') {
    usePageTitleStore().updateTitle(titleFromMeta)
  }
})

export default router

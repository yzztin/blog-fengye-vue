import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'archives',
          name: 'archives',
          component: () => import('../views/Archives.vue')
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('../views/Categories.vue')
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('../views/Tags.vue')
        },
        {
          path: 'post/:id',
          name: 'post',
          component: () => import('../views/Post.vue')
        }
      ]
    }
  ]
})

export default router
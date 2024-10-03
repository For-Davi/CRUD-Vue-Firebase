import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeAuth.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard.vue')
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/error/ErrorNotFound.vue')
    }
  ]
})

export default router

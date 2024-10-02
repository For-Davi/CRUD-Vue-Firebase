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
      // children: [
      //   {
      //     name: 'dashboard',
      //     path: '',
      //     component: () => import('@/views/Dashboard.vue'),
      //     props: true,
      //     meta: { requiresAuth: true }
      //   }
      // ]
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/ErrorNotFound.vue')
    }
  ]
})

export default router

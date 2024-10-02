import { createRouter, createWebHistory } from 'vue-router'
import HomeAuth from '../views/HomeAuth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeAuth
    },
    {
      path: '/',
      name: 'home',
      component: () => import('src/layouts/AdminLayout.vue'),
      children: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: () => import('src/views/Dashboard.vue'),
          props: true,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('src/views/ErrorNotFound.vue')
    }
  ]
})

export default router

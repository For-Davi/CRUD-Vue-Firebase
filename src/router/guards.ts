import router from './index'
import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    const isAuthenticated = !!authStore.user

    if (isAuthenticated) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

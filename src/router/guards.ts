import router from './index'

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = !!localStorage.getItem('token')

    if (isAuthenticated) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loadingAuth: false,
    user: useStorage('theCard-user', null as {} | null)
  }),

  actions: {
    setUser(user: {} | null) {
      this.user = user
    }
  }
})

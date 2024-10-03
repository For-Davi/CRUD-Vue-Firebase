import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { type User } from '@/interfaces/data/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loadingAuth: false,
    user: useStorage('theCard-user', null as User | null)
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user
    }
  }
})

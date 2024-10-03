<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { auth } from './firebaseConfig'
import { useAuthStore } from './stores/auth'

defineOptions({
  name: 'App'
})

const router = useRouter()
const { setUser } = useAuthStore()

const checkAuth = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user)
    } else {
      router.push('/')
    }
  })
}

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="bg-slate-700 app-container">
    <RouterView />
  </div>
</template>

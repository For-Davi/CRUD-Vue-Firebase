<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { auth, db } from './firebaseConfig'
import { useAuthStore } from './stores/auth'
import { doc, getDoc } from 'firebase/firestore'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'App'
})

const router = useRouter()
const { setUser } = useAuthStore()
const { loadingAuth } = storeToRefs(useAuthStore())

const checkAuth = () => {
  auth.onAuthStateChanged(async (user) => {
    loadingAuth.value = true
    if (user) {
      setUser(user)
      const userDocRef = doc(db, 'user_details', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userDetails = userDoc.data()
        setUser({
          ...user,
          photoURL: userDetails.image_perfil
        })
      }
    } else {
      router.push('/')
    }
    loadingAuth.value = false
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

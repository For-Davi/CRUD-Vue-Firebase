<script setup lang="ts">
import { ref } from 'vue'
import Login from '@/components/auth/Login.vue'
import ResetPassword from '@/components/auth/ResetPassword.vue'
import Register from '@/components/auth/Register.vue'

defineOptions({
  name: 'HomeAuth'
})
const render = ref<string>('login')

const changeRender = (value: string): void => {
  render.value = value
}
</script>

<template>
  <section class="h-full flex items-center justify-center">
    <Login v-if="render == 'login'" @update:change-render="changeRender" />
    <ResetPassword v-else-if="render == 'reset'" />
    <Register v-else @update:change-render="changeRender" />
  </section>
</template>

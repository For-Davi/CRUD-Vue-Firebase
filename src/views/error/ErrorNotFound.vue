<script setup lang="ts">
import { useRouter } from 'vue-router'
defineOptions({
  name: 'ErrorNotFound'
})

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <el-card class="w-96 text-center shadow-md">
      <el-image
        src="/public/images/error.jpg"
        fit="contain"
        class="mb-4"
        alt="Página não encontrada"
      />
      <h1 class="text-3xl font-bold mb-2">404 - Página Não Encontrada</h1>
      <p class="text-gray-600 mb-4">Desculpe, a página que você está procurando não existe.</p>
      <el-button type="danger" @click="goToDashboard">Ir para Dashboard</el-button>
    </el-card>
  </div>
</template>

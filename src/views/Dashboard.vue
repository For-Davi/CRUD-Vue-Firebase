<script setup lang="ts">
import Navbar from '@/components/Headers/Navbar.vue'
defineOptions({
  name: 'Dashboard'
})
</script>

<template>
  <section>
    <Navbar />
    <main>
      <el-empty description="Você não tem cartões criados">
        <el-button type="primary" icon="plus">Criar agora</el-button>
      </el-empty>
    </main>
  </section>
</template>

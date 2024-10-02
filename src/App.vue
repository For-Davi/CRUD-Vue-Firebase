<script setup lang="ts">
import { RouterView } from 'vue-router'

defineOptions({
  name: 'App'
})
</script>

<template>
  <div class="bg-slate-900 app-container">
    <RouterView />
  </div>
</template>

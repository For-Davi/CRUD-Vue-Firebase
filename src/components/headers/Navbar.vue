<script setup lang="ts">
import { ref } from 'vue'
import UserOptions from './UserOptions.vue'

defineOptions({
  name: 'Navbar'
})

const emit = defineEmits<{
  'update:openFormUserSetting': [boolean]
  'update:openFormTask': [void]
}>()

const openFormUserSetting = (value: boolean): void => {
  emit('update:openFormUserSetting', value)
}

const openFormTask = (): void => {
  emit('update:openFormTask')
}

const searchCard = ref<string>('')
</script>

<template>
  <nav class="bg-slate-900 flex justify-between items-center p-2">
    <div class="flex flex-row items-center">
      <div class="w-[50%] bg-red">
        <el-image src="/images/logo-dark.png" fit="scale-down" class="logo" />
      </div>
      <span class="text-white text-2xl ml-8">Olá, Davi !</span>
    </div>
    <div class="flex justify-between items-center">
      <el-input
        v-model="searchCard"
        style="width: 240px"
        placeholder="Pesquise um cartão"
        prefix-icon="search"
        class="mr-4"
      />
      <el-button type="primary" icon="plus" class="mr-4" @click="openFormTask"
        >Criar cartão</el-button
      >
      <UserOptions @update:open-form-user-setting="openFormUserSetting" />
    </div>
  </nav>
</template>

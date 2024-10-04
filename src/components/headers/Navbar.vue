<script setup lang="ts">
import { ref, watch } from 'vue'
import UserOptions from './UserOptions.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

defineOptions({
  name: 'Navbar'
})

const emit = defineEmits<{
  'update:openFormUserSetting': [boolean]
  'update:openFormTask': [void]
  'update:searchTask': [string]
}>()

const { user } = storeToRefs(useAuthStore())

const openFormUserSetting = (value: boolean): void => {
  emit('update:openFormUserSetting', value)
}

const openFormTask = (): void => {
  emit('update:openFormTask')
}

const searchCard = ref<string>('')

watch(
  searchCard,
  () => {
    emit('update:searchTask', searchCard.value)
  },
  { immediate: true }
)
</script>

<template>
  <nav class="bg-slate-900 flex justify-between items-center p-2">
    <div class="flex flex-row items-center basis-1/3">
      <div>
        <el-image src="/images/logo-light.png" fit="scale-down" class="logo" />
      </div>
      <span class="text-white text-2xl ml-8 truncate"
        >{{ user?.displayName ? `Olá, ${user?.displayName} !` : '' }}
      </span>
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

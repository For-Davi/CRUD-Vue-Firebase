<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import UserOptions from './UserOptions.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/task'

defineOptions({
  name: 'Navbar'
})

const emit = defineEmits<{
  'update:openFormUserSetting': [boolean]
  'update:openFormTask': [void]
  'update:searchTask': [string]
}>()

const { user, loadingAuth } = storeToRefs(useAuthStore())
const { loadingTask } = storeToRefs(useTaskStore())
const searchCard = ref<string>('')
const hiddenNavbar = ref<boolean>(false)

const openFormUserSetting = (value: boolean): void => {
  emit('update:openFormUserSetting', value)
}
const openFormTask = (): void => {
  emit('update:openFormTask')
}

const close = (): void => {
  hiddenNavbar.value = true
}
const open = (): void => {
  hiddenNavbar.value = false
}
const checkScreenSize = (): void => {
  if (window.innerWidth >= 768) {
    hiddenNavbar.value = true
  }
}

watch(
  searchCard,
  () => {
    emit('update:searchTask', searchCard.value)
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('resize', checkScreenSize)
  checkScreenSize()
})
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <nav class="bg-slate-900 flex flex-wrap items-center justify-between p-2 md:flex-row flex-col">
    <div class="flex items-center basis-full md:basis-1/3 mb-4 md:mb-0 md:flex-row flex-col">
      <el-image src="/images/logo-light.png" fit="scale-down" class="logo" />
      <span class="text-white text-2xl ml-4 truncate md:mt-0 mt-2">
        {{ user?.displayName ? `Olá, ${user?.displayName} !` : '' }}
      </span>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-center w-full md:w-auto">
      <el-input
        v-model="searchCard"
        class="mb-2 md:mb-0 md:mr-4"
        style="width: 100%; max-width: 240px"
        placeholder="Pesquisar"
        prefix-icon="search"
        :disabled="loadingAuth || loadingTask"
      />
      <el-button
        type="primary"
        icon="plus"
        class="mb-2 md:mb-0 md:mr-4"
        @click="openFormTask"
        :disabled="loadingAuth || loadingTask"
        v-show="hiddenNavbar"
      >
        Criar cartão
      </el-button>
      <div class="w-[100%] flex justify-end">
        <div class="flex w-[50%] justify-end items-center">
          <div v-show="hiddenNavbar" class="mr-2">
            <UserOptions @update:open-form-user-setting="openFormUserSetting" />
          </div>
          <div class="md:hidden mr-4">
            <el-button circle type="info" @click="close" v-if="!hiddenNavbar">
              <el-icon><ArrowDownBold /></el-icon>
            </el-button>
            <el-button circle type="info" @click="open" v-else>
              <el-icon><ArrowUpBold /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

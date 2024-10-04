<script setup lang="ts">
import FormUserSetting from '@/components/forms/FormUserSetting.vue'
import FormTask from '@/components/forms/FormTask.vue'
import Navbar from '@/components/headers/Navbar.vue'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/task'
import { getTasksByUserId } from '@/services/tasks'
import { useAuthStore } from '@/stores/auth'
import type { ObjectDataTask } from '@/interfaces/data/Task'
import TaskCard from '@/components/cards/TaskCard.vue'

defineOptions({
  name: 'Dashboard'
})

const { user } = storeToRefs(useAuthStore())
const { task, loadingTask } = storeToRefs(useTaskStore())
const showFormTask = ref<boolean>(false)
const showFormUserSetting = ref<boolean>(false)
const taskEdit = ref<ObjectDataTask | null>(null)
const filterTask = ref<string>('')
const filtered = reactive<Array<ObjectDataTask>>([])
const widthScreen = ref<number>(0)

const openFormTask = (): void => {
  showFormTask.value = true
}
const closeFormTask = (): void => {
  showFormTask.value = false
  taskEdit.value = null
}
const openFormUserSetting = (value: boolean): void => {
  showFormUserSetting.value = value
}
const closeFormUserSetting = (): void => {
  showFormUserSetting.value = false
}
const fetchAllCards = async () => {
  const result: Array<ObjectDataTask> = (await getTasksByUserId(user.value?.uid!)) || []
  result.sort((a, b) => {
    if (a.status === 'Pendente' && b.status !== 'Pendente') {
      return -1
    }
    if (a.status !== 'Pendente' && b.status === 'Pendente') {
      return 1
    }
    return 0
  })

  task.value = result
  task.value = result
}
const openEdit = (value: ObjectDataTask) => {
  taskEdit.value = value
  openFormTask()
}
const searchTask = (value: string): void => {
  filterTask.value = value
  filtered.splice(0, filtered.length)
  if (value == '') {
    filtered.splice(0, filtered.length)
  } else {
    const result = task.value.filter((item) => {
      return (
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
      )
    })
    result.map((item) => filtered.push(item))
  }
}
const checkScreenSize = (): void => {
  widthScreen.value = window.innerWidth
}

watch(
  () => user.value?.uid,
  async () => {
    if (user.value?.uid) {
      await fetchAllCards()
    }
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
  <section>
    <Navbar
      @update:open-form-user-setting="openFormUserSetting"
      @update:open-form-task="openFormTask"
      @update:search-task="searchTask"
    />
    <el-scrollbar :max-height="widthScreen > 768 ? 'calc(100vh - 56px)' : 'calc(100vh - 220px)'">
      <el-progress
        :stroke-width="3"
        :percentage="100"
        :indeterminate="loadingTask"
        :show-text="false"
      />
      <main class="w-full flex justify-center">
        <div v-if="task.length == 0" class="w-[95%]">
          <el-empty description="Você não tem cartões criados">
            <el-button type="primary" icon="plus" @click="openFormTask">Criar agora</el-button>
          </el-empty>
        </div>
        <div v-else class="px-8 py-2 flex flex-row flex-wrap justify-center">
          <div v-for="(item, index) in filterTask != '' ? filtered : task" :key="index" class="m-2">
            <TaskCard
              :title="item.title"
              :description="item.description"
              :id="item.id"
              :status="item.status"
              :loading="loadingTask"
              @update:show-edit="openEdit"
            />
          </div>
        </div>
      </main>
    </el-scrollbar>
    <FormTask :open="showFormTask" :task-edit="taskEdit" @update:close="closeFormTask" />
    <FormUserSetting :open="showFormUserSetting" @update:close="closeFormUserSetting" />
  </section>
</template>

<script setup lang="ts">
import FormUserSetting from '@/components/forms/FormUserSetting.vue'
import FormTask from '@/components/forms/FormTask.vue'
import Navbar from '@/components/headers/Navbar.vue'
import { reactive, ref, watch } from 'vue'
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

watch(
  () => user.value?.uid,
  async () => {
    if (user.value?.uid) {
      await fetchAllCards()
    }
  },
  { immediate: true }
)
</script>

<template>
  <section>
    <Navbar
      @update:open-form-user-setting="openFormUserSetting"
      @update:open-form-task="openFormTask"
      @update:search-task="searchTask"
    />
    <main>
      <div>
        <el-progress
          :stroke-width="3"
          :percentage="100"
          :indeterminate="loadingTask"
          :show-text="false"
        />
      </div>
      <el-empty v-if="task.length == 0" description="Você não tem cartões criados">
        <el-button type="primary" icon="plus" @click="openFormTask">Criar agora</el-button>
      </el-empty>
      <div v-else class="p-2 flex flex-row flex-wrap">
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
    <FormTask :open="showFormTask" :task-edit="taskEdit" @update:close="closeFormTask" />
    <FormUserSetting :open="showFormUserSetting" @update:close="closeFormUserSetting" />
  </section>
</template>

<script setup lang="ts">
import type { ObjectDataTask } from '@/interfaces/data/Task'
import {
  deleteTaskService,
  setTaskStatusFinalizedService,
  setTaskStatusPendentService
} from '@/services/tasks'
import { ElNotification } from 'element-plus'

const props = defineProps<{
  title: string
  description: string
  id: string
  status: string
  loading: boolean
}>()
const emit = defineEmits<{
  'update:showEdit': [ObjectDataTask]
}>()

const handleDelete = async (): Promise<void> => {
  const response = await deleteTaskService(props.id)
  if (response.status) {
    ElNotification({
      title: 'Tarefa',
      message: response.message,
      type: 'success'
    })
  } else {
    ElNotification({
      title: 'Tarefa',
      message: 'Houve um erro na exclusão',
      type: 'error'
    })
  }
}
const handleEdit = async (): Promise<void> => {
  emit('update:showEdit', {
    id: props.id,
    title: props.title,
    description: props.description,
    status: props.status
  })
}
const setStatusFinalized = async (): Promise<void> => {
  const response = await setTaskStatusFinalizedService(props.id)
  if (response.status) {
    ElNotification({
      title: 'Tarefa',
      message: response.message,
      type: 'success'
    })
  } else {
    ElNotification({
      title: 'Tarefa',
      message: 'Houve um erro na atualização',
      type: 'error'
    })
  }
}
const setStatusPendent = async (): Promise<void> => {
  const response = await setTaskStatusPendentService(props.id)
  if (response.status) {
    ElNotification({
      title: 'Tarefa',
      message: response.message,
      type: 'success'
    })
  } else {
    ElNotification({
      title: 'Tarefa',
      message: 'Houve um erro na atualização',
      type: 'error'
    })
  }
}

defineOptions({
  name: 'TaskCard'
})
</script>

<template>
  <div
    class="bg-slate-50 w-72 p-4 rounded-md"
    :class="props.status == 'Pendente' ? 'border border-yellow-400' : 'border border-green-400'"
  >
    <div class="">
      <p class="font-bold text-xl">{{ props.title }}</p>
      <p class="font-semibold">{{ props.description }}</p>
      <p
        class="mt-2 p-1 text-black font-medium rounded-lg"
        :class="props.status == 'Pendente' ? 'bg-yellow-200 ' : 'bg-green-200'"
      >
        {{ props.status }}
      </p>
    </div>
    <el-divider />
    <div class="flex justify-end">
      <el-button type="danger" size="small" @click="handleDelete" :disabled="props.loading">
        <el-icon><Delete /></el-icon>
      </el-button>
      <el-button type="info" size="small" :disabled="props.loading" @click="handleEdit">
        <el-icon><Edit /></el-icon>
      </el-button>
      <el-tooltip v-if="props.status == 'Pendente'" content="Finalizar tarefa" placement="bottom">
        <el-button
          @click="setStatusFinalized"
          type="success"
          size="small"
          :disabled="props.loading"
        >
          <el-icon><Checked /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip v-else content="Voltar para pendente" placement="bottom">
        <el-button @click="setStatusPendent" type="warning" size="small" :disabled="props.loading">
          <el-icon><RefreshLeft /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-hidden {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container {
  width: calc(100% - 75px);
}
</style>

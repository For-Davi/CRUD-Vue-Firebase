<script setup lang="ts">
import type { DataTask, ObjectDataTask } from '@/interfaces/data/Task'
import { createTaskService, updateTaskService } from '@/services/tasks'
import { computed, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import { useTaskStore } from '@/stores/task'

defineOptions({
  name: 'FormTask'
})

const props = defineProps<{
  open: boolean
  taskEdit?: ObjectDataTask | null
}>()
const emit = defineEmits<{
  'update:close': [void]
}>()

const { user } = storeToRefs(useAuthStore())
const { loadingTask } = storeToRefs(useTaskStore())
const dataTask = reactive<DataTask>({
  title: '',
  description: ''
})

const open = computed({
  get: () => props.open,
  set: () => emit('update:close')
})
const allowSave = computed(() => {
  return dataTask.title.trim() != '' && dataTask.description.trim() != ''
})

const clear = (): void => {
  Object.assign(dataTask, {
    title: '',
    description: ''
  })
}
const save = async () => {
  if (props.taskEdit) {
    const response = await updateTaskService({
      id: props.taskEdit.id,
      status: props.taskEdit.status,
      title: dataTask.title,
      description: dataTask.description
    })
    if (response.status) {
      ElNotification({
        title: 'Tarefa',
        message: 'Tarefa atualiza com sucesso',
        type: 'success'
      })
      clear()
      emit('update:close')
    } else {
      ElNotification({
        title: 'Tarefa',
        message: 'Houve um erro na atualização',
        type: 'error'
      })
    }
  } else {
    const response = await createTaskService({
      title: dataTask.title,
      description: dataTask.description,
      status: 'Pendente',
      userId: user.value?.uid!
    })

    if (response.status) {
      ElNotification({
        title: 'Tarefa',
        message: response.message,
        type: 'success'
      })
      clear()
      emit('update:close')
    } else {
      ElNotification({
        title: 'Tarefa',
        message: 'Houve um erro na inclusão',
        type: 'error'
      })
    }
  }
}

watch(open, () => {
  if (open.value) {
    clear()
    if (props.taskEdit) {
      Object.assign(dataTask, {
        title: props.taskEdit.title,
        description: props.taskEdit.description
      })
    }
  }
})
</script>

<template>
  <el-dialog v-model="open" title="Cadastro de cartão" width="600" style="max-width: 90%">
    <el-form :model="dataTask">
      <el-form-item>
        <el-input
          v-model="dataTask.title"
          placeholder="Digite um título"
          clearable
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="dataTask.description"
          placeholder="Digite uma descrição"
          clearable
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="open = false" type="danger" :disabled="loadingTask"> Fechar </el-button>
        <el-button type="primary" :disabled="!allowSave" @click="save" :loading="loadingTask">
          Salvar
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

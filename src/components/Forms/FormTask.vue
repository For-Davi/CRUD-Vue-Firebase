<script setup lang="ts">
import type { DataTask } from '@/interfaces/data/Task'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'FormTask'
})

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  'update:close': [boolean]
}>()

const open = computed({
  get: () => props.open,
  set: (value) => emit('update:close', value)
})
const allowSave = computed(() => {
  return dataTask.title.trim() != '' && dataTask.description.trim() != ''
})

const dataTask = reactive<DataTask>({
  title: '',
  description: ''
})
</script>

<template>
  <el-dialog v-model="open" title="Cadastro de cartão" width="600">
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
        <el-button @click="open = false" type="danger"> Fechar </el-button>
        <el-button type="primary" :disabled="!allowSave"> Salvar </el-button>
      </div>
    </template>
  </el-dialog>
</template>

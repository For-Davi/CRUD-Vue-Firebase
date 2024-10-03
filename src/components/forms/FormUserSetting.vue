<script setup lang="ts">
import type { DataTask } from '@/interfaces/data/Task'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'FormUSerSetting'
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
  <el-dialog v-model="open" title="Configurações do perfil" width="600">
    <el-form :model="dataTask" class="flex flex-col items-center">
      <span class="el-dropdown-link w-full flex items-center justify-center py-2">
        <el-tooltip class="box-item" effect="dark" content="Alterar foto" placement="top-start">
          <div class="cursor-pointer hover:opacity-70">
            <el-avatar src="/images/user.png" :size="100" />
          </div>
        </el-tooltip>
      </span>
      <div class="w-full">
        <el-form-item>
          <el-input
            v-model="dataTask.title"
            placeholder="Digite um nome"
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
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="open = false" type="danger"> Fechar </el-button>
        <el-button type="primary" :disabled="!allowSave"> Salvar </el-button>
      </div>
    </template>
  </el-dialog>
</template>

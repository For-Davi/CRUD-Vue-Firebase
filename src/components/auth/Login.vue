<script setup lang="ts">
import type { DataLogin } from '@/interfaces/data/Login'
import { computed, reactive } from 'vue'

defineOptions({
  name: 'Login'
})

const emit = defineEmits<{
  'update:changeRender': [string]
}>()

const dataLogin = reactive<DataLogin>({
  email: '',
  password: ''
})

const allowSave = computed(() => {
  return dataLogin.email.trim() != '' && dataLogin.password.trim() != ''
})

const changeRender = (render: string): void => {
  emit('update:changeRender', render)
}
</script>

<template>
  <el-card style="width: 500px">
    <template #header>
      <div class="card-header w-[50%] mx-auto">
        <el-image src="/images/logo-dark.png" fit="scale-down" />
      </div>
    </template>
    <el-form :model="dataLogin">
      <el-form-item>
        <el-input
          v-model="dataLogin.email"
          placeholder="Digite seu e-mail"
          clearable
          autocomplete="off"
          prefix-icon="Message"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="dataLogin.password"
          placeholder="Digite sua senha"
          clearable
          autocomplete="off"
          type="password"
          prefix-icon="Lock"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-between">
        <div>
          <el-button @click="changeRender('register')">Criar conta</el-button>
        </div>
        <div>
          <el-button type="info" @click="changeRender('reset')"> Esqueceu senha </el-button>
          <el-button type="primary" :disabled="!allowSave"> Entrar </el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

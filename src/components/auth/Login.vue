<script setup lang="ts">
import type { DataLogin } from '@/interfaces/data/Login'
import { loginService } from '@/services/auth'
import { ElNotification } from 'element-plus'
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'Login'
})

const emit = defineEmits<{
  'update:changeRender': [string]
}>()

const { loadingAuth } = storeToRefs(useAuthStore())

const router = useRouter()
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
const clear = (): void => {
  Object.assign(dataLogin, {
    email: '',
    password: ''
  })
}
const login = async () => {
  const response = await loginService(dataLogin.email, dataLogin.password)
  if (response.status) {
    clear()
    router.push('/dashboard')
  }
  if (!response.status) {
    ElNotification({
      title: 'Login',
      message: 'Erro no login. Verifique as informações',
      type: 'error'
    })
  }
}

onMounted(() => {
  clear()
})
</script>

<template>
  <el-card style="width: 500px">
    <template #header>
      <div class="card-header w-[50%] mx-auto">
        <el-image src="/images/logo-dark.png" fit="scale-down" />
      </div>
    </template>
    <el-form :model="dataLogin" autocomplete="off">
      <el-form-item>
        <el-input
          v-model="dataLogin.email"
          placeholder="Digite seu e-mail"
          clearable
          autocomplete="new-email"
          prefix-icon="Message"
          :disabled="loadingAuth"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="dataLogin.password"
          placeholder="Digite sua senha"
          clearable
          autocomplete="new-password"
          type="password"
          prefix-icon="Lock"
          show-password
          :disabled="loadingAuth"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-between">
        <div>
          <el-button @click="changeRender('register')" :disabled="loadingAuth"
            >Criar conta</el-button
          >
        </div>
        <div>
          <el-button type="info" @click="changeRender('reset')" :disabled="loadingAuth">
            Esqueceu senha
          </el-button>
          <el-button type="primary" :disabled="!allowSave" :loading="loadingAuth" @click="login">
            Entrar
          </el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

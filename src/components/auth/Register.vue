<script setup lang="ts">
import type { DataRegister } from '@/interfaces/data/Login'
import { createUserService } from '@/services/auth'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'

defineOptions({
  name: 'Register'
})

const emit = defineEmits<{
  'update:changeRender': [string]
}>()

const emailRegex = ref<RegExp>(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
const errorMessage = ref<string>('')
const dataRegister = reactive<DataRegister>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const errorMessagesMap: Record<string, string> = {
  EMPTY_NAME: 'Erro: Nome não pode estar vazio.',
  SHORT_NAME: 'Erro: Nome deve ter mais de 2 caracteres.',
  EMPTY_EMAIL: 'Erro: Email não pode estar vazio.',
  INVALID_EMAIL: 'Erro: Email inválido.',
  EMPTY_PASSWORD: 'Erro: Senha não pode estar vazia.',
  SHORT_PASSWORD: 'Erro: Senha deve ter mais de 7 caracteres.',
  EMPTY_CONFIRM_PASSWORD: 'Erro: Confirmação de senha não pode estar vazia.',
  SHORT_CONFIRM_PASSWORD: 'Erro: Confirmação de senha deve ter mais de 7 caracteres.',
  PASSWORD_MISMATCH: 'Erro: As senhas não coincidem.'
}

const allowSave = computed(() => {
  return validateData() === ''
})

const setAlertErrorForm = (): void => {
  const errorType = validateData()
  errorMessage.value = errorMessagesMap[errorType] || ''
}
const createUser = async () => {
  if (allowSave.value) {
    const response = await createUserService(
      dataRegister.email,
      dataRegister.password,
      dataRegister.name
    )
    if (response.status) {
      ElNotification({
        title: 'Cadastro',
        message: 'Seu usuário foi cadastrado',
        type: 'success'
      })
      clear()
      emit('update:changeRender', 'login')
    } else {
      ElNotification({
        title: 'Cadastro',
        message: 'Houve um erro no cadastro',
        type: 'error'
      })
    }
  } else {
    setAlertErrorForm()
  }
}
const validateData = (): string => {
  const trimmedName = dataRegister.name.trim()
  const trimmedEmail = dataRegister.email.trim()
  const trimmedPassword = dataRegister.password.trim()
  const trimmedConfirmPassword = dataRegister.confirmPassword.trim()

  if (trimmedName === '') return 'EMPTY_NAME'
  if (trimmedName.length <= 2) return 'SHORT_NAME'
  if (trimmedEmail === '') return 'EMPTY_EMAIL'
  if (!emailRegex.value.test(trimmedEmail)) return 'INVALID_EMAIL'
  if (trimmedPassword === '') return 'EMPTY_PASSWORD'
  if (trimmedPassword.length <= 7) return 'SHORT_PASSWORD'
  if (trimmedConfirmPassword === '') return 'EMPTY_CONFIRM_PASSWORD'
  if (trimmedConfirmPassword.length <= 7) return 'SHORT_CONFIRM_PASSWORD'
  if (trimmedPassword !== trimmedConfirmPassword) return 'PASSWORD_MISMATCH'

  return ''
}
const changeRender = (render: string): void => {
  emit('update:changeRender', render)
}
const clear = (): void => {
  Object.assign(dataRegister, {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
}

watch(
  errorMessage,
  (message) => {
    if (message !== '') {
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    }
  },
  { immediate: true }
)

onMounted(() => {
  clear()
})
</script>

<template>
  <div>
    <el-card style="width: 500px">
      <template #header>
        <div class="card-header w-[50%] mx-auto">
          <el-image src="/images/logo-dark.png" fit="scale-down" />
        </div>
      </template>
      <el-form :model="dataRegister" autocomplete="off">
        <el-form-item>
          <el-input
            v-model="dataRegister.name"
            placeholder="Digite seu nome"
            clearable
            autocomplete="new-name"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="dataRegister.email"
            placeholder="Digite seu e-mail"
            clearable
            autocomplete="new-email"
            prefix-icon="Message"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="dataRegister.password"
            placeholder="Digite uma senha"
            clearable
            autocomplete="new-password"
            type="password"
            prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="dataRegister.confirmPassword"
            placeholder="Confirme sua senha"
            clearable
            autocomplete="new-password"
            type="password"
            prefix-icon="Lock"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-between">
          <div>
            <el-button @click="changeRender('reset')"> Esqueceu senha </el-button>
          </div>
          <div>
            <el-button @click="changeRender('login')"> Entrar </el-button>
            <el-button type="primary" @click="createUser"> Salvar </el-button>
          </div>
        </div>
      </template>
    </el-card>
    <div
      v-show="errorMessage != ''"
      class="bg-red-600 mt-2 text-center text-white text-lg rounded-md"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

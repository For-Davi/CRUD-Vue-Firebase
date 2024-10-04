<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { sendEmailService } from '@/services/auth'
import { ElNotification } from 'element-plus'

defineOptions({
  name: 'ResetPassword'
})

const emit = defineEmits<{
  'update:changeRender': [string]
}>()

const { loadingAuth } = storeToRefs(useAuthStore())

const dataReset = reactive({
  email: '' as string
})
const emailRegex = ref<RegExp>(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

const allowSave = computed(() => {
  return dataReset.email.trim() !== '' && emailRegex.value.test(dataReset.email)
})

const changeRender = (render: string): void => {
  emit('update:changeRender', render)
}
const clear = (): void => {
  dataReset.email = ''
}
const sendEmail = async () => {
  const response = await sendEmailService(dataReset.email)
  if (response.status) {
    ElNotification({
      title: 'Redefinição de senha',
      message: response.message,
      type: 'success'
    })
    clear()
    emit('update:changeRender', 'login')
  } else {
    ElNotification({
      title: 'Redefinição de senha',
      message: response.message,
      type: 'error'
    })
  }
}

onMounted(() => {
  clear()
})
</script>

<template>
  <el-card style="width: 500px; max-width: 90%">
    <template #header>
      <div class="card-header w-[50%] mx-auto">
        <el-image src="/images/logo-dark.png" fit="scale-down" />
      </div>
    </template>
    <el-form :model="dataReset" autocomplete="off">
      <el-form-item>
        <el-input
          v-model="dataReset.email"
          placeholder="Digite seu e-mail"
          clearable
          autocomplete="new-email"
          prefix-icon="Message"
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
          <el-button @click="changeRender('login')" :disabled="loadingAuth"> Entrar </el-button>
          <el-button
            type="primary"
            :disabled="!allowSave"
            :loading="loadingAuth"
            @click="sendEmail"
          >
            Enviar e-mail de recuperação
          </el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

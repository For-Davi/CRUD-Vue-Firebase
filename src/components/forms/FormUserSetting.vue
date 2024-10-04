<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { resetPhotoUserService, updatePhotoUserService, updateUserService } from '@/services/auth'
import { ElNotification } from 'element-plus'

defineOptions({
  name: 'FormUSerSetting'
})

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  'update:close': [void]
}>()

const { user, loadingAuth } = storeToRefs(useAuthStore())

const dataUser = reactive({
  name: '' as string,
  urlPhoto: '' as string
})
const password = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

const open = computed({
  get: () => props.open,
  set: () => emit('update:close')
})
const allowSave = computed(() => {
  return dataUser.name.trim() != '' && password.value.trim().length > 7
})

const clear = (): void => {
  Object.assign(dataUser, {
    name: '',
    urlPhoto: ''
  })
  password.value = ''
}
const triggerFileInput = () => {
  if (loadingAuth.value) {
    return
  }
  fileInput.value?.click()
}
const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    try {
      const response = await updatePhotoUserService(file, user.value?.uid!)
      if (response.status) {
        ElNotification({
          title: 'Usuário',
          message: response.message,
          type: 'success'
        })
      } else {
        ElNotification({
          title: 'Usuário',
          message: 'Houve um erro na atualização da foto de perfil',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar a foto de perfil:', error)
    }
  }
}
const removeProfilePicture = async () => {
  const response = await resetPhotoUserService(user.value?.uid!)
  if (response.status) {
    ElNotification({
      title: 'Usuário',
      message: response.message,
      type: 'success'
    })
  } else {
    ElNotification({
      title: 'Usuário',
      message: 'Houve um erro na remoção da foto de perfil',
      type: 'error'
    })
  }
}
const save = async () => {
  const response = await updateUserService(dataUser.name, password.value)
  if (response.status) {
    ElNotification({
      title: 'Usuário',
      message: response.message,
      type: 'success'
    })
    clear()
    emit('update:close')
  } else {
    ElNotification({
      title: 'Usuário',
      message: 'Houve um erro na atualização',
      type: 'error'
    })
  }
}

watch(open, () => {
  if (open.value) {
    clear()
    Object.assign(dataUser, {
      name: user.value?.displayName,
      email: user.value?.email,
      urlPhoto: user.value?.photoURL
    })
  }
})
</script>

<template>
  <el-dialog v-model="open" title="Configurações do perfil" width="600" style="max-width: 90%">
    <el-form :model="dataUser" class="flex flex-col items-center">
      <span class="el-dropdown-link w-full flex items-center justify-center py-2">
        <el-tooltip class="box-item" effect="dark" content="Alterar foto" placement="top-start">
          <div
            :class="loadingAuth ? 'cursor-none opacity-70' : 'cursor-pointer hover:opacity-70'"
            @click="triggerFileInput"
          >
            <el-avatar :src="user?.photoURL ? user.photoURL : '/images/user.png'" :size="100" />
          </div>
        </el-tooltip>
      </span>
      <el-button
        v-show="user && user.photoURL && !loadingAuth"
        @click="removeProfilePicture"
        type="danger"
        class="my-2"
        size="small"
        text
      >
        <span class="font-bold"> Remover Foto </span>
      </el-button>
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
        style="display: none"
      />
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
        style="display: none"
      />
      <div class="w-full">
        <el-form-item>
          <el-input
            v-model="dataUser.name"
            placeholder="Digite um nome"
            clearable
            autocomplete="new-name"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            placeholder="Digite sua senha para confirmar a mudança"
            clearable
            autocomplete="new-password"
            type="password"
            prefix-icon="Lock"
            show-password
            :disabled="loadingAuth"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="open = false" type="danger" :disabled="loadingAuth"> Fechar </el-button>
        <el-button type="primary" :disabled="!allowSave" @click="save" :loading="loadingAuth">
          Salvar
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { logoutService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'UserOptions'
})

const emit = defineEmits<{
  'update:openFormUserSetting': [boolean]
}>()

const { user, loadingAuth } = storeToRefs(useAuthStore())

const openFormUserSetting = (): void => {
  emit('update:openFormUserSetting', true)
}
const logout = async () => {
  await logoutService()
}
</script>

<template>
  <el-dropdown trigger="click" v-show="!loadingAuth && user?.uid">
    <span class="el-dropdown-link cursor-pointer hover:opacity-70">
      <el-avatar :src="user?.photoURL ? user.photoURL : '/images/user.png'" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openFormUserSetting">
          <el-icon>
            <Setting />
          </el-icon>
          Configurações
        </el-dropdown-item>
        <el-dropdown-item @click="logout">
          <el-icon>
            <SwitchButton />
          </el-icon>
          Sair
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

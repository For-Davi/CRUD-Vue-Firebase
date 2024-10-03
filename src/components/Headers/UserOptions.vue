<script setup lang="ts">
defineOptions({
  name: 'UserOptions'
})

const emit = defineEmits<{
  'update:openFormUserSetting': [boolean]
}>()

const openFormUserSetting = (): void => {
  emit('update:openFormUserSetting', true)
}
</script>

<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-avatar src="/images/user.png" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openFormUserSetting">
          <el-icon>
            <Setting />
          </el-icon>
          Configurações
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon>
            <SwitchButton />
          </el-icon>
          Sair
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

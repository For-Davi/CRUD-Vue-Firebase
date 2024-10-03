<script setup lang="ts">
import Navbar from '@/components/Headers/Navbar.vue'
import FormTask from '@/components/Forms/FormTask.vue'
import FormUserSetting from '@/components/Forms/FormUserSetting.vue'
import { ref } from 'vue'

defineOptions({
  name: 'Dashboard'
})

const showFormTask = ref<boolean>(false)
const showFormUserSetting = ref<boolean>(false)

const openFormTask = (): void => {
  showFormTask.value = true
}
const closeFormTask = (): void => {
  showFormTask.value = false
}
const openFormUserSetting = (value: boolean): void => {
  showFormUserSetting.value = value
}
const closeFormUserSetting = (): void => {
  showFormUserSetting.value = false
}
</script>

<template>
  <section>
    <Navbar
      @update:open-form-user-setting="openFormUserSetting"
      @update:open-form-task="openFormTask"
    />
    <main>
      <el-empty description="Você não tem cartões criados">
        <el-button type="primary" icon="plus" @click="openFormTask">Criar agora</el-button>
      </el-empty>
    </main>
    <FormTask :open="showFormTask" @update:close="closeFormTask" />
    <FormUserSetting :open="showFormUserSetting" @update:close="closeFormUserSetting" />
  </section>
</template>

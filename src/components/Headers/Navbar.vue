<template>
  <nav class="bg-gray-2">
    <span>Olá, Davi!</span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar src="/public/images/user.png" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon>
              <SwitchButton />
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
  </nav>
</template>

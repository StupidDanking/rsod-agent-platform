<template>
  <aside class="app-sidebar">
    <el-menu
      class="sidebar-menu"
      :default-active="route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      router
    >
      <el-menu-item
        v-for="item in menuItems"
        :key="item.path"
        :index="item.path"
      >
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  DataAnalysis,
  ChatDotRound,
  Aim,
  Cpu,
  Clock,
} from '@element-plus/icons-vue'

const route = useRoute()

const menuItems = [
  {
    path: '/dashboard',
    title: '数据看板',
    icon: DataAnalysis,
  },
  {
    path: '/chat',
    title: '智能对话',
    icon: ChatDotRound,
  },
  {
    path: '/detection',
    title: '目标检测',
    icon: Aim,
  },
  {
    path: '/training',
    title: '模型训练',
    icon: Cpu,
  },
  {
    path: '/history',
    title: '历史记录',
    icon: Clock,
  },
]
</script>

<style lang="scss" scoped>
.app-sidebar {
  width: $sidebar-width;
  height: 100%;
  background: $sidebar-bg;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;

  &.is-active {
    background-color: rgba(64, 158, 255, 0.15) !important;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05) !important;
  }
}
</style>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logo-icon">🎯</div>
        <h1>RSOD Agent Platform</h1>
        <p>基于 YOLOv11 的目标检测智能体平台</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="top"
        class="auth-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名或邮箱"
            size="large"
            clearable
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            clearable
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-button
          type="primary"
          size="large"
          class="submit-btn"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form>

      <div class="auth-footer">
        <span>还没有账号？</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true

    try {
      await userStore.loginAction({
        username: loginForm.username,
        password: loginForm.password,
      })

      await userStore.fetchUserInfo()

      ElMessage.success('登录成功')

      const redirect = route.query.redirect || '/dashboard'
      router.push(redirect)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.auth-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #eef5ff 0%, #f5f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
}

.auth-card {
  width: 420px;
  background: #fff;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  padding: $spacing-xl;
}

.auth-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  .logo-icon {
    font-size: 48px;
    margin-bottom: $spacing-md;
  }

  h1 {
    font-size: 24px;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }

  p {
    color: $text-secondary;
    font-size: 14px;
  }
}

.auth-form {
  .submit-btn {
    width: 100%;
    margin-top: $spacing-md;
  }
}

.auth-footer {
  margin-top: $spacing-lg;
  text-align: center;
  color: $text-secondary;

  a {
    margin-left: $spacing-xs;
    color: $primary-color;
    font-weight: 500;
  }
}
</style>

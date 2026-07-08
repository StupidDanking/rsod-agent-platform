import { defineStore } from 'pinia'
import {
  login,
  register,
  getCurrentUser,
  logout as logoutApi,
} from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('access_token') || '',
    username: localStorage.getItem('username') || '',
    userInfo: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,

    displayName: (state) => {
      return state.userInfo?.username || state.username || '未登录'
    },
  },

  actions: {
    /**
     * 用户注册
     */
    async registerAction(registerForm) {
      const res = await register(registerForm)
      return res
    },

    /**
     * 用户登录
     */
    async loginAction(loginForm) {
      const res = await login(loginForm)

      this.token = res.access_token
      this.username = res.username

      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('username', res.username)

      return res
    },

    /**
     * 获取当前用户信息
     */
    async fetchUserInfo() {
      if (!this.token) {
        return null
      }

      const res = await getCurrentUser()
      this.userInfo = res
      this.username = res.username

      localStorage.setItem('username', res.username)

      return res
    },

    /**
     * 退出登录
     */
    logoutAction() {
      logoutApi()

      this.token = ''
      this.username = ''
      this.userInfo = null
    },
  },
})

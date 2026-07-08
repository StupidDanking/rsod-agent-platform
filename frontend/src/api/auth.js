import request from '@/utils/request'

/**
 * 用户注册
 * 后端接口：POST /api/auth/register
 *
 * @param {Object} data
 * @param {string} data.username 用户名
 * @param {string} data.email 邮箱
 * @param {string} data.password 密码
 */
export function register(data) {
  return request.post('/api/auth/register', data)
}

/**
 * 用户登录
 * 后端接口：POST /api/auth/login
 *
 * 注意：
 * 当前后端 login 使用 OAuth2PasswordRequestForm，
 * 所以前端这里要提交 application/x-www-form-urlencoded 格式。
 *
 * @param {Object} data
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 */
export function login(data) {
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('password', data.password)

  return request.post('/api/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

/**
 * 获取当前登录用户信息
 * 后端接口：GET /api/auth/me
 *
 * request.js 会自动从 localStorage 里读取 access_token，
 * 并添加 Authorization: Bearer xxx 请求头。
 */
export function getCurrentUser() {
  return request.get('/api/auth/me')
}

/**
 * 退出登录
 *
 * 当前后端没有专门的 logout 接口，
 * 所以前端只需要清除本地 token 和用户名即可。
 */
export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('username')
}

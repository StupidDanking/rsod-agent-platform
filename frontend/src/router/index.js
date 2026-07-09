import { createRouter, createWebHistory } from 'vue-router'

const appTitle = import.meta.env.VITE_APP_TITLE || 'PCB Defect Agent Platform'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: '用户登录',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: {
      title: '用户注册',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: () => import('@/components/layout/MainLayout.vue'),
    redirect: '/dashboard',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardPage.vue'),
        meta: {
          title: '数据看板',
          icon: 'DataAnalysis',
        },
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/views/ChatPage.vue'),
        meta: {
          title: '智能问答',
          icon: 'ChatDotRound',
        },
      },
      {
        path: 'detection',
        name: 'Detection',
        component: () => import('@/views/DetectionPage.vue'),
        meta: {
          title: 'PCB 缺陷检测',
          icon: 'Aim',
        },
      },
      {
        path: 'training',
        name: 'Training',
        component: () => import('@/views/TrainingPage.vue'),
        meta: {
          title: '模型训练',
          icon: 'Cpu',
        },
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/HistoryPage.vue'),
        meta: {
          title: '检测历史',
          icon: 'Clock',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - ${appTitle}`
    : appTitle

  const token = localStorage.getItem('access_token')
  const requiresAuth = to.matched.some(
    (record) => record.meta.requiresAuth !== false,
  )

  if (requiresAuth && !token) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  // INTRO PAGE (default first page)
  {
    path: '/',
    name: 'Intro',
    component: () => import('@/modules/dashboard/views/IntroPage.vue'),
  },

  // LOGIN
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/modules/auth/views/UserLogin.vue'),
      },
    ],
  },

  // REQUEST ACCOUNT PAGE
  {
    path: '/request-account',
    name: 'RequestAccount',
    component: () => import('@/modules/auth/views/RequestAccount.vue'),
  },

  // MANAGER ROUTES
  {
    path: '/manager',
    component: AppLayout,
    meta: { requiresAuth: true, role: 'Manager' },
    children: [
      { path: '', name: 'Dashboard', component: () => import('@/modules/dashboard/views/AdminDashboard.vue') },
      { path: 'produce', name: 'Produce', component: () => import('@/modules/produce/views/ProduceList.vue') },
      { path: 'produce/add', name: 'AddProduce', component: () => import('@/modules/produce/views/ProduceForm.vue') },
      { path: 'sales', name: 'ManagerSales', component: () => import('@/modules/sales/views/SalesList.vue') },
      { path: 'credit', name: 'ManagerCredit', component: () => import('@/modules/credit/views/CreditList.vue') },
    ],
  },

  // AGENT ROUTES
  {
    path: '/agent',
    component: AppLayout,
    meta: { requiresAuth: true, role: 'SalesAgent' },
    children: [
      { path: '', name: 'AgentDashboard', component: () => import('@/modules/dashboard/views/AgentDashboard.vue') },
      { path: 'sales', name: 'AgentSales', component: () => import('@/modules/sales/views/SalesList.vue') },
      { path: 'sales/add', name: 'AddSale', component: () => import('@/modules/sales/views/SalesForm.vue') },
      { path: 'credit', name: 'AgentCredit', component: () => import('@/modules/credit/views/CreditList.vue') },
      { path: 'credit/add', name: 'AddCredit', component: () => import('@/modules/credit/views/CreditForm.vue') },
    ],
  },

  // DIRECTOR ROUTES
  {
    path: '/director',
    component: AppLayout,
    meta: { requiresAuth: true, role: 'Director' },
    children: [
      { path: '', name: 'DirectorDashboard', component: () => import('@/modules/dashboard/views/DirectorDashboard.vue') },
      { path: 'analytics', name: 'Analytics', component: () => import('@/modules/analytics/views/BranchAnalytics.vue') },
      { path: 'user-management', name: 'UserManagement', component: () => import('@/modules/auth/views/UserManagement.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 ROUTE GUARD
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.token) {
    return '/login'
  }

  if (to.meta.role && authStore.role !== to.meta.role) {
    return '/login'
  }

  return true
})

export default router

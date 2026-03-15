import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

/* =============================
   REQUEST INTERCEPTOR
   Auto attach token
============================= */

api.interceptors.request.use((config) => {
  const uiStore = useUIStore()
  uiStore.startLoading()
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  if (authStore.user?.branch) {
    config.headers['x-branch'] = authStore.user.branch
  }
  return config
})

/* =============================
   RESPONSE INTERCEPTOR
   Handle expired token
============================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const uiStore = useUIStore()
    uiStore.stopLoading()
    if (error.response?.status === 401) {
      const uiStore = useUIStore()
      uiStore.stopLoading()
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api

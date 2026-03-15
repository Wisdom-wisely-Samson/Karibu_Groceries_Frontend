import { defineStore } from 'pinia'
import authService from '@/services/authService'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: null,
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
    userBranch: (state) => state.user?.branch,
  },

  actions: {
    async login(credentials) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, credentials)

      const data = res.data
      this.user = data.user
      this.role = data.user.role
      this.token = data.token

      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      localStorage.setItem('user', JSON.stringify(data.user))

      return res.data.user.role
    },

    logout() {
      this.user = null
      this.role = null
      this.token = null
      localStorage.clear()
    },
  },
})

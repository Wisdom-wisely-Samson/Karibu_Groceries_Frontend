import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserManagementStore = defineStore('userManagement', {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const res = await api.get('/api/auth/users')

        this.users = res.data.users || []
      } catch (err) {
        console.error('User fetch error:', err)
      }
    },

    async addUser(userData) {
      try {
        const res = await api.post('/api/auth/register', userData)

        if (res.data.user) {
          this.users.push(res.data.user)
        }
      } catch (err) {
        console.error('User add error:', err)
      }
    },
    async updateUser(userId, updatedData) {
      try {
        const res = await api.put(`/api/auth/users/${userId}`, updatedData)
        const index = this.users.findIndex((u) => u._id === userId)
        if (index !== -1) {
          this.users[index] = res.data
        }
      } catch (err) {
        console.error('User update error:', err)
      }
    },
    async deleteUser(userId) {
      try {
        await api.delete(`/api/auth/users/${userId}`)
        this.users = this.users.filter((u) => u._id !== userId)
      } catch (err) {
        console.error('User delete error:', err)
      }
    },
  },
})

import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    branches: [], // reactive array with all metrics
  }),

  actions: {
    async fetchAnalytics() {
      try {
        const res = await api.get('/reports')
        this.branches = res.data.branches
      } catch (err) {
        console.error('Analytics fetch error:', err)
      }
    },

    async addBranchMetric(payload) {
      try {
        const res = await api.post('/reports', payload)
        const newBranch = res.data
        // ✅ instantly update state
        this.branches.push(newBranch)
        return newBranch
      } catch (err) {
        console.error('Add branch metric error:', err)
      }
    },

    async updateBranchMetric(id, payload) {
      try {
        const res = await api.put(`/reports/${id}`, payload)
        const updated = res.data
        // ✅ replace item in array
        const index = this.branches.findIndex(b => b._id === id)
        if (index !== -1) this.branches[index] = updated
        return updated
      } catch (err) {
        console.error('Update branch metric error:', err)
      }
    },

    async deleteBranchMetric(id) {
      try {
        await api.delete(`/reports/${id}`)
        // ✅ remove item from array
        this.branches = this.branches.filter(b => b._id !== id)
      } catch (err) {
        console.error('Delete branch metric error:', err)
      }
    }
  }
})

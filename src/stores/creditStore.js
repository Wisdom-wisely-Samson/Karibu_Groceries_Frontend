import { defineStore } from 'pinia'
import creditService from '@/services/creditService'

export const useCreditStore = defineStore('credit', {
  state: () => ({
    creditsales: [], // reactive array of credit sales
  }),

  getters: {
    totalCreditAmount: (state) =>
      state.creditsales.reduce((sum, credit) => sum + credit.amountDue, 0),
  },

  actions: {
    async fetchCredits() {
      const res = await creditService.getCreditsales()
      this.creditsales = res.data
    },

    addCredit(credit) {
      // ✅ instantly update state
      this.creditsales.unshift(credit)
    },

    async createCredit(data) {
      const { useDashboardStore } = await import('./dashboardStore')
      const res = await creditService.createCredit(data)
      const newCredit = res.data

      // ✅ instantly update state
      this.creditsales.unshift(newCredit)

      // Refresh dashboard totals
      const dashboardStore = useDashboardStore()
      dashboardStore.refreshStats()

      return newCredit
    },

    async updateCredit(id, data) {
      const res = await creditService.updateCredit(id, data)
      const updated = res.data

      // ✅ replace item in array
      const index = this.creditsales.findIndex((c) => c._id === id)
      if (index !== -1) this.creditsales[index] = updated

      return updated
    },

    async deleteCredit(id) {
      await creditService.deleteCredit(id)

      // ✅ remove item from array
      this.creditsales = this.creditsales.filter((c) => c._id !== id)
    },

    async repayCredit(id, data) {
      const res = await creditService.repayCredit(id, data)
      const updated = res.data

      // ✅ replace item in array
      const index = this.creditsales.findIndex((c) => c._id === id)
      if (index !== -1) this.creditsales[index] = updated

      return updated
    },
  },
})

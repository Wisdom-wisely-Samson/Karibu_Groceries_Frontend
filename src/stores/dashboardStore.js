// src/stores/adminDashboardStore.js
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    totalSales: 0,
    totalCredit: 0,
    totalCost: 0,
    totalStock: 0,
    revenue: 0,
  }),

  actions: {
    async fetchDashboard() {
      try {
        const res = await api.get('/dashboard')
        this.totalSales = res.data.totalSales
        this.totalCredit = res.data.totalCredit
        this.totalCost = res.data.totalCost
        this.totalStock = res.data.totalStock
        this.revenue = res.data.revenue
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      }
    },

    // ✅ Instantly update totals after a new sale
    updateAfterSale(newSale) {
      this.totalSales += newSale.amountPaid
      this.totalStock -= newSale.tonnageSold
      this.revenue = this.totalSales - this.totalCost
    },

    // ✅ Instantly update totals after a new credit
    updateAfterCredit(newCredit) {
      this.totalCredit += newCredit.amountDue
      this.totalStock -= newCredit.tonnage
      this.revenue = this.totalSales - this.totalCost
    },

    // ✅ Instantly update totals after new produce
    updateAfterProduce(newProduce) {
      this.totalCost += newProduce.cost
      this.totalStock += newProduce.tonnage
      this.revenue = this.totalSales - this.totalCost
    },

    // ✅ Refresh stats manually if needed
    async refreshStats() {
      await this.fetchDashboard()
    },
  },
})

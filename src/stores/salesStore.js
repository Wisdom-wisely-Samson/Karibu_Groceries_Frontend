import { defineStore } from 'pinia'
import salesService from '@/services/salesService'

export const useSalesStore = defineStore('sales', {
  state: () => ({
    sales: [],
  }),

  getters: {
    totalSalesAmount: (state) => state.sales.reduce((sum, sale) => sum + sale.amountPaid, 0),
  },

  actions: {
    async fetchSales() {
      const res = await salesService.getSales()
      this.sales = res.data
    },

    addSale(sale) {
      this.sales.unshift(sale)
    },

    async createSale(data) {
      const { useProduceStore } = await import('./produceStore')
      const { useDashboardStore } = await import('./dashboardStore')

      const res = await salesService.createSale(data)

      this.sales.unshift(res.data)

      // 🔥 Refresh dashboard totals
      const dashboardStore = useDashboardStore()
      dashboardStore.refreshStats()
    },
    async updateSale(id, data) {
      const res = await salesService.updateSale(id, data)
      const index = this.sales.findIndex((s) => s._id === id)
      if (index !== -1) {
        this.sales[index] = res.data
      }
    },
    async deleteSale(id) {
      await salesService.deleteSale(id)
      const index = this.sales.findIndex((s) => s._id === id)
      if (index !== -1) {
        this.sales.splice(index, 1)
      }
    }
  },
})

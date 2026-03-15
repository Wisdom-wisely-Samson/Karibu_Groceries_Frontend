import { defineStore } from 'pinia'
import axios from 'axios'
import produceService from '@/services/produceService'
export const useProduceStore = defineStore('produce', {
  state: () => ({
    produceList: [],
    loading: false,
  }),

  getters: {
    totalStock: (state) => state.produces.reduce((sum, item) => sum + item.tonnage, 0),
  },

  actions: {
    async fetchProduces() {
      this.loading = true
      try {
        const res = await produceService.getProduce()
        this.produceList = res.data
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      } 
    },
    async createProduce(data) {
      const { useDashboardStore } = await import('./dashboardStore')
      const res = await produceService.createProduce(data)
      this.produces.push(res.data)
      const dashboardStore = useDashboardStore()
      dashboardStore.refreshStats()
    },

    deductStock(id, quantity) {
      const item = this.produces.find((p) => p._id === id)
      if (item && item.tonnage >= quantity) {
        item.tonnage -= quantity
      }
    },
    async updateProduce(id, data) {
      const res = await produceService.updateProduce(id, data)
      const index = this.produceList.findIndex((p) => p._id === id)
      if (index !== -1) {
        this.produceList[index] = res.data
      }
    },
    async deleteProduce(id, data) {
      await produceService.deleteProduce(id, data)
      const index = this.produceList.findIndex((p) => p._id === id)
      if (index !== -1) {
        this.produceList.splice(index, 1)
      }
    }
  }
}
);

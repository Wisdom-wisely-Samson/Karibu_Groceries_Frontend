import { defineStore } from "pinia"
import axios from "axios"

export const useStockStore = defineStore("stock", {
  state: () => ({
    stock: []
  }),

  actions: {
    async fetchStock() {
      const res = await axios.get("/produce/stock")
      this.stock = res.data
    }
  }
})
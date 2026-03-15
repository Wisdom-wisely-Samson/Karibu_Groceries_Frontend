import api from './api'

export default {
  getSales() {
    return api.get('/sales')
  },

  createSale(data) {
    return api.post('/sales', data)
  },
  updateSale(id, data) {
    return api.put(`/sales/${id}`, data)
  },

  deleteSale(id) {
    return api.delete(`/sales/${id}`)
}
}

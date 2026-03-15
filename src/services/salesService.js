import api from './api'

export default {
  getSales() {
    return api.get('/api/sales')
  },

  createSale(data) {
    return api.post('/api/sales', data)
  },
  updateSale(id, data) {
    return api.put(`/api/sales/${id}`, data)
  },

  deleteSale(id) {
    return api.delete(`/api/sales/${id}`)
  },
}

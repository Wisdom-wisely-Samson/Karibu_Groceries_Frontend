import api from './api'

export default {
  getProduce() {
    return api.get('/api/produce')
  },

  createProduce(data) {
    return api.post('/api/produce', data)
  },

  deduct(id, quantity) {
    return api.put(`/api/produce/${id}/deduct`, { quantity })
  },

  updateProduce(id, data) {
    return api.put(`/api/produce/${id}`, data)
  },

  deleteProduce(id, data) {
    return api.delete(`/api/produce/${id}`, data)
  },
}

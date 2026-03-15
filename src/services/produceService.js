import api from './api'

export default {
  getProduce() {
    return api.get('/produce')
  },

  createProduce(data) {
    return api.post('/produce', data)
  },

  deduct(id, quantity) {
    return api.put(`/produce/${id}/deduct`, { quantity })
  },

    updateProduce(id, data) {
      return api.put(`/produce/${id}`, data)
  },

  deleteProduce(id, data) {
    return api.delete(`/produce/${id}`, data)
  }
}  

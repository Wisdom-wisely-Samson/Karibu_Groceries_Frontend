import api from './api'

export default {
  getCreditsales() {
    return api.get('/credit-sales')
  },

  createCredit(data) {
    return api.post('/credit-sales', data)
  },
  updateCredit(id, data) {
    return api.put(`/credit-sales/${id}`, data)
  },

  deleteCredit(id) {
    return api.delete(`/credit-sales/${id}`)
  },
  repayCredit(id, data) {
    return api.post(`/credit-sales/${id}/repay`, data)
  }
}

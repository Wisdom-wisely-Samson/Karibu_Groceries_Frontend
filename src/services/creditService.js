import api from './api'

export default {
  getCreditsales() {
    return api.get('/api/credit-sales')
  },

  createCredit(data) {
    return api.post('/api/credit-sales', data)
  },
  updateCredit(id, data) {
    return api.put(`/api/credit-sales/${id}`, data)
  },

  deleteCredit(id) {
    return api.delete(`/api/credit-sales/${id}`)
  },
  repayCredit(id, data) {
    return api.post(`/api/credit-sales/${id}/repay`, data)
  },
}

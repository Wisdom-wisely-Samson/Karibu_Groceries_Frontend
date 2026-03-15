import api from '@/services/api' // adjust path if needed

export default {
  login(credentials) {
    return api.post('/api/auth/login', credentials)
  },
}

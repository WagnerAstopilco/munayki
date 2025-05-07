import apiClient from '@/axios'

export default {
  getDestinos() {
    return apiClient.get('/destinos')
  },

  getDestinoDetails(id) {
    return apiClient.get(`/destinos/${id}`)
  },

  postDestino(newDestino) {
    return apiClient.post('/destinos', newDestino)
  },

  patchDestino(id, updatedDestino) {
    return apiClient.patch(`/destinos/${id}`, updatedDestino)
  },

  deleteDestino(id) {
    return apiClient.delete(`/destinos/${id}`)
  }
}

import apiClient from '@/axios';

export default {
  getActividades() {
    return apiClient.get('/activities');
  },
  getActividadDetails(id) {
    return apiClient.get(`/activities/${id}`);
  },
  postActividad(payload) {
    return apiClient.post('/activities', payload);
  },
  patchActividad(id, payload) {
    return apiClient.patch(`/activities/${id}`, payload);
  },
  deleteActividad(id) {
    return apiClient.delete(`/activities/${id}`);
  }
};

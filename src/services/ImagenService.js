import apiClient from '@/axios'

export default {
    getImagenes() {
        return apiClient.get('/images')
    },

    getImagenDetails(id) {
        return apiClient.get(`/images/${id}`)
    },

    postImagen(newImagen) {
        return apiClient.post('/images', newImagen,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    patchImagen(id, updatedImagen) {
        return apiClient.patch(`/images/${id}`, updatedImagen)
    },

    deleteImagen(id) {
        return apiClient.delete(`/images/${id}`)
    }
}

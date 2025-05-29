import apiClient from '@/axios'

export default {
  // Obtener todos los productos
  getProductos() {
    return apiClient.get('/products')
  },

  // Obtener un producto específico
  getProducto(id) {
    return apiClient.get(`/products/${id}`)
  },

  // Crear nuevo producto
  postProducto(producto) {
    return apiClient.post('/products', producto,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
  },

  // Actualizar producto existente
  patchProducto(id, producto) {
    return apiClient.post(`/products/${id}`, producto,{
            headers: { 
                "Content-Type": "multipart/form-data",
                "X-HTTP-Method-Override": "PATCH",
            }
        });
  },

  // Eliminar producto
  deleteProducto(id) {
    return apiClient.delete(`/productos/${id}`)
  },

  // Subir múltiples imágenes al producto
  // uploadImagenes(id, formData) {
  //   return apiClient.post(`/productos/${id}/imagenes`, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  // },

  // // Subir brochure (archivo único)
  // uploadBrochure(id, formData) {
  //   return apiClient.post(`/productos/${id}/file`, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  // }
}

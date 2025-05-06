import apiClient from '@/axios';
export default {
    getCategories(){
        return apiClient.get('/categories');
    },
    getCategoryDetails(id){
        return apiClient.get(`/categories/${id}`);
    },
    postCategory(newCategory){
        return apiClient.post('/categories', newCategory);
    },
    patchCategory(id,Category){
        return apiClient.patch(`/categories/${id}`,Category);
    },
    deleteCategory(id){
        return apiClient.delete(`/categories/${id}`);
    },
    postCoursesToCategory(categoryId, coursesIds) {
        return apiClient.post(`/categories/${categoryId}/courses`, coursesIds);
    },
}
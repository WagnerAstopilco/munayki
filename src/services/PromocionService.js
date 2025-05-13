import apiClient from '@/axios';
export default {
    getPromotions(){
        return apiClient.get('/promotions');
    },
    getPromotionDetails(id){
        return apiClient.get(`/promotions/${id}`);
    },
    postPromotion(newPromotion){
        return apiClient.post('/promotions', newPromotion);
    },
    patchPromotion(id,Promotion){
        return apiClient.patch(`/promotions/${id}`,Promotion);
    },
    deletePromotion(id){
        return apiClient.delete(`/promotions/${id}`);
    },
}
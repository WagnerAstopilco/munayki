import apiClient from '@/axios';
export default {
    getCoupons(){
        return apiClient.get('/coupons');
    },
    getCouponDetails(id){
        return apiClient.get(`/coupons/${id}`);
    },
    postCoupon(newCoupon){
        return apiClient.post('/coupons', newCoupon);
    },
    patchCoupon(id,Coupon){
        return apiClient.patch(`/coupons/${id}`,Coupon);
    },
    deleteCoupon(id){
        return apiClient.delete(`/coupons/${id}`);
    },
}
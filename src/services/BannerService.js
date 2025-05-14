import apiClient from '@/axios';

export default {
    getBanner() {
        return apiClient.get('/banner');
    },
    putBanner(data) {
        return apiClient.put('/banner',data);
    },
}
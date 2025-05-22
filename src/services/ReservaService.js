import apiClient from '@/axios';
export default {
    getReservations(){
        return apiClient.get('/reservations');
    },
    getReservationDetails(id){
        return apiClient.get(`/reservations/${id}`);
    },
    postReservation(newReservation){
        return apiClient.post('/reservations', newReservation);
    },
    patchReservation(id,Reservation){
        return apiClient.patch(`/reservations/${id}`,Reservation);
    },
    deleteReservation(id){
        return apiClient.delete(`/reservations/${id}`);
    },
    createPaymentPreference(payload) {
        return apiClient.post('/mercadopago/preference', payload);
      }
      
}
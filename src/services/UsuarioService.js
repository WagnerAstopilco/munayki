import apiClient from '@/axios';
export default {
    getUsers(){
        return apiClient.get('/users');
    },
    getUserDetails(id){
        return apiClient.get(`/users/${id}`);
    },
    postUser(newUser){
        return apiClient.post('/users', newUser,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        });
    },
    patchUser(id,User){
        return apiClient.patch(`/users/${id}`,User,{
            headers: { 
                "Content-Type": "multipart/form-data",
                "X-HTTP-Method-Override": "PATCH",
            }
        });
    },
    deleteUser(id){
        return apiClient.delete(`/users/${id}`);
    },
}
import axios from "axios";


const api_profile = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listProfileApi = () => api_profile.get(`/profile/list`);
export const getProfileApi = (id) => api_profile.get(`/profile/${id}`);
export const updateProfileApi = (id, data) => api_profile.put(`/profile/update/${id}`, data);
export const deleteProfileApi = (id) => api_profile.delete(`/profile/delete/${id}`);
export const createProfileApi = (data) => api_profile.post(`/profile/create`, data);


export default api_profile;
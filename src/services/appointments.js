import axios from "axios";


const api_appointments = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listProfileApi = () => api_appointments.get(`/profile/list`);
export const getProfileApi = (id) => api_appointments.get(`/profile/${id}`);
export const updateProfileApi = (id, data) => api_appointments.put(`/profile/update/${id}`, data);
export const deleteProfileApi = (id) => api_appointments.delete(`/profile/delete/${id}`);
export const createProfileApi = (data) => api_appointments.post(`/profile/create`, data);


export default api_appointments;
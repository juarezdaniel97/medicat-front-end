import axios from "axios";

const api = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const loginUser = (credientials) => api.post(`/auth/login`, credientials);
export const registerUser = (credientials) => api.post(`/auth/register`, credientials);
export const getUser = (id) => api.get(`/auth/${id}`);
export const updateUser = (id, data) => api.put(`/auth/${id}`, data);


export default api;
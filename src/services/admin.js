import axios from "axios";


const api_admin = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listAdminsApi = () => api_admin.get(`/admin/list`);
export const getAdminApi = (id) => api_admin.get(`/admin/${id}`);
export const updateAdminApi = (id, data) => api_admin.put(`/admin/update/${id}`, data);
export const deleteAdminApi = (id) => api_admin.delete(`/admin/delete/${id}`);
export const createAdminApi = (data) => api_admin.post(`/admin/create`, data);


export default api_admin;
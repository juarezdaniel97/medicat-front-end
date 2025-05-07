import axios from "axios";


const api_profileMedico = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listProfileApi = () => api_profileMedico.get(`/medico/list`);
export const getProfileApi = (id) => api_profileMedico.get(`/medico/${id}`);
export const updateProfileApi = (id, data) => api_profileMedico.put(`/medico/update/${id}`, data);
export const deleteProfileApi = (id) => api_profileMedico.delete(`/medico/delete/${id}`);
export const createProfileApi = (data) => api_profileMedico.post(`/medico/create`, data);


export default api_profileMedico;
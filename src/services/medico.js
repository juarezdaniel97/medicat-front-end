import axios from "axios";


const api_Medico = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listProfileApi = () => api_Medico.get(`/medico/list`);
export const getProfileApi = (id) => api_Medico.get(`/medico/${id}`);
export const getMedicoTurnoApi = (id) => api_Medico.get(`/paciente/turno/${id}`);
export const updateProfileApi = (id, data) => api_Medico.put(`/medico/update/${id}`, data);
export const deleteProfileApi = (id) => api_Medico.delete(`/medico/delete/${id}`);
export const createProfileApi = (data) => api_Medico.post(`/medico/create`, data);


export default api_Medico;
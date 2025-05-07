import axios from "axios";


const api_patient = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listPatientApi = () => api_patient.get(`/paciente/list`);
export const getPatientApi = (id) => api_patient.get(`/paciente/${id}`);
export const getPatientTurnoApi = (id) => api_patient.get(`/paciente/turno/${id}`);
export const updatePatientApi = (id, data) => api_patient.put(`/paciente/update/${id}`, data);
export const deletePatientApi = (id) => api_patient.delete(`/paciente/delete/${id}`);
export const createPatientApi = (data) => api_patient.post(`/paciente/create`, data);


export default api_patient;
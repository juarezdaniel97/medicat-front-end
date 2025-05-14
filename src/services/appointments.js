import axios from "axios";


const api_appointments = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const listAppointmentsApi = () => api_appointments.get(`/turno/list`);
export const getAppointmentsApi = (id) => api_appointments.get(`/turno/${id}`);
export const updateAppointmentsApi = (id, data) => api_appointments.put(`/turno/update/${id}`, data);
export const deleteAppointmentsApi = (id) => api_appointments.delete(`/turno/delete/${id}`);
export const createAppointmentsApi = (data) => api_appointments.post(`/turno/create`, data);


export default api_appointments;
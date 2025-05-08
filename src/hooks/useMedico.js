import { useState } from "react"
import api_Medico, { getMedicoTurnoApi, listProfileApi } from "../services/medico"


export const useMedico = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [medicos, setMedicos] = useState(null);

    
    const getTurnosAsociados = async (id) => {
        try {
            const response = await getMedicoTurnoApi(id);
            console.log('response -->', response.data);
            

        } catch (error) {
            console.log('Error al obtener los turnos asociados', error);
        }
    }

    const ListMedicos = async () =>{
        setLoading(true);
        setError(null);
        
        try {
            const token = localStorage.getItem("token");
            api_Medico.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await listProfileApi();
            return response.data;

        } catch (error) {
            console.error("Error al obtener el listado de medicos", error);
            setError(error.response.data.message || "Error al obtener listado de medicos");
            return false;

        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        medicos,
        setMedicos,
        ListMedicos,
        getTurnosAsociados,
    }
}
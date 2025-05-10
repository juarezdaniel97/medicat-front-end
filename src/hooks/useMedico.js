import { useState } from "react"
import api_Medico, { getMedicoApi, getMedicoTurnoApi, listMedicosApi } from "../services/medico"
import { jwtDecode } from "jwt-decode";


export const useMedico = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [medicos, setMedicos] = useState(null);
    const [dataMedico, setDataMedico] = useState(null);

    
    const getMedico = async () =>{
        setLoading(true)
        setError(null)

        try {
            
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const id = decoded.id;

            api_Medico.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await getMedicoApi(id);
            return response.data;

        } catch (error) {
            console.error("Error al obtener médico", error);
            setError(error.response.data.message || "Error al obtener médico")
            return false;

        }finally{
            setLoading(false);
        }
    }

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
            const response = await listMedicosApi();
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
        getMedico,
        setDataMedico,
        dataMedico
    }
}
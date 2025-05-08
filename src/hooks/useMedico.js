import { useEffect, useState } from "react"
import api_Medico, { getMedicoTurnoApi, listProfileApi } from "../services/medico"
import { set } from "react-hook-form";
import { jwtDecode } from "jwt-decode";


export const useMedico = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [medicos, setMedicos] = useState(null);

    
    const addMedico = async (data) =>{}

    const editMedico = async (id, data) =>{}

    const getTurnosAsociados = async (id) => {
        try {
            const response = await getMedicoTurnoApi(id);
            console.log('response -->', response.data);
            

        } catch (error) {
            console.log('Error al obtener los turnos asociados', error);
        }
    }

    const getMedico = async (id) =>{}
    
    const ListMedicos = async () =>{
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            api_Medico.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await listProfileApi();
            console.log('response -->', response.data);
            setMedicos(response.data);

        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        success,
        medicos,
        addMedico,
        editMedico,
        getTurnosAsociados,
        getMedico,
        ListMedicos
    }
}
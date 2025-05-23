import { useState } from "react"
import api_Medico, { createProfileApi, getMedicoApi, getMedicoTurnoApi, listMedicosApi, updateMedicoApi } from "../services/medico"
import { jwtDecode } from "jwt-decode";
import { roleMap } from "../utils/roleMap";
import { getUser, updateUser } from "../services/auth";


export const useMedico = () =>{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [medicos, setMedicos] = useState(null);
    const [dataMedico, setDataMedico] = useState(null);
    const [agenda, setAgenda] = useState(null);
    const [success, setSuccess] = useState(null);
    
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
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            api_Medico.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await getMedicoTurnoApi(id);
            return response.data;
            

        } catch (error) {
            console.error("Error al obtener turnos del médico", error);
            setError(error.response.data.message || "Error al obtener turnos del médico");
            return false;
        }finally{
            setLoading(false);
        }
    }

    const createMedico = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            
            /*
                Antes de crear un perfil de medico debemos  preguntar el rol del usuario si es de tipo "paciente"
                lo actualizamos (porqe cuando creamos un usuario por defecto asume el rol de paciente) al rol de 
                médico de paciente.
            
            */ 
            const token = localStorage.getItem("token");
            api_Medico.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const decoded = jwtDecode(token);
            const { name } = decoded.role
            
            
            //Cuando se crea por primera vez un usuario y luego se crea un perfil de Médico debemos actualizar el rol
            if (name === 'paciente') {
                
                //Obtenemos el usuario para cambiarle el rol (de paciente a Medico)
                const response = await getUser(decoded.id);
                
                const roleData = roleMap['medico'] || { name: "unknown", description: "sin rol", permission: []}
                
                const userData = {
                    email: response.data.user.email,
                    role: roleData.id
                }

                const userUpdate = await updateUser(decoded.id,userData)
                console.log('userUpdate -->', userUpdate);
                
                //debemos crear el perfil
                const responseProfile = await createProfileApi(data);

                console.log('responseProfile -->', responseProfile);
                setSuccess("Datos creados correctamente");
                return responseProfile.data;
            }

            //Aquí crear medicos por parte del admin

        } catch (err) {
            console.error("Error durante el registro de datos del médico. ", err);
            const errorMessage = `${ err.response?.data?.message}, ${err.response?.data?.error}` || "Error al registrar datos del médico";
            setError(errorMessage);

        }finally{
            setLoading(false)
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

    const editMedico = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const id = decoded.id;

            api_Medico.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await updateMedicoApi(id, data);

            return response.data;

        } catch (error) {
            console.error("Error al actualizar medico", error);
            setError(error.response.data.message || "Error al actualizar paciente");
            return false;

        }finally{
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        setError,
        medicos,
        setMedicos,
        ListMedicos,
        getTurnosAsociados,
        setAgenda,
        agenda,
        getMedico,
        setDataMedico,
        dataMedico,
        createMedico,
        success,
        setSuccess,
        editMedico
    }
}
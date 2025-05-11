import api_patient, { createPatientApi, getPatientApi, getPatientTurnoApi, listPatientApi } from "../services/patient";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


export const usePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataPatient, setDataPatient] = useState(null);
    const [agenda, setAgenda] = useState(null);
    const [success, setSuccess] = useState(null);
    const [pacientes, setPacientes] = useState(null);


    const getAppointment = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            api_patient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await getPatientTurnoApi(id);
            return response.data;

        } catch (error) {
            console.error("Error al obtener turnos del paciente", error);
            setError(error.response.data.message || "Error al obtener turnos del paciente");
            return false;

        } finally {
            setLoading(false);
        }
    };

    const getPatient = async () =>{
        setLoading(true);
        setError(null);

        try {
            
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const id = decoded.id;

            api_patient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await getPatientApi(id);
            return response.data;

        } catch (error) {
            console.error("Error al obtener paciente", error);
            setError(error.response.data.message || "Error al obtener paciente");
            return false;

        } finally {
            setLoading(false);
        }
    } 
    
    const createPatient = async (data) =>{
        setLoading(true);
        setError(null);
        setSuccess(null)
        try {
            const token = localStorage.getItem("token");
            api_patient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await createPatientApi(data);

            setSuccess("Datos creados correctamente");
            return response.data;


        } catch (err) {
            console.error("Error durante el registro de datos del paciente. ", err);
            const errorMessage = `${ err.response?.data?.message}, ${err.response?.data?.error}` || "Error al registrar datos del paciente";
            setError(errorMessage);
            
        }finally {
            setLoading(false);
        }
    }

    const ListPatient = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            api_patient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await listPatientApi();
            return response.data;

        } catch (error) {
            console.error("Error al obtener listado de pacientes", error);
            setError(error.response.data.message || "Error al obtener listado de pacientes");
            return false;

        }finally{
            setLoading(false);
        }
    }

    return {
        getAppointment,
        getPatient,
        loading,
        error,
        dataPatient,
        setDataPatient,
        agenda,
        setAgenda,
        createPatient,
        success,
        ListPatient,
        pacientes,
        setPacientes
    };
}
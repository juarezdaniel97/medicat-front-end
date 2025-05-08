import { set } from "react-hook-form";
import api_patient, { getPatientApi, getPatientTurnoApi } from "../services/patient";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


export const usePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataPatient, setDataPatient] = useState(null);
    const [agenda, setAgenda] = useState(null);


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

    return {
        getAppointment,
        getPatient,
        loading,
        error,
        dataPatient,
        setDataPatient,
        agenda,
        setAgenda
    };
}
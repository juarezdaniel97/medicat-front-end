import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { useParams } from "react-router-dom"
import FormAppointments from "../components/forms/FormAppointments";
import { useEffect, useState } from "react";
import { usePatientContext } from "../contexts/PatientContext";
import api_appointments, { getAppointmentsApi } from "../services/appointments";
import { useAuthContext } from "../contexts/AuthContext";

const Turno = () => {
    const { id: medicoId, appointmentId  } = useParams();
    const { getPatient } = usePatientContext();
    const { user } = useAuthContext();

    const [idPatient, setIdPatient] = useState(null);

    
    const isMedico = user?.role.name === 'medico';

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if(!token){
            window.location.href = "/login";
            return;
        }

        api_appointments.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const fetchDataPatient = async () => {
            if (!isMedico) {
                const patient = await getPatient();
                setIdPatient(patient?.profileUser?._id);
            }
        }
        fetchDataPatient();

    }, [getPatient, isMedico])
    


    return (
        <div>
            <Header/>
            <main className="flex flex-col justify-center items-center h-screen bg-gray-200 dark:bg-gray-800">

                <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">MediCat</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Turno Medico</p>
                    </div>
                    
                    <FormAppointments 
                        id_medico={medicoId} 
                        id_patient={idPatient} 
                        appointmentId={appointmentId} 
                        isMedico={isMedico}/>
                </div>
            </main>
            
            <Footer/>
        </div>
    )
}

export default Turno
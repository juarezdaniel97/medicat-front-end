import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { useParams } from "react-router-dom"
import FormAppointments from "../components/forms/FormAppointments";
import { useEffect, useState } from "react";
import { usePatientContext } from "../contexts/PatientContext";
import api_appointments from "../services/appointments";

const Turno = () => {
    const { id } = useParams();
    const { getPatient } = usePatientContext();

    const [idPatient, setIdPatient] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/login";
            return;
        }
        api_appointments.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const fetchDataPatient = async () => {
            const patient = await getPatient()
            setIdPatient(patient?.profileUser?._id);
        }
        
        fetchDataPatient();
    }, [])
    

    return (
        <div>
            <Header/>
            <main className="flex flex-col justify-center items-center h-screen bg-gray-200 dark:bg-gray-800">

                <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">MediCat</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Turno Medico</p>
                    </div>
                    
                    <FormAppointments id_medico={id} id_patient={idPatient}/>
                </div>
            </main>
            
            <Footer/>
        </div>
    )
}

export default Turno
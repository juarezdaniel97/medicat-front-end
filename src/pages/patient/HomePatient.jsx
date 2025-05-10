import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext';
import { usePatientContext } from '../../contexts/PatientContext';
import { useMedicoContext } from '../../contexts/MedicoContext';




const HomePatient = () => {
    
    const { logout } = useAuthContext();
    
    const { getAppointment, getPatient, setAgenda, setDataPatient } = usePatientContext();
    const { ListMedicos, setMedicos } = useMedicoContext();
    
    const [activeTab, setActiveTab] = useState("agenda");
    
    const navigate = useNavigate();
    
    const handleLogout = () =>{
        logout();
        navigate("/");
    }

    useEffect(() => {
        
        //Hacer Petición a la API para obtener Agenda - Historial - Medicos - Perfil
        const fetchDataPatient = async () => {
            
            // Obtener el paciente
            const patient = await getPatient();
            setDataPatient(patient.profileUser);

            //Obtener listado de medicos
            const listMedicos = await ListMedicos();
            setMedicos(listMedicos);

            // Obtener la agenda del paciente
            const appointment = await getAppointment(patient.profileUser._id); 
            setAgenda(appointment);
        };

        fetchDataPatient();

    }, [])
    
    
    return (
        <>
            {/* Header */}
            <div className='flex justify-between items-center bg-gray-200 p-4'>
                    <h1 className='text-2xl font-bold'>Bienvenido - Home Patient</h1>
                    <button
                        onClick={() => handleLogout()}
                        type='button' 
                        className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                            Cerrar Sesión
                    </button>
            </div>
            
            {/* Navigation */}
            <div>
                <nav>
                    <button
                        className={`p-2 m-2 ${activeTab === "agenda" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => {
                            setActiveTab("agenda");
                            navigate("/patient/agenda");
                        }}
                        >
                        Agendas
                    </button>

                    <button
                        className={`p-2 m-2 ${activeTab === "medicos" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => {
                            setActiveTab("medicos");
                            navigate("/patient/medicos");
                        }}
                        >
                        Medicos
                    </button>
                    
                    <button
                        className={`p-2 m-2 ${activeTab === "historial" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => {
                            setActiveTab("historial");
                            navigate("/patient/historial");
                        }}
                        >
                        Historial
                    </button>

                    <button
                        className={`p-2 m-2 ${activeTab === "perfil" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => {
                            setActiveTab("perfil");
                            navigate("/patient/perfil");
                        }}
                        >
                        Perfil
                    </button>
                </nav>
            </div>

            <Outlet/>
        </>
    )
}

export default HomePatient
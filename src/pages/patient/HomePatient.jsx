import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext';
import { usePatientContext } from '../../contexts/PatientContext';
import { useMedicoContext } from '../../contexts/MedicoContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Calendar, FileText, Heart, User, UserCircle2Icon } from 'lucide-react';




const HomePatient = () => {
    
    const { logout, user } = useAuthContext();
    
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
            <Header showLogout={true} onLogout={handleLogout} userEmail={user?.email} />
            
            
            {/* Navigation */}
            <div className='min-h-screen bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'>
                <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <div className='mb-6 border-b border-gray-200 dark:border-gray-700'>
                        
                        <nav className='flex space-x-8 rounded-lg py-3 px-3 max-w-7xl bg-white dark:bg-gray-700'>

                            {/* Button Agenda */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'agenda' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("agenda");
                                    navigate("/patient/agenda");
                                }}
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Agendas
                            </button>

                            {/* Button Medico */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'medicos'  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("medicos");
                                    navigate("/patient/medicos");
                                }}
                                >
                                <User className="mr-2 h-5 w-5" />
                                Medicos
                            </button>

                            {/* Favoritos */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'favoritos' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("favoritos");
                                    navigate("/patient/favorito"); 
                                }}
                                >
                                <Heart className='mr-2 h-5 w-5'/>
                                Favoritos
                            </button>

                            {/* Perfil */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab == 'perfil' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400': 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("perfil");
                                    navigate("/patient/perfil");
                                }}
                                >
                                <UserCircle2Icon className='mr-2 h-5 w-5'/>
                                Perfil
                            </button>
                        </nav>
                    </div>
                </main>
                
                <Outlet/>
            </div>

            

            <Footer/>
        </>
    )
}

export default HomePatient
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMedicoContext } from '../../contexts/MedicoContext';
import { usePatientContext } from '../../contexts/PatientContext';
import Header from '../../components/layout/Header';
import { Calendar, FileText, User, UserCircle2Icon } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const HomeMedico = () => {
    
    const { logout, user } = useAuthContext();
    const { getMedico, setDataMedico, getTurnosAsociados, setAgenda} = useMedicoContext();
    const { ListPatient, setPacientes  } = usePatientContext();

    const [activeTab, setActiveTab] = useState("agenda");
    
    const navigate = useNavigate();

    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const fetchDataMedico = async () => {
            
            //Obtener el médico
            const medico = await getMedico();
            setDataMedico(medico.profileUser);
            
            //Obtener Agenda de turnos del médico
            const appointments = await getTurnosAsociados(medico.profileUser._id);
            setAgenda(appointments);

            //Obtener listado de Pacientes
            const listPacientes = await ListPatient();
            setPacientes(listPacientes);
        };

        fetchDataMedico();

    }, [])
    

return (
    <>
        {/* Header */}
        <Header showLogout={true} onLogout={handleLogout} userEmail={user?.email}/>
        
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
                                    navigate("/medico/agenda");
                                }}
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Mi Agenda
                            </button>

                            {/* Button Medico */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'pacientes'  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("pacientes");
                                    navigate("/medico/pacientes");
                                }}
                                >
                                {/* <User className="mr-2 h-5 w-5" /> */}
                                <FileText className="mr-2 h-5 w-5" />
                                Mis Pacientes
                            </button>
                            
                            {/* Perfil */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab == 'perfil' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400': 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("perfil");
                                    navigate("/medico/perfil");
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

        {/* Footer */}
        <Footer/>
    </>
    )
}

export default HomeMedico
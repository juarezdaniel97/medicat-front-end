import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMedicoContext } from '../../contexts/MedicoContext';
import { usePatientContext } from '../../contexts/PatientContext';

const HomeMedico = () => {
    
    const { logout } = useAuthContext();
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
    <div>
        <div className='flex justify-between items-center bg-gray-200 p-4'>
            <h1 className='text-2xl font-bold'>Bienvenido - Home Medico</h1>
            <button
            onClick={() => handleLogout()}
            type='button' 
            className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                Cerrar Sesión
            </button>
        </div>

        <div className='bg-white shadow-md rounded p-4 m-4'>
            {/* Navigation */}
                <div>
                    <nav>
                        <button
                            className={`p-2 m-2 ${activeTab === "agenda" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            onClick={() => {
                                setActiveTab("agenda");
                                navigate("/medico/agenda");
                            }}
                            >
                            Agendas
                        </button>

                        <button
                            className={`p-2 m-2 ${activeTab === "pacientes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            onClick={() => {
                                setActiveTab("pacientes");
                                navigate("/medico/pacientes");
                            }}
                            >
                            Pacientes
                        </button>

                        <button
                            className={`p-2 m-2 ${activeTab === "perfil" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            onClick={() => {
                                setActiveTab("perfil");
                                navigate("/medico/perfil");
                            }}
                            >
                            Perfil
                        </button>
                    </nav>
                </div>

                <Outlet/>
        </div> 
    </div>
    )
}

export default HomeMedico
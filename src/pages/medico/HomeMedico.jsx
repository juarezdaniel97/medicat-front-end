import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

const HomeMedico = () => {
    const { user, logout } = useAuthContext();
    
    const [activeTab, setActiveTab] = useState("agenda");
    
    const navigate = useNavigate();

    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                            Medicos
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
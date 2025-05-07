import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return (
        <div>
            <div className='flex justify-between items-center bg-gray-200 p-4'>
                    <h1 className='text-2xl font-bold'>Bienvenido - Home Admin</h1>
                    <button
                        onClick={() => handleLogout()}
                        type='button' 
                        className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                            Cerrar Sesión
                    </button>
            </div>
            <div className='bg-white shadow-md rounded p-4 m-4'>
                    <h2 className='text-xl font-bold'>Funciones de Administrador</h2>
                    
                    <ul>
                        <li>Gestión de usuarios</li>
                        <li>Configuración del sistema</li>
                        <li>Reportes avanzados</li>
                        <li>Administración de permisos</li>
                    </ul>
                </div>            
        </div>
    )
}

export default HomeAdmin
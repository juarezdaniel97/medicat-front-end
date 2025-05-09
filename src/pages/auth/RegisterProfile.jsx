import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterProfile = () => {

    const {logout} = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate("/");
    }

    return (
        <>
        
        <div className='flex justify-between items-center bg-gray-200 p-4'>
            <h1 className='text-2xl font-bold'>Register - Profile</h1>
            <button
                onClick={() => handleLogout()}
                type='button' 
                className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                    Cerrar Sesión
                </button>
        </div>
        </>
    )
}

export default RegisterProfile
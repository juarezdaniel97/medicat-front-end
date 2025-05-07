import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext';

const Perfil = () => {
    const { userData } = useAuthContext();
    return (
        <div className='bg-white shadow-md rounded p-4 m-4'>
            <h2 className='text-xl font-bold'>Datos del Paciente</h2>
                    
            <div className='flex flex-col p-4'>
                <p><strong>Nombre:</strong> {userData?.profileUser?.firstName}</p>
                <p><strong>Email:</strong> {userData?.profileUser?.userId?.email}</p>
                <p><strong>Teléfono:</strong> {userData?.profileUser?.phoneNumber}</p>
                <p><strong>Dirección:</strong> Cuidad : {userData?.profileUser?.address?.city}, Calle: {userData?.profileUser?.address?.street}</p>
            </div>
        </div>
    )
}

export default Perfil
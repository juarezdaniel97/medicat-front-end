import React, { use } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext';

const HomePatient = () => {

    const {userData,logout} = useAuthContext();
    const navigate = useNavigate();

    console.log("userData -->", userData);
    
    const handleLogout = () =>{
        logout();
        navigate("/");
    }

    // if (userData === null) {
    //     return (
    //             <div>
    //                 <div className='flex justify-between items-center bg-gray-200 p-4'>
    //                     <h1 className='text-2xl font-bold'>Bienvenido - Home Patient</h1>
    //                     <button
    //                         onClick={() => handleLogout()}
    //                         type='button' 
    //                         className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
    //                             Cerrar Sesión
    //                     </button>
    //                 </div>
    //                 <div className='flex items-center justify-center h-screen'>
    //                     <h1 className='text-2xl font-bold '>No day datos personales del paciente...</h1>
    //                 </div>
    //             </div>
    //     )
        
    // }

    return (
        <>
            <div>
                <div className='flex justify-between items-center bg-gray-200 p-4'>
                    <h1 className='text-2xl font-bold'>Bienvenido - Home Patient</h1>
                    <button
                        onClick={() => handleLogout()}
                        type='button' 
                        className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                            Cerrar Sesión
                    </button>
                </div>
                <div className='bg-white shadow-md rounded p-4 m-4'>
                    <h2 className='text-xl font-bold'>Datos del Paciente</h2>
                    
                    <div className='flex flex-col p-4'>
                        <p><strong>Nombre:</strong> {userData?.profileUser?.firstName}</p>
                        <p><strong>Email:</strong> {userData?.profileUser?.userId?.email}</p>
                        <p><strong>Teléfono:</strong> {userData?.profileUser?.phoneNumber}</p>
                        <p><strong>Dirección:</strong> Cuidad : {userData?.profileUser?.address?.city}, Calle: {userData?.profileUser?.address?.street}</p>
                    </div>
                </div>
            </div>
            {/* <h1>Welcome to patient Dashboard</h1> */}
            <Outlet/>
        </>
    )
}

export default HomePatient
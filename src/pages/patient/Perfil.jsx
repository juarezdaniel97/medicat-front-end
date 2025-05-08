import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { usePatientContext } from '../../contexts/PatientContext';

const Perfil = () => {

    const { dataPatient } = usePatientContext();

    console.log('dataPatient -->', dataPatient);
    

    return (
        <div className='bg-white shadow-md rounded p-4 m-4'>
            <h2 className='text-xl font-bold'>Datos del Paciente</h2>
                    
            <div className='flex flex-col p-4'>
                <p className='font-bold'> <strong>Nombre: </strong> {dataPatient?.firstName} </p>
                {/* <p><strong>Nombre:</strong> {userData?.profileUser?.firstName}</p> */}
                <p className='font-bold'> <strong>Apellido: </strong> {dataPatient?.lastName} </p>

                {/* <p><strong>Email:</strong> {userData?.profileUser?.userId?.email}</p> */}
                <p className='font-bold'><strong>Email:</strong> {dataPatient?.userId?.email}</p>

                {/* <p><strong>Teléfono:</strong> {userData?.profileUser?.phoneNumber}</p> */}
                <p className='font-bold'><strong>Teléfono:</strong> {dataPatient?.phoneNumber}</p>

                <p className='font-bold'><strong>Dirección:</strong> Cuidad : {dataPatient?.address?.city}, Calle: {dataPatient?.address?.street}</p>
            </div>
        </div>
    )
}

export default Perfil
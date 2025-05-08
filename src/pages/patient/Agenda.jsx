import React, { use, useEffect, useState } from 'react'
import { usePatientContext } from '../../contexts/PatientContext';

const Agenda = () => {
    const { getAppointment, getPatient, loading, error, agenda } = usePatientContext();

    
    return (
        <div>
            <h1>Agenda</h1>
            <p>Esta es la página de agenda de turnos.</p>
            <p>Aquí podrás ver tus turnos programados y gestionar tu agenda.</p>
            {loading && <p>Cargando...</p>}

            <div className='flex justify-between items-center bg-gray-200 p-4'>
                <ul>
                    {agenda && agenda.length > 0 ? (
                        agenda.map((turno, index) => (
                            <li key={index} className='p-2 m-2 bg-gray-100 rounded'>
                                <p>Fecha: {turno.fecha}</p>
                                <p>Medico: {turno.medico}</p>
                                <p>Especialidad: {turno.especialidad}</p>
                                <p>Monto: ${turno.precio}</p>
                            </li>
                        ))
                    ) : (
                        <li>No tienes turnos programados.</li>
                    )}
                </ul>
                
            </div>
            {error && <p>Error: {error}</p>}

        </div>
    )
}

export default Agenda
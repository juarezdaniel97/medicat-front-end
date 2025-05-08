import React, { use, useEffect, useState } from 'react'
import { usePatientContext } from '../../contexts/PatientContext';
import { set } from 'react-hook-form';

const Agenda = () => {
    const { getAppointment, getPatient, loading, error } = usePatientContext();
    const [turnos, setTurnos] = useState(null);

    useEffect(() => {
        const fetchAppointment = async () => {
           // const appointment = await getAppointment("681b5e2178677ff6216ec92b"); // Cambia el ID según sea necesario
            const patient = await getPatient();
    
            const appointment = await getAppointment(patient.profileUser._id); // Cambia el ID según sea necesario
            setTurnos(appointment);
        };
        fetchAppointment();
    }, []);


    return (
        <div>
            <h1>Agenda</h1>
            <p>Esta es la página de agenda de turnos.</p>
            <p>Aquí podrás ver tus turnos programados y gestionar tu agenda.</p>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            { turnos && turnos.length > 0 ? (
                <ul>
                    {turnos.map((turno) => (
                        <li key={turno._id}>
                            <p>Fecha: {new Date(turno.fecha).toLocaleDateString()}</p>
                            <p>Hora: {new Date(turno.fecha).toLocaleTimeString()}</p>
                            <p>Estado: {turno.estado}</p>
                            <p>Doctor: {turno.medico}</p>
                            <p>Precio: {turno.precio}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes turnos programados.</p>
            )}
        </div>
    )
}

export default Agenda

import { useMedicoContext } from '../../contexts/MedicoContext'

const ListMedicos = () => {
    const { medicos, loading } = useMedicoContext();
    
    const dias =  ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    
    return (
        <div>
            <h1>Listado de Médicos</h1>
            {medicos && medicos.map((medico) => (
                <div key={medico._id}>
                    <h2>{medico.firstName} {medico.lastName}</h2>
                    <p>Especialidad: {medico?.specialty}</p>
                    <p>Email: {medico?.userId.email}</p>
                    <p>Precio: {medico.consultationFee}</p>
                    <p>Disponibilidad:</p>
                    <ul>
                        {medico?.availability.map((dia) => (
                            <li key={dia._id}>
                                {dias[dia.dayOfWeek]}: {dia.startTime} - {dia.endTime}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Añadir el loading y un <p> cuando no hay medicos disponibles */}
        </div>
    )
}

export default ListMedicos
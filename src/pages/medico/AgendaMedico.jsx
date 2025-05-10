import { useMedicoContext } from "../../contexts/MedicoContext"


const AgendaMedico = () => {
    const {loading, error, agenda} = useMedicoContext();

    return (
        <div>
            <h1>AgendaMedico</h1>
            <p>Esta es la página de agenda de turnos asociado al médico.</p>

            <div className='flex justify-between items-center bg-gray-200 p-4'>
                {loading ? (
                    <p>Cargondo...</p>
                ) : (
                    <ul>
                        {
                        agenda && agenda.length > 0 ? (
                            agenda.map((turno, index) => (
                                <li key={index} className='p-2 m-2 bg-gray-100 rounded'>
                                <p>Fecha: {turno.fecha}</p>
                                <p>Paciente: {turno.paciente.nombreCompleto}</p>
                                <p>estado: {turno.estado}</p>
                                <p>Motivo: {turno.motivo}</p>
                            </li>
                            ))) : (
                                <li>No tienes turnos programados.</li>
                            )
                        }
                    </ul>
                )
                }
            </div>
        </div>
    )
}

export default AgendaMedico
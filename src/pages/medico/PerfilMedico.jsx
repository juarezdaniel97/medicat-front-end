import { useMedicoContext } from "../../contexts/MedicoContext"

const PerfilMedico = () => {

    const { dataMedico } = useMedicoContext();
    
    return (
        <div className='bg-white shadow-md rounded p-4 m-4'>
            <h2 className='text-xl font-bold'>Datos del Paciente</h2>
                    
            <div className='flex flex-col p-4'>
                <p className='font-bold'> <strong>Nombre: </strong> {dataMedico?.firstName} </p>
                
                <p className='font-bold'> <strong>Apellido: </strong> {dataMedico?.lastName} </p>

                <p className='font-bold'><strong>Email:</strong> {dataMedico?.userId?.email}</p>

                <p className='font-bold'><strong>Especialidad:</strong> {dataMedico?.specialty}</p>

                <p className='font-bold'><strong>Liciencia:</strong> {dataMedico?.licenseNumber}</p>

                <p className='font-bold'><strong>Monto de consulta:</strong> {dataMedico?.consultationFee}</p>
            </div>
        </div>
    )
}

export default PerfilMedico
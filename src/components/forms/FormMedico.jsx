import { useForm } from "react-hook-form"
import { useMedicoContext } from "../../contexts/MedicoContext"
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";


const FormMedico = () => {

    const {createMedico, loading, error, success: messageSuccess } = useMedicoContext()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const navigate = useNavigate();

    //UseEffect

    const onSubmit = async (data) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            specialty: data.specialty,
            licenseNumber: data.licenseNumber,
            availability:[
                {
                    dayOfWeek: 1,
                    startTime: "08:00",
                    endTime: "12:00"
                },
                {
                    dayOfWeek: 3,
                    startTime: "14:00",
                    endTime: "18:00"
                }
            ],
            profileType: "medico"
        }

        const response = await createMedico(userData)
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            {
                error && 
                (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )
            }
            <label>Nombre:</label>
            <input type="text" className="border p-2 mb-4" />
            <label>Especialidad:</label>
            <input type="text" className="border p-2 mb-4" />
            <label>Precio de consulta:</label>
            <input type="number" className="border p-2 mb-4" />
            {/* Otros campos específicos para médico */}

            <button
                type='submit'
                disabled={loading}
            >
                {loading ? (
                    <span>
                        <Loader2 className='animate-spin mr-2'/>
                        Registrando...
                    </span>
                ): ("Crear Perfil")}
            </button>
        </form>
    )
}

export default FormMedico
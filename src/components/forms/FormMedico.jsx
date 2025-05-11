import { useFieldArray, useForm } from "react-hook-form"
import { useMedicoContext } from "../../contexts/MedicoContext"
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";


const FormMedico = () => {

    const {createMedico, loading, error, success: messageSuccess } = useMedicoContext()
    const { register, handleSubmit, control, formState: {errors} } = useForm();

    const navigate = useNavigate();
    
    const {fields, append, remove} = useFieldArray({
        control,
        name: "availability"
    });

    useEffect(() => {
        if (messageSuccess) {
            toast.success(messageSuccess)
        }
    }, [messageSuccess])
    

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
        
        if (response) {
            navigate('/medico')
        }
    }

    const daysOfWeek = [
            { value: 1, label: "Lunes" },
            { value: 2, label: "Martes" },
            { value: 3, label: "Miércoles" },
            { value: 4, label: "Jueves" },
            { value: 5, label: "Viernes" },
            { value: 6, label: "Sábado" },
            { value: 7, label: "Domingo" },
    ]

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Registro de Médico</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {error}
                </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            {...register("firstName", { required: "El nombre es obligatorio" })}
                            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.firstName && ( <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>)}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido:
                        </label>
                        <input
                            type="text"
                            {...register("lastName", { required: "El apellido es obligatorio" })}
                            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.lastName && (<p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>)}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Especialidad:
                    </label>
                    <input
                        type="text"
                        {...register("specialty", { required: "La especialidad es obligatoria" })}
                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.specialty && (<p className="text-red-500 text-xs mt-1">{errors.specialty.message}</p>)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Número de Matricula:
                        </label>
                        <input
                            type="text"
                            {...register("licenseNumber", { required: "El número de matricula es obligatorio" })}
                            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.licenseNumber && (<p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>)}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Precio de consulta:
                        </label>
                        <input
                            type="number"
                            {...register("consultationFee", { 
                                required: "El precio es obligatorio",
                                min: { value: 1, message: "El precio debe ser mayor a 0" } })}
                            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.consultationFee && (<p className="text-red-500 text-xs mt-1">{errors.consultationFee.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Disponibilidad</h3>
                        <button
                            type="button"
                            onClick={() => append({ dayOfWeek: 1, startTime: "08:00", endTime: "12:00" })}
                            className="flex items-center text-blue-600 text-sm"
                        >
                            <Plus size={16} className="mr-1" /> Agregar horario
                        </button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="bg-gray-50 p-4 rounded-md space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="text-md font-medium">Horario {index + 1}</h4>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 flex items-center text-sm"
                                    >
                                        <Trash2 size={16} className="mr-1" /> Eliminar
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Día:
                                    </label>
                                    <select
                                        {...register(`availability.${index}.dayOfWeek`, { required: true })}
                                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {daysOfWeek.map((day) => (
                                            <option key={day.value} value={day.value}>
                                                {day.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hora inicio:
                                    </label>
                                    <input
                                        type="time"
                                        {...register(`availability.${index}.startTime`, { required: true })}
                                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hora fin:
                                    </label>
                                    <input
                                        type="time"
                                        {...register(`availability.${index}.endTime`, { required: true })}
                                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <input type="hidden" {...register("profileType")} value="medico" />

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex justify-center items-center"
                    >
                        {loading ? (
                        <span className="flex items-center">
                            <Loader2 size={20} className="animate-spin mr-2" />
                            Registrando...
                        </span>
                        ) : (
                        "Crear Perfil Médico"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormMedico
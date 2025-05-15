import { useFieldArray, useForm } from "react-hook-form"
import { useMedicoContext } from "../../contexts/MedicoContext"
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const FormMedico = ({initialValues, isEditing=false}) => {

    const {createMedico, editMedico, setDataMedico, loading, error, setError ,success: messageSuccess } = useMedicoContext()
    const { register, handleSubmit, control, formState: {errors}, reset } = useForm();
    
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
    
    useEffect(() => {
        if (isEditing && initialValues && Object.keys(initialValues).length > 0) {
            console.log('initalValues ->', initialValues);
            
            reset({
                firstName: initialValues?.profileUser?.firstName || '',
                lastName: initialValues?.profileUser?.lastName || '',
                specialty: initialValues?.profileUser?.specialty || '',
                licenseNumber: initialValues?.profileUser?.licenseNumber || '',
                consultationFee: initialValues?.profileUser?.consultationFee || '',
                availability: initialValues?.profileUser?.availability?.length > 0 
                ? initialValues.profileUser.availability : [] ,
                profileType: initialValues?.profileUser?.profileType || 'medico'
            })
        }
    }, [initialValues, isEditing, reset])
    
    const onSubmit = async (data) => {
        
        setError(null);
        
        if (!data.availability || data.availability.length === 0) {
            setError("availability", { type: "manual", message: "Debe agregar al menos un horario de disponibilidad." });
        }

        let response;

        if (isEditing) {
            
            response = await editMedico(data);
            if (response) {
                setDataMedico(response)
            }
            navigate('/medico/perfil');
        }else{

            response = await createMedico(data)
            //navigate('/medico')
            navigate('/')
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {
                error && 
                (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre:
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                        {...register("firstName", { required: "El nombre es obligatorio" })}
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-red-500 text-xs">{errors.firstName.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label 
                        htmlFor="lastName"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Apellido
                    </label>
                    <input 
                        id="lastName" 
                        type="text"
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white'
                        {...register("lastName", { required: "El apellido es obligatorio" })}
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-red-500 text-xs">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label
                        htmlFor="specialty"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                        Especialidad:
                    </label>
                    <input
                        id="specialty"
                        type="text"
                        placeholder="Ej. Cardiología"
                        className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                        {...register("specialty", { required: "La especialidad es obligatoria" })}
                    />
                    {errors.specialty && (<p className="text-red-500 text-xs mt-1">{errors.specialty.message}</p>)}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="licenseNumber" 
                        className="block text-sm font-medium text-gray-700">
                        Número de Matricula:
                    </label>
                    <input
                        id="licenseNumber"
                        type="text"
                        placeholder="Ej. 123456-AB"
                        className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                        {...register("licenseNumber", { required: "El número de matricula es obligatorio" })}
                    />
                    {errors.licenseNumber && (<p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>)}
                </div>

                <div className="space-y-2">
                    <label 
                        htmlFor="number"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Precio de consulta:
                    </label>
                    <input
                        id="number"
                        type="number"
                        className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                        {...register("consultationFee", { required: "El precio es obligatorio", min: { value: 1, message: "El precio debe ser mayor a 0" } })}
                    />
                    {errors.consultationFee && (<p className="text-red-500 text-xs mt-1">{errors.consultationFee.message}</p> )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className=" text-gray-800 text-lg font-medium dark:text-gray-200">Disponibilidad</h3>
                    <button
                        type="button"
                        onClick={() => append({ dayOfWeek: 1, startTime: "08:00", endTime: "12:00" })}
                        className="flex items-center text-emerald-700 dark:text-emerald-300 text-sm cursor-pointer"
                    >
                        <Plus size={16} className="mr-1" /> Agregar horario
                    </button>
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 rounded-md space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-md font-medium dark:text-gray-200">Horario {index + 1}</h4>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" text-red-600 dark:text-red-500 flex items-center text-sm cursor-pointer"
                                >
                                    <Trash2 size={16} className="mr-1" /> Eliminar
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Día:
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                                    {...register(`availability.${index}.dayOfWeek`, { required: true })}
                                >
                                    {daysOfWeek.map((day) => (
                                        <option key={day.value} value={day.value}>
                                            {day.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Hora inicio:
                                </label>
                                    <input
                                        type="time"
                                        className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                                        {...register(`availability.${index}.startTime`, { required: true })}
                                    />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Hora fin:
                                </label>
                                    <input
                                        type="time"
                                        className="w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white"
                                        {...register(`availability.${index}.endTime`, { required: true })}
                                    />
                            </div>
                        </div>
                    </div>
                ))}

                {errors.availability && (<p className="text-red-500 text-xs mt-1">{errors.availability.message}</p>)}
            </div>

            <input type="hidden" {...register("profileType")} value="medico" />

            <div className='flex items-center justify-center space-x-4'>

                <button 
                    onClick={() =>{ navigate(-1) } }
                    className="mb-4 mt-4 bg-neutral-600 hover:bg-neutral-700 text-white  dark:bg-neutral-600 dark:hover:bg-neutral-700 py-2 px-6 cursor-pointer rounded-md">
                        Volver
                </button>
                
                <button
                    type='submit'
                    disabled={loading}
                    className='bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 cursor-pointer'
                >
                    {
                        loading ? 
                        (
                            <span className='flex items-center justify-center'>
                                <Loader2 className='animate-spin mr-2'/>
                                {isEditing ? 'Actualizando...' : 'Registrando...'}
                            </span>
                        ): (isEditing ? 'Actualizar Perfil': 'Crear Perfil')
                    }
                </button>
            </div>
        </form>
    )
}

export default FormMedico
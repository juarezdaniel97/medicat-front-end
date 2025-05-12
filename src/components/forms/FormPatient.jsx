import { useForm } from 'react-hook-form'
import { usePatientContext } from '../../contexts/PatientContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const FormPatient = () => {

    const { createPatient, loading, error, success: messageSuccess } = usePatientContext();
    const {register, handleSubmit, formState: {errors} } = useForm();

    const navigate = useNavigate();


    useEffect(() => {
        if(messageSuccess){
            toast.success(messageSuccess)
        }
    }, [messageSuccess])
    

    const onSubmit = async (data) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            address: {
                street: data.street,
                city: data.city,
                zipCode: data.zipCode
            },
            profileType: data.profileType
        };

        const response = await createPatient(userData);

        if (response){
            navigate('/patient');
        }
        //navigate("/patient")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {
                error && 
                (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )
            }

            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <label 
                        htmlFor="firstName"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Nombre
                    </label>
                    <input 
                        id="firstName" 
                        type="text" 
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white'
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

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                    <label 
                        htmlFor="phoneNumber"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Teléfono
                    </label>
                    <input 
                        id="phoneNumber"
                        type="text"
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white' 
                        {...register("phoneNumber", { required: "El número de telefono es obligatorio" })} 
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-red-500 text-xs">{errors.phoneNumber.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label 
                        htmlFor="dateOfBirth"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Fecha de Nacimiento
                    </label>
                    <input 
                        id="dateOfBirth" 
                        type="date"
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white'
                        {...register("dateOfBirth", { required: "La fecha de naciemiento es obligatoria" })} 
                    />
                    {errors.dateOfBirth && (
                        <p className="mt-1 text-red-500 text-xs">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                <div  className='space-y-2'>
                    <label 
                        htmlFor="gender"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Género
                    </label>
                    <select
                        id="gender" 
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white' 
                        {...register("gender", { required: "Debe seleccionar un género" })}>
                        <option value="">seleccione un género</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="X">Otro</option>
                    </select>
                    {errors.gender && (
                        <p className="mt-1 text-red-500 text-xs">{errors.gender.message}</p>
                    )}
                </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                
                <div  className='space-y-2'>
                    <label 
                        htmlFor="street"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Calle y número
                    </label>
                    <input 
                        id='street'
                        type="text"
                        placeholder='Calle principal 223' 
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white'  
                        {...register("street", { required: "La calle y número es obligatorio" })} 
                    />
                    {errors.street && (
                        <p className="mt-1 text-red-500 text-xs">{errors.street.message}</p>
                    )}
                </div>

                <div  className='space-y-2'>
                    <label 
                        htmlFor="city" 
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Ciudad
                    </label>
                    <input 
                        id='city'
                        type="text" 
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white' 
                        {...register("city", {required:"La ciudad es obligatorio"})}
                    />
                    {errors.city && (
                        <p className="mt-1 text-red-500 text-xs">{errors.city.message}</p>
                    )}
                </div>

                <div  className='space-y-2'>
                    <label 
                        htmlFor="zipCode"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                        Código Postal
                    </label>
                    <input 
                        id='zipCode'
                        type="text" 
                        className='w-full border rounded-md px-3 py-2  bg-white text-gray-900 dark:bg-gray-600 dark:text-white' 
                        {...register("zipCode")}/>
                </div>
            </div>
            
            <input type="hidden" {...register("profileType")} value="patient" />

            <div className='flex items-center justify-center space-x-4'>

                    <button 
                        type='submit'
                        disabled={loading}
                        className='bg-amber-300 text-black py-2 px-6 rounded-md hover:bg-amber-400 cursor-pointer'
                    >
                        Editar
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
                                    Registrando...
                                </span>
                            ): ("Crear Perfil")
                        }
                    </button>
            </div>
        </form>
    )
}

export default FormPatient
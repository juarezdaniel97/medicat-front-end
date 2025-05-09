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
            profileType: "patient"
        };

        const response = await createPatient(userData);

        if (response){
            navigate('/patient');
        }
        //navigate("/patient")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            {
                error && 
                (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )
            }
            <div>
                <label htmlFor="firstName">Nombre</label>
                <input type="text" id="firstName" {...register("firstName", { required: true })} />
                {errors.firstName && <span>Este campo es requerido</span>}
            </div>
            <div>
                <label htmlFor="lastName">Apellido</label>
                <input type="text" id="lastName" {...register("lastName", { required: true })} />
                {errors.lastName && <span>Este campo es requerido</span>}
            </div>
            <div>
                <label htmlFor="phoneNumber">Teléfono</label>
                <input type="text" id="phoneNumber" {...register("phoneNumber", { required: true })} />
                {errors.phoneNumber && <span>Este campo es requerido</span>}
            </div>
            <div>
                <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
                <input type="date" id="dateOfBirth" {...register("dateOfBirth", { required: true })} />
                {errors.dateOfBirth && <span>Este campo es requerido</span>}
            </div>

            <div>
                <label htmlFor="gender">Género</label>
                <select id="gender" {...register("gender", { required: true })}>
                    <option value="">seleccione un género</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="X">Otro</option>
                </select>
                {errors.gender && <span>Este campo es requerido</span>}
            </div> 

            <div>
                <h1>Dirección</h1>
                <div>
                    <label htmlFor="street">Calle y número</label>
                    <input type="text"id='street'placeholder='Calle principal 223' {...register("street", { required: true })} />
                    {errors.street && <span>Este campo es requerido</span>}
                </div>

                <div>
                    <label htmlFor="city">Ciudad</label>
                    <input type="text" id='city' {...register("city", {required:true})} />
                    {errors.city && <span>Este campo es requerido</span>}
                </div>

                <div>
                    <label htmlFor="zipCode">Código Postal</label>
                    <input type="text" id='zipCode' {...register("zipCode")}/>
                </div>
            </div>

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

export default FormPatient
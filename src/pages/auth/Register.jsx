import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
    const { addUser, error, success: messageSuccess } = useAuthContext();
    const {register, handleSubmit, formState: { errors }, watch } = useForm();

    const navigate = useNavigate();


    useEffect(() => {
        if (messageSuccess) {
            toast.success(messageSuccess);
        }
    }, [messageSuccess])
    

    const onSubmit = async (data) => {
        
        const response = await addUser(data);
            
            if (response) {
                navigate("/selector-profile");
            }
        //navigate("/selector-profile", { replace: true });
    }    

    return (
        <div>
            <h1>Registro Usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    error && 
                    (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )
                }
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" {...register("email", { required: true })} />
                    {errors.email && <span>Este campo es requerido</span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña: </label>
                    <input type="password" id="password" {...register("password", { required: true })} />
                    {errors.password && <span>Este campo es requerido</span>}
                </div>
                <button className='bg-blue-400 py-6 px-2 cursor-pointer' type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default Register
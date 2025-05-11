import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";


const FormRegisterUser = () => {

    const { addUser, loading, error, success: messageSuccess } = useAuthContext(); 
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
    const navigate = useNavigate();
    const password = watch('password');

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
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
                        {error}
                    </div>)
            }
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Correo electrónico
                </label>
                <input 
                    id="email"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900  dark:bg-gray-600 dark:text-white" 
                    placeholder="tu@ejemplo.com"
                    {...register("email", {required: "El correo electrónico es obligatorio"})}
                />
                {errors.email && (
                    <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Contraseña
                </label>
                <input
                    id="password" 
                    type="password" 
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900  dark:bg-gray-600 dark:text-white"
                    placeholder="*********"
                    {...register("password", {required: "La contraseña es obligatoria", minLength:{ value:3, message:"La contraseña debe tener al menos 3 caracteres"}})}
                />
                {errors.password && (
                    <p className="mt-1 text-red-500 text-xs">{errors.password.message}</p>
                )}
            </div>

            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Confirmar contraseña
                </label>
                <input 
                    id="confirmPassword" 
                    type="password"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900  dark:bg-gray-600 dark:text-white"
                    placeholder="*********"
                    {...register('confirmPassword', {required: "Por favor confirme la contraseña", validate: value => value === password || "Las contraseñas no coinciden"})}
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-red-500 text-xs">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <Loader2 className='animate-spin mr-2'/>
                        Registrando...
                    </span>
                    ) : (
                        'Crear cuenta'
                        )}
            </button>

        </form>
    )
}

export default FormRegisterUser
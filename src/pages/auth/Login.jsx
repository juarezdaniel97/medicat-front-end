import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, loading, error, success } = useAuthContext();
    const {register, handleSubmit, formState:{errors}} = useForm();

    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const { email, password } = data;
        const response = await login(email, password);
        
        if(response){
            navigate("/patient");
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-200 '>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'>
                <h1 className='font-medium mb-4 text-center'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {error && <span className='text-red-500 text-sm text-center mb-4'>{error}</span>}
                        {/* {success && <span className='text-green-500 text-sm'>{success}</span>} */}
                    </div>
                    <input 
                        type="text" 
                        className='border border-gray-300 rounded p-2 mb-4 w-full'
                        placeholder="Email"
                        {...register("email", {required: true})}
                        />
                    {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}

                    <input 
                        type="password" 
                        className='border border-gray-300 rounded p-2 mb-4 w-full'
                        placeholder="Password"
                        {...register("password", {required: true})}
                        />

                    {errors.password && <span className='text-red-500 text-sm'>Password is required</span>}

                    <button
                        type='submit'
                        className='bg-blue-500 text-white rounded p-2 w-full cursor-pointer hover:bg-blue-600 transition duration-200'
                    >
                        Iniciar Sesion
                    </button>
                </form>
                <p className='text-sm text-center mt-4'>
                    admin@gmail.com <br />
                    admin
                    <hr />
                    medico@gmail.com <br />
                    medico
                    <hr />
                    paciente@gmail.com <br />
                    paciente
                </p>
            </div>
        </div>
    )
}

export default Login
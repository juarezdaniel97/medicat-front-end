import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import apiTwilio, { sendSMS } from '../../services/twilio';
import toast from 'react-hot-toast';

const FormSMS = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        apiTwilio.defaults.headers.common["Authorization"] =  `Bearer ${token}`;

    }, [])
    

    const onSubmit = async (data) => {
        const resonse = await sendSMS(data);

        if (resonse) {
            //generar un toas que el mensaje se envio
            toast.success('MENSAJE ENVIADO...')
            navigate('/medico')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                {
                    error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
                            {error}
                        </div>)
                }

                <label htmlFor="to" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Número destino
                </label>
                <input 
                    id="to"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900  dark:bg-gray-600 dark:text-white" 
                    placeholder="+543834000000"
                    {...register("to", {required: "El número destino es obligatorio"})}
                />
                {errors.to && (
                    <p className="mt-1 text-red-500 text-xs">{errors.to.message}</p>
                )}
            </div>

            <div className="mb-6">
                <label htmlFor="body" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Mensaje
                </label>
                {/* <input
                    id="body" 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900  dark:bg-gray-600 dark:text-white"
                    placeholder="Ej. Medicat - Confirmación del turno con el Dr. Pérez"
                    {...register("body", {required: "Debe escribir un mensaje"})}
                /> */}
                <textarea  
                    id="body"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-900  dark:bg-gray-600 dark:text-white"
                    placeholder="Ej. Medicat - Confirmación del turno con el Dr. Pérez"
                    {...register("body", {required: "Debe escribir un mensaje"})}
                    >
                </textarea>
                {errors.body && (
                    <p className="mt-1 text-red-500 text-xs">{errors.body.message}</p>
                )}
            </div>
            
            <button 
                onClick={() =>{ navigate(-1) } }
                className="mb-4 w-full bg-neutral-600 hover:bg-neutral-700 text-white  dark:bg-neutral-600 dark:hover:bg-neutral-700 py-2 px-4 cursor-pointer rounded-md">
                Volver
            </button>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 cursor-pointer"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2" />
                        Enviando...
                    </span>
                    ) : (
                        'Enviar'
                    )}
            </button>
        </form>
    )
}

export default FormSMS
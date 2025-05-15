import React, { useEffect, useState } from 'react'
import { useMedicoContext } from '../../contexts/MedicoContext';
import { Loader2 } from 'lucide-react';
import FormMedico from '../../components/forms/FormMedico';

const EditMedico = () => {
    
    const {loading, error, setError, getMedico, setDataMedico, dataMedico} = useMedicoContext()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMedicoData = async () => {
            const data = await getMedico();

            if (data) {
                setDataMedico(data)
            }
        }
        loadMedicoData()
    }, [])
    

    if (loading) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center h-full w-full py-16">
                <span className="flex items-center text-gray-500 dark:text-gray-300 text-lg">
                    <Loader2 className='animate-spin mr-2'/> Cargando...
                </span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center h-full w-full py-16">
                <span className="text-red-500 text-lg">
                    Error: {error}
                </span>
            </div>
        );
    }

    return (
        <div className='bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6'>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Editar Perfil</h2>
            {
                dataMedico && (
                    <FormMedico
                        initialValues={dataMedico}
                        isEditing={true}
                    />
                )
            }
        </div>
    )
}

export default EditMedico
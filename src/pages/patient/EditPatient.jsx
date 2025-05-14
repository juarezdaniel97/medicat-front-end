import { useNavigate } from 'react-router-dom';
import FormPatient from '../../components/forms/FormPatient';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePatientContext } from '../../contexts/PatientContext';

const EditPatient = () => {
    
    const { getPatient, loading, error, dataPatient, setDataPatient } = usePatientContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Función para cargar los datos del paciente
        const loadPatientData = async () => {
            setIsLoading(true);
            try {
                // getPatient ya obtiene el ID del usuario desde el token
                const data = await getPatient();
                if (data) {
                    setDataPatient(data);
                }
            } catch (err) {
                console.error("Error al cargar datos del paciente:", err);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadPatientData();
        
    }, []);

    if (isLoading || loading) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center h-full w-full py-16">
                <span className="flex items-center text-gray-500 dark:text-gray-300 text-lg">
                    <Loader2 className='animate-spin mr-2'/> Cargando...
                </span>
            </div>
        );
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
            {dataPatient && (
                <FormPatient 
                    initialValues={dataPatient} 
                    isEditing={true} 
                />
            )}
        </div>
    );
};

export default EditPatient;

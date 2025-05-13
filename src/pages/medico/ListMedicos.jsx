
import { Loader2, Search } from 'lucide-react';
import { useMedicoContext } from '../../contexts/MedicoContext'
import CardMedico from '../../components/ui/CardMedico';

const ListMedicos = () => {
    const { medicos, loading } = useMedicoContext();
    
    return (
        <>
        <div>
            {
                loading ? (
                    <span className='flex items-center justify-center'>
                        <Loader2 className='animate-spin mr-2'/> Cargando...
                    </span>
                ) : 
                (
                    <div className='bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6'>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Médicos Disponibles</h2>
                            <div className="relative w-full sm:w-64">
                                <input 
                                    type="text" 
                                    placeholder="Buscar médico..." 
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-400 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Filtro por especialidad */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            <button className="px-3 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                                Todas
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                                Cardiología
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                                Neurología
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                                Medicina General
                            </button>
                        </div>

                        {/* Lista de Médicos */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {
                                medicos.map((medico)=>(
                                    <CardMedico key={medico._id} medico={medico}/>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
        </>
    )
}

export default ListMedicos
import { Calendar, Clock, DollarSign, Loader2, PrinterCheck } from 'lucide-react';
import { usePatientContext } from '../../contexts/PatientContext';

const Agenda = () => {
    const { loading, error, agenda } = usePatientContext();
    
    return (
        <div className='bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6'>
            
            {loading && <p>Cargando...</p>}
            
            {/* Filtros por fecha */}
            <div className='mb-6 flex flex-wrap gap-2 items-center p-4 rounded-md'>
                <span className="text-sm text-gray-600 dark:text-gray-300">Filtrar por:</span>
                <button className="px-3 py-1 text-sm cursor-pointer bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                    Próximas
                </button>
                <button className="px-3 py-1 text-sm cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                    Pasadas
                </button>
                <button className="px-3 py-1 text-sm cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                    Canceladas
                </button>
            </div>

            <div className='space-y-4'>
                {
                    loading ? (
                        <span className='flex items-center justify-center'> 
                            <Loader2 className='animate-spin mr-2'/> Cargando...
                        </span>
                    ) : (
                        <div>
                            {agenda && agenda.length > 0 ? 
                                (
                                    agenda.map((cita)=>(
                                        <div key={cita._id}
                                            className='p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                        >
                                            <div className='flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0'>
                                                <div className='flex items-center mb-2 sm:mb-0 sm:mr-4'>
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                                                            cita.estado === 'confirmada' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                            }`}>
                                                        <Clock className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 dark:text-white">{cita.medico}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{cita.especialidad}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {cita.fecha}
                                                    <span className='flex items-center ml-4'>
                                                        <DollarSign className='h-4 w-4' /> {cita.precio}
                                                    </span>
                                                </div>

                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                        cita.estado === 'confirmada' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                        {cita.estado === 'programado' ? 'Programado' : 'Cancelado'}
                                                </span>
                                                <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium">
                                                    Detalles
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (<p className='flex justify-center items-center font-bold bg-gray-200 p-4 text-gray-800'>NO TIENES TURNOS PROGRAMADOS</p>)
                            }
                        </div>
                    )
                }
            </div>
            {error && <p>Error: {error}</p>}

        </div>
    )
}

export default Agenda
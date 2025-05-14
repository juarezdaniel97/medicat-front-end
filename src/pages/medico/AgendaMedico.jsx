import { Calculator, Calendar, Clock, Edit, Loader2 } from "lucide-react";
import { useMedicoContext } from "../../contexts/MedicoContext"


const AgendaMedico = () => {
    const {loading, error, agenda} = useMedicoContext();

    return (
        <>
        <div className="bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6">
            <div>
                filtros
            </div>
            <div className="space-y-4">
                {
                    loading ? (
                        <span className='flex items-center justify-center'> 
                            <Loader2 className='animate-spin mr-2'/> Cargando...
                        </span>
                    ) : (
                        <div>
                            {/* Botones - filtros */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <button>izq</button>
                                    <h2>fecha</h2>
                                    <button>der</button>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button>Hoy</button>
                                    <button>Ver calendario</button>

                                </div>
                            </div>

                            {/* Resumen agendas - header*/}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-600">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200">Total de Citas</h3>
                                        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400"/>
                                    </div>
                                    <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">{ agenda?.length || 0 }</p>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-600">
                                    confirmadas
                                </div>
                                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-600">
                                    Pendientes
                                </div>
                            </div>

                            {/*Listas de Agendas */}
                            <div className="space-y-4">
                                {
                                    agenda && agenda.length > 0 ? (
                                        agenda.map((cita, index) => (
                                            <div 
                                                key={index} 
                                                className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border-gray-200 hover:bg-gray-50 dark:border-gray-600  dark:hover:bg-gray-600/50"
                                                >
                                                <div className='flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0'>
                                                    <div className='flex items-center mb-2 sm:mb-0 sm:mr-4'>
                                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                                                                cita.estado === 'confirmada' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                                }`}>
                                                            <Clock className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900 dark:text-white">{cita.paciente.nombreCompleto}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">{cita.motivo}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        {cita.fecha}
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
                                                    <button className="text-emerald-600 cursor-pointer dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium">
                                                        <Edit/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center rounded-lg bg-gray-50 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400">
                                            <p className="text-lg font-medium">No hay citas programadas para hoy</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    )
}

export default AgendaMedico
import { Calendar, Clock, Edit, Loader2 } from "lucide-react";
import { useMedicoContext } from "../../contexts/MedicoContext"
import CardAgendaMedico from "../../components/ui/CardAgendaMedico";


const AgendaMedico = () => {
    const {loading, error, agenda} = useMedicoContext();

    return (
        <>
        <div className="bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6">
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
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {new Date().toLocaleDateString()}
                                    </h2>
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
                            </div>

                            {/*Listas de Agendas */}
                            <div className="space-y-4">
                                {
                                    agenda && agenda.length > 0 ? (
                                        agenda.map((cita, index) => (
                                            <CardAgendaMedico cita={cita} key={index}/>
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
import { useNavigate } from "react-router-dom";
import { useMedicoContext } from "../../contexts/MedicoContext"
import { Calendar, Clock } from "lucide-react"

const PerfilMedico = () => {
    const { dataMedico } = useMedicoContext();
    
    const navigate = useNavigate();

    // Función para convertir número de día a nombre
    const getDayName = (dayNumber) => {
        const days = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado"
        ];
        return days[dayNumber];
    };

    // Función para formatear el precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };
    
    return (
        <>
        <div className="bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Mi Perfil</h2>
            
            {/* Perfil medico */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 bg-gray-50 dark:bg-gray-600 rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-medium mb-4">
                            {dataMedico?.firstName?.charAt(0)}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{dataMedico?.firstName} {dataMedico?.lastName}</h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">{dataMedico?.specialty}</p>
                        <button
                            onClick={() => navigate(`update/${dataMedico._id}`) }
                            className="bg-emerald-600 hover:bg-emerald-700 rounded-md py-2 px-4 text-white mt-4 cursor-pointer">
                                Editar
                        </button>
                    </div>
                </div>
                <div className="col-span-2 bg-gray-50 dark:bg-gray-600 rounded-lg p-6">
                    <div className="flex flex-col">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Disponibilidad</h3>
                        
                        {dataMedico?.availability && dataMedico.availability.length > 0 ? (
                            <div className="space-y-3">
                                {dataMedico.availability.map((slot) => (
                                    <div key={slot._id} className="flex items-center border-l-4 border-emerald-500 bg-emerald-50 dark:bg-gray-700 p-3 rounded">
                                        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                                        <span className="font-medium text-gray-800 dark:text-white mr-4">{getDayName(slot.dayOfWeek)}:</span>
                                        <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                                        <span className="text-gray-700 dark:text-gray-200">{slot.startTime} - {slot.endTime} hs</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No hay horarios de atención configurados</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Datos Consulta */}
            <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Datos de la consulta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <span className="text-blue-600 dark:text-blue-300 text-sm">$</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Valor de consulta</p>
                            <p className="text-lg font-medium text-gray-900 dark:text-white">{formatPrice(dataMedico?.consultationFee)}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                            <span className="text-purple-600 dark:text-purple-300 text-sm">ID</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Licencia médica</p>
                            <p className="text-lg font-medium text-gray-900 dark:text-white">{dataMedico?.licenseNumber}</p>
                        </div>
                    </div>
                </div>

            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Datos del Profesional</h2>
                    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="flex flex-col space-y-2">
                    <p className="text-gray-700 dark:text-gray-200"> 
                        <span className="font-bold text-gray-900 dark:text-white">Nombre: </span> 
                        {dataMedico?.firstName} 
                    </p>
                
                    <p className="text-gray-700 dark:text-gray-200"> 
                        <span className="font-bold text-gray-900 dark:text-white">Apellido: </span> 
                        {dataMedico?.lastName} 
                    </p>

                    <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-bold text-gray-900 dark:text-white">Email: </span> 
                        {dataMedico?.userId?.email}
                    </p>
                </div>
                
                <div className="flex flex-col space-y-2">
                    <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-bold text-gray-900 dark:text-white">Especialidad: </span> 
                        {dataMedico?.specialty}
                    </p>

                    <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-bold text-gray-900 dark:text-white">Licencia: </span> 
                        {dataMedico?.licenseNumber}
                    </p>

                    <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-bold text-gray-900 dark:text-white">Monto de consulta: </span> 
                        {formatPrice(dataMedico?.consultationFee)}
                    </p>
                </div>
            </div>
            </div>
        </div>
        
        </>
    )
}

export default PerfilMedico
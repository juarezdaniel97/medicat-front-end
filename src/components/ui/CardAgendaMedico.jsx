import { Calendar, Clock, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMedicoContext } from "../../contexts/MedicoContext";

const CardAgendaMedico = ({cita}) => {

    const navigate = useNavigate();
    
    const {dataMedico} = useMedicoContext();

    
    const estadoStyles = {
        programado:  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        confirmado:  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        completado:  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        cancelado:   "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    }

    const estadoLabels = {
        programado: "Programado",
        confirmado: "Confirmado",
        completado: "Completado",
        cancelado:  "Cancelado"
    };

    return (
        <div 
            key={cita._id} 
            className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border-gray-200 hover:bg-gray-50 dark:border-gray-600  dark:hover:bg-gray-600/50"
            >
            <div className='flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0'>
                <div className='flex items-center mb-2 sm:mb-0 sm:mr-4'>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${estadoStyles[cita.estado] || "bg-gray-200 text-gray-700"}`}>
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
                <span
                    className={`px-2 py-1 text-xs rounded-full ${estadoStyles[cita.estado] || "bg-gray-200 text-gray-700"}`}>
                        {estadoLabels[cita.estado] || cita.estado}
                </span>
                <button 
                    onClick={() => navigate(`/turno/update/${dataMedico._id}/${cita.turnoId}`)}
                    className="text-emerald-600 cursor-pointer dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium">
                    <Edit/>
                </button>
            </div>
        </div>
    )
}

export default CardAgendaMedico
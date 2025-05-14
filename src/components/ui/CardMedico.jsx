import { ChevronRight, Heart, Mail, User } from "lucide-react"
import { useFavoriteContext } from "../../contexts/FavoriteContext";
import { useNavigate } from "react-router-dom";

const CardMedico = ({medico}) => {

    const { addFavorite } = useFavoriteContext();
    const navigate = useNavigate(); 

    const dias =  ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    return (
        <div className="border rounded-lg p-4 border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{medico?.firstName} {medico?.lastName}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-5">{medico?.specialty}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400"> ${medico?.consultationFee || "0.00"}</span>
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400"> <Mail size={16} className="mr-2"/> {medico?.userId?.email}</p>
                </div>  
            </div>
            <div className="mt-4 flex items-center justify-between">
                <ul>
                    {medico?.availability?.map((dia) => (
                        <li key={dia._id}>
                            {dias[dia.dayOfWeek]}: {dia.startTime} - {dia.endTime}
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={() => addFavorite(medico)}
                    className="cursor-pointer">
                    <Heart/>
                </button>

                <button
                    onClick={() => navigate(`/turno/create/${medico._id}`)}
                    className="flex items-center cursor-pointer bg-emerald-600 text-white py-2 px-3 rounded-md hover:bg-emerald-700">
                    Agendar Cita
                    <ChevronRight className="ml-1 h-4 w-4" />
                </button>

                
            </div>
        </div>
    )
}

export default CardMedico
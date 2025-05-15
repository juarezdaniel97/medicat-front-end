import { usePatientContext } from "../../contexts/PatientContext"
import SearchBar from "../../components/shared/SearchBar"
import { Loader2, LucideSmartphone, MessageCircle, MessageCircleDashed, MessageCircleHeart, MessageCirclePlus, Smartphone, SmartphoneChargingIcon, SmartphoneIcon, SmartphoneNfc } from "lucide-react";
import { useNavigate } from "react-router-dom";

const calculateAge = (birthDate) => {
    if (!birthDate) return "-";
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    // Si aún no ha llegado el mes de cumpleaños o si es el mes pero no ha llegado el día
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
};


const ListPatient = () => {

    const { pacientes, loading } = usePatientContext();

    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md"> 
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Listado de Pacientes</h2>

                <div className="relative w-full sm:w-64">
                    <SearchBar/>
                </div>
            </div>
            
            {/* Listado de pacientes */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Paciente
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Edad
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Teléfono
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Sexo
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                SMS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-300"> 
                                        <Loader2 className="animate-spin"/>
                                        <span>Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            pacientes && pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <tr key={paciente._id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium mr-3">
                                                    {paciente?.firstName.charAt(0)} 
                                                </div>
                                                <span className="font-medium">{paciente?.firstName} {paciente?.lastName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                                            {calculateAge(paciente?.dateOfBirth)} años
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                                            {paciente?.phoneNumber || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                                            {paciente?.gender || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                                            {paciente?.userId?.email || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                                            <button 
                                                onClick={()=>{navigate('/send-sms')}}
                                                className="p-2 cursor-pointer">
                                                    <SmartphoneIcon size={25}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                                        No hay pacientes disponibles
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListPatient
import React from 'react'
import { Stethoscope, Calendar, UserCheck, Users, PieChart, Bell } from 'lucide-react'

const Home = () => {
    return (
        <div className='bg-white dark:bg-gray-600 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md'>
            {/* Header */}
            <div className="border-b pb-4 mb-6 dark:border-gray-700">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <Stethoscope className="mr-2" size={32} />
                    MediCat Panel de Administración
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Bienvenido al panel de control. Gestiona todos los aspectos del sistema desde aquí.
                </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center">
                        <Calendar className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">Turnos Pendientes</h3>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg border border-green-100 dark:border-gray-600">
                    <div className="flex items-center">
                        <UserCheck className="text-green-600 dark:text-green-400 mr-3" size={24} />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">Turnos Confirmados</h3>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">18</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
                    <div className="flex items-center">
                        <Users className="text-purple-600 dark:text-purple-400 mr-3" size={24} />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">Médicos Activos</h3>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">42</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main sections */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
                        <PieChart className="mr-2" size={20} />
                        Resumen de Actividad
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-300">Especialidades más solicitadas</h3>
                            <ul className="mt-2 space-y-2">
                                <li className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Cardiología</span>
                                    <span className="font-medium text-gray-800 dark:text-white">32%</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Dermatología</span>
                                    <span className="font-medium text-gray-800 dark:text-white">24%</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Pediatría</span>
                                    <span className="font-medium text-gray-800 dark:text-white">18%</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Acciones Rápidas</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center cursor-pointer">
                            <Calendar className="mr-2" size={16} />
                            <span>Nuevo Turno</span>
                    </button>
                    <button 
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center cursor-pointer">
                            <Users className="mr-2" size={16} />
                            <span>Agregar Médico</span>
                    </button>
                    <button 
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center cursor-pointer">
                            <UserCheck className="mr-2" size={16} />
                            <span>Ver Agenda</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
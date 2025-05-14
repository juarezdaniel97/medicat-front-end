import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { usePatientContext } from '../../contexts/PatientContext';
import { Calendar, Edit, Mail, MapPin, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {

    const { dataPatient } = usePatientContext();

    const navigate = useNavigate();
    console.log(dataPatient);
    

    return (
        <div className='bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6'>
            {/* Cabecera */}
            <div className='bg-white dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <div className='bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full'>
                            <User  className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Perfil del Usuario</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-200">Información personal</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(`update/${dataPatient?._id}`)} 
                        className="flex items-center justify-center w-full sm:w-auto px-4 py-2 cursor-pointer bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Perfil
                    </button>
                </div>
            </div>

            {/* Contenio delPerfil */}
            <div className='p-6'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Nombre completo</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">{dataPatient?.firstName} {dataPatient?.lastName}</p>
                        
                    </div>
                    <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Género</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">{dataPatient?.gender === 'M' ? 'Masculino' : dataPatient?.gender === 'F' ? "Femenino" : "No Epecificado"}</p>
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900">
                        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Información de contacto</h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-600">
                        <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo electrónico</p>
                                <p className="text-md text-gray-800 dark:text-white">{dataPatient?.userId?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</p>
                                <p className="text-md text-gray-800 dark:text-white">{dataPatient?.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de nacimiento</p>
                                <p className="text-md text-gray-800 dark:text-white">{dataPatient?.dateOfBirth ? new Date(dataPatient?.dateOfBirth).toLocaleDateString() : "No disponible"}</p> 
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dirección */}
                <div className="bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900">
                        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Dirección</h3>
                    </div>
                    <div className="p-4">
                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-1" />
                            <div>
                                <p className="text-gray-800 dark:text-white"> {dataPatient?.address?.street}</p>
                                <p className="text-gray-600 dark:text-gray-400">  {dataPatient?.address?.city}, CP  {dataPatient?.address?.zipCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil
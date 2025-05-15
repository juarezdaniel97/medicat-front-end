import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAdminContext } from '../../contexts/AdminContext'

const PerfilAdmin = () => {
    const { dataAdmin } = useAdminContext();
    const navigate = useNavigate();

    
    console.log('(Perfil Admin) dataAdmin ->', dataAdmin);
    

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Mi Perfil</h2>
            
            {/* Perfil medico */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 bg-gray-50 dark:bg-gray-600 rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-medium mb-4">
                            {dataAdmin?.firstName?.charAt(0)}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{dataAdmin?.firstName} {dataAdmin?.lastName}</h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">Administrador</p>
                        <button
                            onClick={() => navigate(`update/${dataAdmin._id}`) }
                            className="bg-emerald-600 hover:bg-emerald-700 rounded-md py-2 px-4 text-white mt-4 cursor-pointer">
                                Editar
                        </button>
                    </div>
                </div>
                <div className="col-span-2 bg-gray-50 dark:bg-gray-600 rounded-lg p-6">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Datos del Personal</h2>
                        <p className="text-gray-700 dark:text-gray-200"> 
                            <span className="font-bold text-gray-900 dark:text-white">Nombre: </span> 
                            {dataAdmin?.firstName} 
                        </p>
                        <p className="text-gray-700 dark:text-gray-200"> 
                            <span className="font-bold text-gray-900 dark:text-white">Apellido: </span> 
                            {dataAdmin?.lastName} 
                        </p>

                        <p className="text-gray-700 dark:text-gray-200">
                            <span className="font-bold text-gray-900 dark:text-white">Email: </span> 
                            {dataAdmin?.userId?.email}
                        </p>
                        <p className="text-gray-700 dark:text-gray-200"> 
                            <span className="font-bold text-gray-900 dark:text-white">Departamento: </span> 
                            {dataAdmin?.department} 
                        </p>
                        <p className="text-gray-700 dark:text-gray-200"> 
                            <span className="font-bold text-gray-900 dark:text-white">Cargo: </span> 
                            {dataAdmin?.position} 
                        </p>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default PerfilAdmin
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { Calendar, FileText, Home, Hospital, User, UserCheck, UserCircle2Icon } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const HomeAdmin = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("home");
    

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        //funcion para cargar pacientes, medicos, usuarios,
    }, [])
    
    
    return (
        <div>
            {/* Header */}
            <Header showLogout={true} onLogout={handleLogout} userEmail={user?.email}/>

            {/* Navigation */}
            <div className='min-h-screen bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'>
                <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <div className='mb-6 border-b border-gray-200 dark:border-gray-700'>
                        <nav className='flex space-x-8 rounded-lg py-3 px-3 max-w-7xl bg-white dark:bg-gray-700'>

                            {/* Button Home */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'home' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("home");
                                    navigate("/admin/home");
                                }}
                                >
                                    <Home className="mr-2 h-5 w-5"/>
                                    Home
                            </button>

                            {/* Button Pacientes */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'pacientes'  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("pacientes");
                                    navigate("/admin/pacientes");
                                }}
                            >
                                <User className="mr-2 h-5 w-5" />
                                Pacientes
                            </button>
                            
                            {/* Button Medicos */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'medicos'  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("medicos");
                                    navigate("/admin/medicos");
                                }}
                            >
                                <Hospital className="mr-2 h-5 w-5"/>
                                Medicos
                            </button>

                            {/* Usuarios */}
                            <button
                                className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab === 'usuarios'  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600' }`}
                                onClick={() => {
                                    setActiveTab("usuarios");
                                    navigate("/admin/usuarios");
                                }}
                            >
                                <UserCheck className="mr-2 h-5 w-5"/>
                                Usuarios
                            </button>

                            {/* Perfil */}
                            <button
                                    className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm cursor-pointer ${ activeTab == 'perfil' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400': 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600' }`}
                                    onClick={() => {
                                        setActiveTab("perfil");
                                        navigate("/admin/perfil");
                                    }}
                                    >
                                    <UserCircle2Icon className='mr-2 h-5 w-5'/>
                                    Perfil
                            </button>
                        </nav>
                    </div>
                </main>
                
                <Outlet/>
            </div>
            
            {/* Footer */}
            <Footer/>       
        </div>
    )
}

export default HomeAdmin
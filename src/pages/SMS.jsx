import React from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FormSMS from '../components/forms/FormSMS';

const SMS = () => {

    const { logout, user } = useAuthContext();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (

        <div>
            {/* Header */}
            <Header showLogout={true} onLogout={handleLogout} userEmail={user?.email}/>
        
            <main className='flex flex-col justify-center items-center h-screen bg-gray-200 dark:bg-gray-800 '>
                <div  className="bg-white dark:bg-gray-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">MediCat</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Envíale un SMS a tu Paciente</p>
                    </div>

                    {/* Formulario */}
                    <FormSMS/>
                </div>
            </main>

            <Footer/>
        </div>
    )
}

export default SMS
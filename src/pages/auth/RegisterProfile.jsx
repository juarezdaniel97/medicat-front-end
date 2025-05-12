import { useAuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import FormPatient from '../../components/forms/FormPatient';
import FormMedico from '../../components/forms/FormMedico';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const RegisterProfile = () => {

    const { logout, user } = useAuthContext();
    
    const navigate = useNavigate();
    const location = useLocation();


    const profileType = location.state?.profile || "paciente"; // Defecto paciente

    const handleLogout = () =>{
        logout();
        navigate("/");
    }

    return (
        <>
            <Header showLogout={true} onLogout={handleLogout} userEmail={user?.email} />

            <main>
                <div className='bg-gray-200 dark:bg-gray-800 min-h-[80vh] flex items-center justify-center px-4 py-10'>
                    <div className='container mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-md w-full max-x-md'>
                        <div className="text-center mt-5 mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">MediCat</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Create tu perfil de {profileType} </p>
                        </div>

                        <div className='p-8'>
                            {profileType === "paciente" && (
                                    <FormPatient/>
                                )}
                                {profileType === "medico" && (
                                    <FormMedico/>
                                )}
                                {profileType === "administrador" && (
                                    <form>
                                        <label>Nombre:</label>
                                        <input type="text" className="border p-2 mb-4" />
                                        <label>Departamento:</label>
                                        <input type="text" className="border p-2 mb-4" />
                                        {/* Otros campos específicos para administrador */}
                                    </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default RegisterProfile
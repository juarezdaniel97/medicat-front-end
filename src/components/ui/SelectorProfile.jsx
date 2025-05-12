import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Footer from '../layout/Footer';
import Header from '../layout/Header';


const profiles = [
    { 
        name: 'Paciente', 
        value: 'paciente', 
        color: 'bg-emerald-600 dark:bg-emerald-500',
        icon: '👤',
        description: 'Accede a tus citas y expediente médico'
    },
    { 
        name: 'Médico', 
        value: 'medico', 
        color: 'bg-emerald-600 dark:bg-emerald-500',
        icon: '👨‍⚕️',
        description: 'Gestiona tus pacientes y consultas'
    },
    { 
        name: 'Administrador', 
        value: 'administrador', 
        color: 'bg-emerald-600 dark:bg-emerald-500',
        icon: '⚙️', 
        description: 'Configura y administra el sistema'
    },
];


const SelectorProfile = () => {
    
    const {logout, success: messageSuccess, user} = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate("/");
    }

    useEffect(() => {
        if (messageSuccess) {
            toast.success(messageSuccess);
        }
    }, [messageSuccess])
    

        return (
        <>
            <Header showLogout={true} onLogout={handleLogout} userEmail={user?.email} />

            <main>
                <div className="bg-gray-200 dark:bg-gray-800 min-h-[80vh] flex items-center justify-center px-4 py-10">
                    <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 md:p-10">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
                                Selecciona tu perfil
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                Elige cómo quieres usar la aplicación
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {profiles.map((profile) => (
                                <div
                                    key={profile.value}
                                    onClick={() => navigate('/register-profile', { state: { profile: profile.value } })}
                                    className={`${profile.color} text-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105                                   cursor-pointer text-center`}
                                >
                                    <div className="text-4xl md:text-5xl mb-4">{profile.icon}</div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2">{profile.name}</h3>
                                    <p className="text-sm opacity-90">{profile.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer/>
        </>
    )
}

export default SelectorProfile
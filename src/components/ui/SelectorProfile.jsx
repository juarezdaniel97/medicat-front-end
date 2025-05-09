import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const SelectorProfile = () => {
    
    const {logout} = useAuthContext();
    const navigate = useNavigate();

    
    const handleLogout = () =>{
        logout();
        navigate("/");
    }

        return (
        <>
            <div className='flex justify-between items-center bg-gray-200 p-4'>
                <h1 className='text-2xl font-bold'>Selector - Profile</h1>
                <button
                    onClick={() => handleLogout()}
                    type='button' 
                    className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                        Cerrar Sesión
                    </button>
            </div>

            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-2xl font-bold'>Bienvenido a la página de selección de perfil</h1>
                <p className='text-lg'>Por favor selecciona un perfil para continuar</p>
                <div className='flex flex-col gap-4 mt-4'>
                    <button 
                        onClick={() => navigate("/register-profile")}
                        className='bg-blue-500 text-white rounded p-2 cursor-pointer'>
                            Paciente
                    </button>
                    
                    <button 
                        className='bg-blue-500 text-white rounded p-2 cursor-pointer'>
                            Medico
                    </button>
                    
                    <button 
                        className='bg-blue-500 text-white rounded p-2 cursor-pointer'>
                            Administrador
                    </button>
                </div>
            </div>
        </>
    )
}

export default SelectorProfile
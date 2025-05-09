import { useAuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import FormPatient from '../../components/forms/FormPatient';

const RegisterProfile = () => {

    const { logout } = useAuthContext();
    
    const navigate = useNavigate();
    const location = useLocation();


    const profileType = location.state?.profile || "paciente"; // Defecto paciente

    const handleLogout = () =>{
        logout();
        navigate("/");
    }

    return (
        <>
        
        <div className='flex justify-between items-center bg-gray-200 p-4'>
            <h1 className='text-2xl font-bold'>Register - Profile</h1>
            <button
                onClick={() => handleLogout()}
                type='button' 
                className='bg-red-500 text-white rounded p-2 m-2 cursor-pointer'>
                    Cerrar Sesión
                </button>
        </div>

        
            <div className='p-4'>
                <h2 className='text-xl font-bold'>Registro para {profileType}</h2>
                {profileType === "paciente" && (
                    <FormPatient/>
                )}
                {profileType === "medico" && (
                    <form>
                        <label>Nombre:</label>
                        <input type="text" className="border p-2 mb-4" />
                        <label>Especialidad:</label>
                        <input type="text" className="border p-2 mb-4" />
                        <label>Precio de consulta:</label>
                        <input type="number" className="border p-2 mb-4" />
                        {/* Otros campos específicos para médico */}
                    </form>
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
        </>
    )
}

export default RegisterProfile
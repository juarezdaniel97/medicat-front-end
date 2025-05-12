import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FormLogin from '../../components/forms/FormLogin';

const Login = () => {

    return (
        <>
            <Header/>
            
            <main className='flex flex-col justify-center items-center h-screen bg-gray-200 dark:bg-gray-800 '>
                <div  className="bg-white dark:bg-gray-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">MediCat</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Inicia sesión en tu cuenta</p>
                    </div>

                    {/* Formulario */}
                        <FormLogin/>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            ¿No tienes una cuenta?{' '}
                            <Link to="/register" className='text-emerald-600 cursor-pointer dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-medium'>
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Login
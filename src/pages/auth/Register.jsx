import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FormRegisterUser from '../../components/forms/FormRegisterUser';

const Register = () => {

    return (

        <>
            <Header/>

            <main className='min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 bg-gray-200 dark:bg-gray-800'>
                <div className='bg-white dark:bg-gray-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md'>

                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">MediCat</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Crea tu cuenta</p>
                    </div>

                    <FormRegisterUser/>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            ¿Ya tienes una cuenta?{' '}
                            
                            <Link to="/" className='text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-medium'>
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Register
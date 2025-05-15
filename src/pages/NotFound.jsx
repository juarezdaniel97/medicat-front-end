import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className=" bg-gray-200 dark:bg-gray-700 flex-grow flex items-center justify-center text-center p-6">
                <div>
                    <h1 className="text-5xl font-bold text-red-400 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2 dark:text-gray-200">Página no encontrada</h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                        Lo sentimos, la página que estás buscando no existe o fue movida.
                    </p>

                    <Link
                        to='/' 
                        className='inline-block bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700' >
                        Inicio
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default NotFound

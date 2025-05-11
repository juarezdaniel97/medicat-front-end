import { Code, GraduationCap, User } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-white text-gray-800 py-8 px-4 shadow-lg dark:bg-gray-900 dark:text-gray-200">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <GraduationCap className="w-9 h-9 text-yellow-400" />
                    <div>
                        <h3 className="font-bold text-lg tracking-wide">Diplomatura Fullstack</h3>
                        <p className="text-sm text-gray-700 dark:text-slate-200">Trabajo Final - Nodo Tecnologógico y FTyCA</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <Code className="w-9 h-9 text-amber-500 transition-transform duration-300 hover:scale-110" />
                    <div>
                        <h4 className="font-semibold text-lg">MediCat</h4>
                        <p className="text-sm text-gray-700 dark:text-slate-200">Sistema de Turnos Médicos</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <User className="w-9 h-9 text-blue-400 transition-transform duration-300 hover:scale-110" />
                    <div>
                        <p className="font-medium text-lg">Daniel Juárez</p>
                        <p className="text-sm text-gray-700 dark:text-slate-200">Desarrollador Fullstack</p>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
                <p>© {new Date().getFullYear()} MediCat - Sistema de Turnos Médicos. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
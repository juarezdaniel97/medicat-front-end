import { LogOut } from "lucide-react"
import Logo from "../shared/Logo"
import MobileMenu from "../shared/MobileMenu"
import Navigation from "../shared/Navigation"
import SearchBar from "../shared/SearchBar"
import ThemeToggler from "../shared/ThemeToggler"

const Header = ({ showLogout = false, onLogout, userEmail }) => {

    return (
        <div className="w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-white shadow-md ">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    
                    <Logo/>
                    <Navigation/>

                    <div className="flex items-center space-x-4">
                        <SearchBar/>
                        
                        {showLogout && (
                            <>
                                {userEmail && (
                                    <span className="hidden md:inline-block text-sm">
                                        <span className="mr-1">👤</span>
                                        {userEmail}
                                    </span>
                                )}
                                <button
                                    onClick={onLogout}
                                    className="flex items-center justify-center  bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
                                >
                                    Cerrar Sesión
                                    <LogOut size={16} className="ml-2"/>
                                </button>
                            </>
                        )}
                        <ThemeToggler/>
                        <MobileMenu/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
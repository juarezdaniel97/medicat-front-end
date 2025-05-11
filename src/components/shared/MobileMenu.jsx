import { useState } from "react"
import { useThemeContext } from "../../contexts/ThemeContext";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";


const MobileMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useThemeContext();

    return (
        <div className="md:hidden">
            <button
                className="flex items-center justify-center cursor-pointer"
                onClick={()=> setIsOpen(!isOpen)}
            >   
                {
                    isOpen ? <X size={20} className="text-gray-800 dark:text-white"/> : <Menu size={20} className="text-gray-800 dark:text-white"/>
                }
            </button>
            {
                isOpen && (
                    <div className="absolute left-0 right-0 top-16 py-3 px-4 border-t z-50 shadow-lg bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                        <Navigation mobile={true}/>
                        <SearchBar mobile={true}/>
                    </div>
                )
            }
        </div>
    )
}

export default MobileMenu
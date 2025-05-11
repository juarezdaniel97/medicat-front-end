import Logo from "../shared/Logo"
import MobileMenu from "../shared/MobileMenu"
import Navigation from "../shared/Navigation"
import SearchBar from "../shared/SearchBar"
import ThemeToggler from "../shared/ThemeToggler"

const Header = () => {

    return (
        <div className="w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-white shadow-md ">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    
                    <Logo/>
                    <Navigation/>
                    <div className="flex items-center space-x-4">
                        <SearchBar/>
                        <ThemeToggler/>
                        <MobileMenu/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
import { Moon, MoonIcon, Sun } from "lucide-react";
import { useThemeContext } from "../../contexts/ThemeContext"


const ThemeToggler = () => {
    const {theme, toggleTheme } = useThemeContext();
    const isDarkMode = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-yellow-300"
        >
            { isDarkMode ? <Sun size={20}/> : <MoonIcon size={20}/>}
        </button>
    )
}

export default ThemeToggler
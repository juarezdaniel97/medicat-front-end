import { useEffect, useState } from "react";

export const useTheme = () =>{

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light"; // Por defecto es 'light'
    });

    useEffect(() => {
        const root = document.documentElement;

        // Guardar en localStorage
        localStorage.setItem("theme", theme);
    
        // Aplicar la clase 'dark' al <html> para que funcione Tailwind
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

    }, [theme])
    

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return {theme, toggleTheme};
};
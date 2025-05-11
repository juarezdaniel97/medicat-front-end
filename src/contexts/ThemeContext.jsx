import { createContext, useContext } from "react";
import { useTheme } from "../hooks/useTheme";


const ThemeContext = createContext();


export const ThemeContextProvider = ({children}) => {
    const themeValue = useTheme();

    return (
        <ThemeContext.Provider value={themeValue}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext);

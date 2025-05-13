import { createContext } from "react";
import { useFavorites } from "../hooks/useFavorites";


const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => { 

    const values = useFavorites()

    return(
        <FavoriteContext.Provider value={values}>
            { children }
        </FavoriteContext.Provider>
    )
}
import { createContext, useContext } from "react";
import { useMedico } from "../hooks/useMedico";

const MedicoContext = createContext();


export const MedicoContextProvider = ({children}) =>{
    const values = useMedico();

    return(
        <MedicoContext.Provider value={values}>
            {children}
        </MedicoContext.Provider>
    )
}

export const useMedicoContext = () => useContext(MedicoContext);
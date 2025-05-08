import { createContext, useContext } from "react";
import { usePatient } from "../hooks/usePatient";

const PatientContext = createContext();


export const PatientContextProvider = ({ children}) => {
    const value = usePatient()

    return (
        <PatientContext.Provider value={value}>
            {children}
        </PatientContext.Provider>
    )
}

export const usePatientContext = () => useContext(PatientContext)
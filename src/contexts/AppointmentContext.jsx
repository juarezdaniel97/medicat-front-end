import { createContext } from "react";
import { useAppointment } from "../hooks/useAppointment";


const AppointmentContext = createContext();


export const AppointmentContextProvider = ({ children }) => {

    const values = useAppointment();

    return (
        <AppointmentContext.Provider value={{values}}>
            {children}
        </AppointmentContext.Provider>
    )
}

export const useAppointmentContext = () => useContext(AppointmentContext);
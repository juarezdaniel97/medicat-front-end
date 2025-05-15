import { createContext, useContext } from "react";
import { useAdmin } from "../hooks/useAdmin";


const AdminContext = createContext();


export const AdminContextProvider = ({children}) => {
    const values = useAdmin();

    return(
        <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);
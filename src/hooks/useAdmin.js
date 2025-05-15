import { useState } from "react";
import api_admin, { getAdminApi } from "../services/admin";
import { jwtDecode } from "jwt-decode";

export const useAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataAdmin, setDataAdmin] = useState(null);
    
    const getAdmin = async () => {
        setLoading(true)
        setError(null)

        try {
            
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const id = decoded.id;

            api_admin.defaults.headers.common["Authorization"] = `Bearer ${token}`

            const response = await getAdminApi(id);
            
            return response.data;

        } catch (error) {
            console.error("Error al obtener administrados", error);
            setError(error.response.data.message || "Error al obtener administrados")
            return false;

        }finally{
            setLoading(false);
        }
    }
    
    return{
        loading,
        error,
        setDataAdmin,
        dataAdmin,
        getAdmin
    }
}
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import api, { loginUser, registerUser } from "../services/auth";
import { set } from "react-hook-form";
import { roleMap } from "../utils/roleMap";



export const useAuth = () =>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = ( )=>{

            try {
                const token = localStorage.getItem("token");

                if(token){
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000; 

                    if(decoded.exp < currentTime){
                        logout();
                        setError("Token expirado, por favor inicie sesión nuevamente");
                    }else{
                        setUser(decoded);
                        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                console.error('Error al verificar autenticación ', err);
                logout();
            }finally{
                setLoading(false);
            }
        }

        checkAuth();
    }, [])
    

    const login = async (email, password ) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Verificar si el usuario ya está autenticado
            const response = await loginUser({ email, password });
            const { token } = response.data;
            const decoded = jwtDecode(token);
            localStorage.setItem("token", token);

            //Configurar el token en los headers de las peticiones
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            
            setUser(decoded);
            setSuccess("Login exitoso");
            setIsAuthenticated(true);
            
            
            return true;

        } catch (err) {
            console.error("Error durante el login. ", err);
            const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
            setError(errorMessage);
            return false;

        }finally{
            setLoading(false)
        }
    }

    const logout = async () => {
        setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            delete api.defaults.headers.common["Authorization"]
    }

    const addUser = async (data) =>{
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            
            
            //const response = await registerUser(data);
            //const { token } = response.data;
            //const decoded = jwtDecode(token);
            //localStorage.setItem("token", token);

            //Configurar el token en los headers de las peticiones
            //api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            
            //setUser(decoded);
            //setSuccess(res.data.message);
            
            
            return true;

        } catch (error) {
            
        }
    }


    return {
        login,
        logout,
        user,
        loading,
        error,
        success,
        isAuthenticated        
    }
}
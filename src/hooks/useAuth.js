import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import api, { loginUser, registerUser } from "../services/auth";
import { roleMap } from "../utils/roleMap";



export const useAuth = () =>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // setLoading(true)
                const decoded = jwtDecode(token);
                setUser(decoded);
                setIsAuthenticated(true);
            } catch (err) {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("token")
            }
        }
        setLoading(false);
}, []);
    
    const login = async (email, password ) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            
            const response = await loginUser({ email, password });
            const { token, user:userResponse } = response.data;
            
            localStorage.setItem("token", token);

            //setUser(userResponse);
            const decoded = jwtDecode(token);
            setUser(decoded)
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
            
            const response = await registerUser(data);

            const { token, user:userResponse } = response.data.data;
            
            localStorage.setItem("token", token);
            
            setUser(userResponse);
            setSuccess(response.data.message);
            setIsAuthenticated(true)
            
            return true;

        } catch (err) {
            console.error("Error durante el registro. ", err);
            const errorMessage = `${ err.response?.data?.message}, ${err.response?.data?.error}` || "Error al registrar usuario";
            setError(errorMessage);
            return false;

        } finally{
            setLoading(false)
        }
    }


    return {
        login,
        logout,
        addUser,
        user,
        loading,
        error,
        success,
        setSuccess,
        isAuthenticated        
    }
}
import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, allowedRole}) => {

    const {user, isAuthenticated} = useAuthContext();  
        
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (!allowedRole.includes(user.role)) {

        if (user.role === "admin") {
            return <Navigate to="/admin" />;    
        }

        if (user.role === "paciente") {
            console.log("Redirigiendo a paciente");
            return <Navigate to="/patient" />;    
        }

        if (user.role === "medico") {
            return <Navigate to="/medico" />;    
        }
        
    }
    return children;
}

export default PrivateRoutes
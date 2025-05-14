import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, allowedRole}) => {

    const {user, isAuthenticated, loading} = useAuthContext();  
    
    if (loading) {
        return <div>Cargando...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (allowedRole && !allowedRole.includes(user.role)) {
        if (user.role === "admin") return <Navigate to="/admin" />;
        if (user.role === "paciente") return <Navigate to="/patient" />;
        if (user.role === "medico") return <Navigate to="/medico" />;
    }
    return children;
}

export default PrivateRoutes
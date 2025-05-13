import { Home } from 'lucide-react'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePatient from '../pages/patient/HomePatient'
import Login from '../pages/auth/Login'
import PrivateRoutes from './PrivateRoutes'
import HomeMedico from '../pages/medico/HomeMedico'
import HomeAdmin from '../pages/admin/HomeAdmin'
import Agenda from '../pages/patient/Agenda'
import Historial from '../pages/patient/Historial'
import Perfil from '../pages/patient/Perfil'
import ListMedicos from '../pages/medico/ListMedicos'
import RegisterProfile from '../pages/auth/RegisterProfile'
import SelectorProfile from '../components/ui/SelectorProfile'
import Register from '../pages/auth/Register'
import AgendaMedico from '../pages/medico/AgendaMedico'
import ListPatient from '../pages/patient/ListPatient'
import PerfilMedico from '../pages/medico/PerfilMedico'
import Favorite from '../pages/patient/Favorite'

const AppsRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            <Route path="/selector-profile" 
                element={
                    <PrivateRoutes>
                        <SelectorProfile />
                    </PrivateRoutes>
                } 
            />
            
            {/* <Route path='/selector-profile' element={<SelectorProfile />}/> */}
            
            <Route path="/register-profile" 
                element={
                    <PrivateRoutes>
                        <RegisterProfile />
                    </PrivateRoutes>
                } 
                />
            
            {/* <Route path='/register-profile' element={<RegisterProfile />}/> */}


            {/* Rutas para el administrador */}
            <Route path="/admin" 
                element={
                    <PrivateRoutes allowedRole={["admin"]}>
                        <HomeAdmin/>
                    </PrivateRoutes>
                    } > 
            
            </Route>

            {/* Rutas para los pacientes */}
            <Route path="/patient" 
                element={
                    <PrivateRoutes allowedRole={["paciente"]}>
                        <HomePatient />
                    </PrivateRoutes>

                }> 
                {/* Redirige automaticamente al cargar la página */}
                <Route index element={<Navigate to="agenda" replace />} /> 
                <Route path='agenda' element={<Agenda/>} />
                <Route path='favorito' element={<Favorite/>} />
                {/* <Route path='historial' element={<Historial/>} /> */}
                <Route path='medicos' element={<ListMedicos/>} />
                <Route path='perfil' element={<Perfil/>} />
                <Route path='create' element={<h1>Create Profile</h1>} />
                <Route path='list/' element={<>List Profile</>} />
                <Route path='update/:id' element={<>Update Profile</>} />
                <Route path='delete/:id' element={<>Delete Profile</>} />
            
            </Route>

            {/* Rutas para los medicos */}
            <Route path="/medico"
                element={
                    <PrivateRoutes allowedRole={["medico"]}>
                        <HomeMedico/>
                    </PrivateRoutes>
                }> 
                <Route index element={<Navigate to="agenda" replace/>}/>
                <Route path='agenda' element={<AgendaMedico/>} />
                <Route path='pacientes' element={<ListPatient/>} />
                <Route path='perfil' element={<PerfilMedico/>} />
            </Route>

            <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
    )
}

export default AppsRoutes
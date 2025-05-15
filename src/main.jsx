import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { MedicoContextProvider } from './contexts/MedicoContext.jsx'
import { PatientContextProvider } from './contexts/PatientContext.jsx'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { FavoriteContextProvider } from './contexts/FavoriteContext.jsx'
import { AdminContextProvider } from './contexts/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <AdminContextProvider>
            <MedicoContextProvider>
              <PatientContextProvider>
                <FavoriteContextProvider>
                  <App />
                </FavoriteContextProvider>
              </PatientContextProvider>
            </MedicoContextProvider>
          </AdminContextProvider>
      </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

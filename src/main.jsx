import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { MedicoContextProvider } from './contexts/MedicoContext.jsx'
import { PatientContextProvider } from './contexts/PatientContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MedicoContextProvider>
          <PatientContextProvider>
            <App />
          </PatientContextProvider>
        </MedicoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

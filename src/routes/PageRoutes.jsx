import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const LoginPage = lazy(() => import('../pages/login'))
const RegisterPage = lazy(() => import('../pages/register'))
const DashboardPage = lazy(() => import('../pages/dashboard'))

import { AlertProvider } from '../contexts/AlertContext'; 

const PageRoutes = () => {
  return (
      <BrowserRouter>
        <AlertProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<DashboardPage />} />  
          </Routes>
        </AlertProvider>
      </BrowserRouter>
  )
}

export default PageRoutes
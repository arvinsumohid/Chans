import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const LoginPage = lazy(() => import('../pages/login'))
const RegisterPage = lazy(() => import('../pages/register'))
const DashboardPage = lazy(() => import('../pages/dashboard'))
const UserPage = lazy(() => import('../pages/user'))
const DoctorPage = lazy(() => import('../pages/doctor'))
const ServicePage = lazy(() => import('../pages/service'))
const AppointmentPage = lazy(() => import('../pages/appointment'))
import { AlertProvider } from '../contexts/AlertContext'; 

const PageRoutes = () => {
  return (
      <BrowserRouter>
        <AlertProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/doctors" element={<DoctorPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
          </Routes>
        </AlertProvider>
      </BrowserRouter>
  )
}

export default PageRoutes
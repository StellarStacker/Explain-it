import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LandingPage } from '../pages/landing/LandingPage'
import { AppLayout } from '../pages/AppLayout'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { EmailVerification } from '../pages/EmailVerification'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/verify-email',
    element: <EmailVerification />
  },
  {
    path: '/explain-it',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])

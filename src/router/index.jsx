import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../pages/AppLayout'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/explain-it" replace />
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
    path: '/explain-it',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/explain-it" replace />
  }
])

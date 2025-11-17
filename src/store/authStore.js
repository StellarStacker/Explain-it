import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authService from '../services/authService'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      provider: null,

      // Initialize auth from localStorage
      initAuth: async () => {
        const token = authService.getStoredToken()
        const user = authService.getStoredUser()
        const provider = localStorage.getItem('provider')

        if (token && !authService.isTokenExpired()) {
          set({
            token,
            user,
            isAuthenticated: true,
            provider,
          })
        } else if (token && authService.isTokenExpired()) {
          // Token expired, logout
          get().logout()
        }
      },

      // Email/Password Login
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const result = await authService.login(email, password)
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            provider: 'local',
            isLoading: false,
            error: null,
          })
          return result
        } catch (error) {
          const errorMessage = error.message || 'Login failed'
          set({
            error: errorMessage,
            isLoading: false,
          })
          throw error
        }
      },

      // Email/Password Register
      register: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
          const result = await authService.register({
            email,
            password,
            firstName: name.split(' ')[0] || name,
            lastName: name.split(' ')[1] || '',
          })
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            provider: 'local',
            isLoading: false,
            error: null,
          })
          return result
        } catch (error) {
          const errorMessage = error.message || 'Registration failed'
          set({
            error: errorMessage,
            isLoading: false,
          })
          throw error
        }
      },

      // Google OAuth Login
      googleLogin: async (googleToken) => {
        set({ isLoading: true, error: null })
        try {
          const result = await authService.googleLogin(googleToken)
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            provider: 'google',
            isLoading: false,
            error: null,
          })
          return result
        } catch (error) {
          const errorMessage = error.message || 'Google login failed'
          set({
            error: errorMessage,
            isLoading: false,
          })
          throw error
        }
      },

      // Get Current User
      getCurrentUser: async () => {
        set({ isLoading: true })
        try {
          const user = await authService.getCurrentUser()
          set({ user, isLoading: false })
          return user
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          })
          throw error
        }
      },

      // Update Profile
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const user = await authService.updateProfile(userData)
          set({ user, isLoading: false })
          return user
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          })
          throw error
        }
      },

      // Change Password
      changePassword: async (oldPassword, newPassword) => {
        set({ isLoading: true, error: null })
        try {
          const result = await authService.changePassword(oldPassword, newPassword)
          set({ isLoading: false })
          return result
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          })
          throw error
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true })
        try {
          await authService.logout()
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            provider: null,
            error: null,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          })
        }
      },

      // Set Error
      setError: (error) => set({ error }),

      // Clear Error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
    }
  )
)

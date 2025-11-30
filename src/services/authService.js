import axios from 'axios'
import { tempRegistrationStore } from '../utils/tempRegistrationStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

const authService = {
  /**
   * Login with email and password
   */
  async login(email, password) {
    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      })

      const { token, user } = response.data

      // Store token and user info
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('provider', user.provider || 'local')

      return {
        success: true,
        token,
        user,
      }
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Login failed'
      throw new Error(message)
    }
  },

  /**
   * Register new user with email/password
   */
  async register(userData) {
    try {
      const response = await API.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      })

      const { token, user } = response.data

      // Store token and user info
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('provider', user.provider || 'local')

      return {
        success: true,
        token,
        user,
      }
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Registration failed'
      throw new Error(message)
    }
  },

  /**
   * Pre-register user (store registration data temporarily and send OTP)
   * Database insertion happens AFTER email verification
   */
  async preRegister(userData) {
    try {
      // Store registration data temporarily (before verification)
      tempRegistrationStore.store(userData.email, userData)

      // Send OTP to email
      const response = await API.post('/auth/send-otp', {
        email: userData.email,
      })

      return {
        success: true,
        message: 'OTP sent to your email. Please verify to complete registration.',
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to send OTP'
      throw new Error(message)
    }
  },

  /**
   * Complete registration after OTP verification
   * This is called after user verifies their OTP
   */
  async completeRegistration(email, otp) {
    try {
      // First verify the OTP with backend
      const verifyResponse = await API.post('/auth/verify-otp', {
        email,
        otp,
      })

      // Get the stored registration data
      const registrationData = tempRegistrationStore.get(email)
      
      if (!registrationData) {
        throw new Error('Registration data not found. Please register again.')
      }

      // Now create the user account with the verified email
      const registerResponse = await API.post('/auth/register', {
        email: registrationData.email,
        password: registrationData.password,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
      })

      const { token, user } = registerResponse.data

      // Store token and user info
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('provider', user.provider || 'local')

      // Clear temporary registration data
      tempRegistrationStore.remove(email)

      return {
        success: true,
        token,
        user,
      }
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Registration completion failed'
      throw new Error(message)
    }
  },

  /**
   * Google OAuth login
   */
  async googleLogin(googleToken) {
    try {
      // The googleToken is the JWT credential from Google
      // We send it to the backend which will verify it
      // Send as JSON object as expected by the backend
      const response = await API.post('/auth/google', {
        token: googleToken,
      })

      const { token, user } = response.data

      // Store token and user info
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('provider', 'google')

      return {
        success: true,
        token,
        user,
      }
    } catch (error) {
      console.error('Google login error:', error)
      const message = error.response?.data?.error || error.message || 'Google login failed'
      throw new Error(message)
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    try {
      const response = await API.get('/auth/user')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch user profile')
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(userData) {
    try {
      const response = await API.put('/auth/user', userData)
      const user = response.data

      // Update stored user info
      localStorage.setItem('user', JSON.stringify(user))

      return user
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      throw new Error(message)
    }
  },

  /**
   * Change user password
   */
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await API.post('/auth/change-password', {
        oldPassword,
        newPassword,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed'
      throw new Error(message)
    }
  },

  /**
   * Request password reset email
   */
  async requestPasswordReset(email) {
    try {
      const response = await API.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset request failed'
      throw new Error(message)
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await API.post('/auth/reset-password', {
        token,
        newPassword,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed'
      throw new Error(message)
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await API.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('provider')

      // Clear axios default header
      delete API.defaults.headers.common['Authorization']
    }
  },

  /**
   * Send OTP to email
   */
  async sendOTP(email) {
    try {
      const response = await API.post('/auth/send-otp', {
        email,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to send OTP'
      throw new Error(message)
    }
  },

  /**
   * Verify OTP
   */
  async verifyOTP(email, otp) {
    try {
      const response = await API.post('/auth/verify-otp', {
        email,
        otp,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'OTP verification failed'
      throw new Error(message)
    }
  },

  /**
   * Resend OTP
   */
  async resendOTP(email) {
    try {
      const response = await API.post('/auth/resend-otp', {
        email,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to resend OTP'
      throw new Error(message)
    }
  },

  /**
   * Verify email with OTP (legacy - kept for compatibility)
   */
  async verifyEmail(email, otp) {
    try {
      const response = await API.post('/auth/verify-otp', {
        email,
        otp,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Email verification failed'
      throw new Error(message)
    }
  },

  /**
   * Resend verification email (legacy - kept for compatibility)
   */
  async resendVerificationEmail(email) {
    try {
      const response = await API.post('/auth/resend-otp', {
        email,
      })
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to resend verification email'
      throw new Error(message)
    }
  },

  /**
   * Get stored user from localStorage
   */
  getStoredUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Get stored auth token
   */
  getStoredToken() {
    return localStorage.getItem('authToken')
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken')
  },

  /**
   * Check if token is expired
   */
  isTokenExpired() {
    const token = localStorage.getItem('authToken')
    if (!token) return true

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]))
      return decoded.exp * 1000 < Date.now()
    } catch {
      return true
    }
  },
}

export default authService

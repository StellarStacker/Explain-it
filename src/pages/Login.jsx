import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '../store/authStore'

export const Login = () => {
  const navigate = useNavigate()
  const { login, googleLogin, setError, error, isLoading } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const particlesRef = useRef(null)

  // Animated background particles effect
  useEffect(() => {
    const generateParticles = () => {
      if (!particlesRef.current) return
      particlesRef.current.innerHTML = ''

      const particleCount = 60
      const colors = ['#00f5ff', '#bf00ff', '#ff0080', '#9333ea']
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        const size = Math.random() * 3 + 1
        const duration = Math.random() * 25 + 15
        const delay = Math.random() * 5
        const x = Math.random() * 100
        
        particle.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: 100%;
          width: ${size}px;
          height: ${size}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 ${size * 3}px currentColor;
          animation: particle-float ${duration}s linear ${delay}s infinite;
          pointer-events: none;
        `
        
        particlesRef.current.appendChild(particle)
      }
    }

    generateParticles()

    // Add animation keyframes
    if (!document.getElementById('particle-animation-styles')) {
      const style = document.createElement('style')
      style.id = 'particle-animation-styles'
      style.innerHTML = `
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.sin(Math.random() * Math.PI) * 100}px);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!email || !password) {
      setFormError('Please fill in all fields')
      return
    }

    try {
      await login(email, password)
      navigate('/explain-it')
    } catch (err) {
      setFormError(err.message || 'Login failed')
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send the JWT token string to backend for verification
      // Backend will decode and verify it with Google's public keys
      await googleLogin(credentialResponse.credential)
      // Redirect to app on successful login
      navigate('/explain-it')
    } catch (err) {
      setFormError(err.message || 'Google login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Animated Particles Background */}
      <div 
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      ></div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2c1.104 0 2 .896 2 2v2c0 .552.448 1 1 1h3c1.104 0 2 .896 2 2v1c0 1.104.896 2 2 2h1c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1h-1c-1.104 0-2 .896-2 2v3c0 1.104-.896 2-2 2H7c-1.104 0-2-.896-2-2v-3c0-1.104-.896-2-2-2H2c-.552 0-1-.448-1-1v-2c0-.552.448-1 1-1h1c1.104 0 2-.896 2-2V8c0-1.104.896-2 2-2h3c.552 0 1-.448 1-1V4c0-1.104.896-2 2-2z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ExplainIt
          </h1>
          <p className="text-gray-400 mt-2">Welcome back</p>
        </div>
         {/* <marquee behavior="scroll" direction="left" scrollamount="6" style={{
          backgroundColor: '#ffe5e5',
          color: '#b30000',
          padding: '10px',
          fontWeight: 'bold',
        }}>
        ⚠️ Notice: This website is temporarily unavailable due to insufficient Azure credits. Please check back later.
        </marquee> */}

        {/* Login Card */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
          
          {/* Error Message */}
          {(formError || error) && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{formError || error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 disabled:opacity-50"
                  placeholder="you@example.com"
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-3 text-sm text-gray-400">Or continue with</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Google OAuth Button */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setFormError('Google login failed')}
              text="signin_with"
              theme="dark"
              size="large"
            />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

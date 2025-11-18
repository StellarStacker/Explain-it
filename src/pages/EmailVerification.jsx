import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../services/authService'
import { SuccessModal } from '../components/SuccessModal'

export const EmailVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const otpRefs = useRef([])
  const particlesRef = useRef(null)

  const email = location.state?.email || ''
  const registrationData = location.state?.registrationData || null

  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      navigate('/register')
    }
  }, [email, navigate])

  // Timer for resend OTP
  useEffect(() => {
    let interval
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(t => t - 1)
      }, 1000)
    } else if (timer === 0) {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [timer, canResend])

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

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setFormError('Please enter all 6 digits')
      return
    }

    try {
      setIsLoading(true)
      
      // Complete registration after OTP verification
      // This will verify OTP and create the user in database
      const response = await authService.completeRegistration(email, otpCode)
      
      // Store auth data
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // Show success modal instead of immediate redirect
      setShowSuccessModal(true)
    } catch (err) {
      setFormError(err.message || 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setFormError('')
    try {
      setIsResending(true)
      await authService.resendOTP(email)
      setTimer(60)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
      otpRefs.current[0]?.focus()
    } catch (err) {
      setFormError(err.message || 'Failed to resend OTP')
    } finally {
      setIsResending(false)
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
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8z" />
                <path d="M9 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0m4 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0" fill="rgba(0,0,0,0.5)" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
            <p className="text-gray-300 text-sm">
              We've sent a 6-digit code to<br />
              <span className="text-cyan-400 font-semibold">{email}</span>
            </p>
          </div>

          {/* Error Message */}
          {formError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm font-medium">{formError}</p>
            </div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit}>
            {/* OTP Input Fields */}
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => otpRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  maxLength="1"
                  className="w-12 h-14 text-center text-2xl font-bold rounded-lg bg-white/10 dark:bg-slate-800 border-2 border-white/20 dark:border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="0"
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-3">Didn't receive the code?</p>
            {canResend ? (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Resend in <span className="text-cyan-400 font-semibold">{timer}s</span>
              </p>
            )}
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Back to{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          title="Registration Successful!"
          message="Your account has been created. Please login with your email and password."
          onClose={() => navigate('/login')}
        />
      )}
    </div>
  )
}

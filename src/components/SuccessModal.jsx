import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SuccessModal = ({ 
  title = 'Success!', 
  message = 'Operation completed successfully',
  onClose,
  autoCloseDuration = 3000,
  showConfetti = true 
}) => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = React.useState(true)

  useEffect(() => {
    if (showConfetti) {
      createConfetti()
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) {
        onClose()
      }
    }, autoCloseDuration)

    return () => clearTimeout(timer)
  }, [autoCloseDuration, onClose, showConfetti])

  const createConfetti = () => {
    const confettiCount = 50
    const colors = ['#00f5ff', '#bf00ff', '#ff0080', '#9333ea', '#06b6d4', '#ec4899']
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      const size = Math.random() * 10 + 5
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 0.5
      const startX = Math.random() * window.innerWidth
      const rotation = Math.random() * 360
      
      confetti.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 ${size}px currentColor;
        animation: confetti-fall ${duration}s linear ${delay}s forwards;
      `
      
      document.body.appendChild(confetti)
      
      setTimeout(() => confetti.remove(), (duration + delay) * 1000)
    }

    // Add confetti animation if not already present
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style')
      style.id = 'confetti-styles'
      style.innerHTML = `
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-cyan-400/20 animate-in fade-in scale-in duration-300">
        
        {/* Success Icon with Glow */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full p-1 w-20 h-20 flex items-center justify-center">
              <div className="bg-slate-900 rounded-full w-full h-full flex items-center justify-center">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-300 text-center mb-6 text-sm md:text-base leading-relaxed">
          {message}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" style={{
            animation: 'progress 3s ease-out forwards'
          }}></div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            setIsVisible(false)
            if (onClose) onClose()
          }}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50"
        >
          Continue
        </button>

        {/* Sub-message */}
        <p className="text-gray-500 text-center text-xs mt-4">
          Redirecting in a moment...
        </p>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

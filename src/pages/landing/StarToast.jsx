import React, { useState, useEffect } from 'react'

const GITHUB_URL = 'https://github.com/StellarStacker/Explain-it'

const notifications = [
  { name: 'Alex M.', location: 'San Francisco', avatar: '#8b5cf6' },
  { name: 'Priya K.', location: 'Bangalore', avatar: '#06b6d4' },
  { name: 'Jonas W.', location: 'Berlin', avatar: '#10b981' },
  { name: 'Sara L.', location: 'Toronto', avatar: '#f59e0b' },
  { name: 'Ryo T.', location: 'Tokyo', avatar: '#f43f5e' },
  { name: 'Amir H.', location: 'Dubai', avatar: '#818cf8' },
  { name: 'Chioma E.', location: 'Lagos', avatar: '#34d399' },
  { name: 'Lucas B.', location: 'São Paulo', avatar: '#fb923c' },
]

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export const StarToast = () => {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(notifications[0])
  const visibleRef = React.useRef(false)

  const show = (i) => {
    setCurrent(notifications[i])
    setVisible(true)
    visibleRef.current = true
    setTimeout(() => {
      setVisible(false)
      visibleRef.current = false
    }, 6000)
  }

  useEffect(() => {
    let idx = 0
    let intervalId

    // First appearance after 8 seconds, then every 15 seconds
    const firstTimeout = setTimeout(() => {
      show(idx)
      intervalId = setInterval(() => {
        idx = (idx + 1) % notifications.length
        show(idx)
      }, 15000)
    }, 8000)

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(intervalId)
    }
  }, [])

  const dismiss = () => setVisible(false)

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-6 z-[999] transition-all duration-500"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center gap-3 pr-4 pl-3 py-3 rounded-2xl shadow-2xl"
        style={{
          background: 'rgba(15, 10, 30, 0.92)',
          border: '1px solid rgba(251, 191, 36, 0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,191,36,0.1)',
          minWidth: '270px',
          maxWidth: '320px',
        }}
      >
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ background: `radial-gradient(circle at 35% 35%, ${current.avatar}cc, ${current.avatar}55)` }}
        >
          {current.name.charAt(0)}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-white text-sm font-semibold leading-snug">{current.name}</span>
            <span className="text-gray-400 text-xs">from {current.location}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
              <StarIcon />
              <span>just starred</span>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium no-underline"
            >
              <GitHubIcon />
              <span>ExplainIt</span>
            </a>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
          {visible && (
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-b-2xl"
              style={{ animation: 'toast-progress 6s linear forwards' }}
            />
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="flex-shrink-0 ml-1 p-1 rounded-lg text-gray-600 hover:text-gray-400 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'

const GITHUB_URL = 'https://github.com/StellarStacker/Explain-it'

const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show the CTA after a short delay
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('github-star-dismissed')) {
        setVisible(true)
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('github-star-dismissed', 'true')
  }

  if (dismissed) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[999] transition-all duration-500"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex flex-col p-4 rounded-2xl shadow-2xl relative"
        style={{
          background: 'rgba(15, 10, 30, 0.92)',
          border: '1px solid rgba(251, 191, 36, 0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,191,36,0.1)',
          width: '300px',
        }}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-4 mt-1">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-amber-500/20 text-amber-400">
            <StarIcon />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white text-sm font-semibold mb-1 pr-6">Find ExplainIt helpful?</h4>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              Show your support by giving us a star on GitHub! It helps others discover the project.
            </p>
            
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600 rounded-lg text-xs font-semibold text-white transition-all no-underline w-max shadow-sm"
            >
              <GitHubIcon />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

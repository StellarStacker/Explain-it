import React, { useState, useEffect } from 'react'

const REPO = 'StellarStacker/Explain-it'
const GITHUB_URL = `https://github.com/${REPO}`

const GitHubStarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export const StarSection = () => {
  const [starCount, setStarCount] = useState(null)
  const [starred, setStarred] = useState(false)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then(r => r.json())
      .then(d => { if (d.stargazers_count != null) setStarCount(d.stargazers_count) })
      .catch(() => {})
  }, [])

  const handleStar = () => {
    setStarred(true)
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div
          className="rounded-2xl border border-amber-500/20 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.05) 0%, rgba(15,10,30,0.6) 40%, rgba(251,191,36,0.04) 100%)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Top bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            {/* Left: icon + text */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <GitHubIcon className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Open Source</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
                Built in the open.{' '}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Powered by the community.
                </span>
              </h2>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                ExplainIt is open-source. If it saved you time or sparked an idea, a star on GitHub helps others discover it and keeps the project alive.
              </p>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-5 justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {['#8b5cf6','#06b6d4','#f59e0b','#10b981','#f43f5e'].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: `radial-gradient(circle at 40% 35%, ${c}cc, ${c}66)` }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  Join the contributors shaping this project
                </span>
              </div>
            </div>

            {/* Right: star button */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <button
                onClick={handleStar}
                className="star-btn group relative flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300 overflow-hidden"
                style={{
                  background: starred
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(217,119,6,0.15))',
                  border: starred ? '1px solid #f59e0b80' : '1px solid rgba(251,191,36,0.35)',
                  color: starred ? '#fff' : '#fbbf24',
                  boxShadow: starred ? '0 0 30px rgba(251,191,36,0.3)' : '0 0 0px rgba(251,191,36,0)',
                }}
              >
                {/* Shimmer on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s linear infinite',
                  }}
                />

                <GitHubIcon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">
                  {starred ? 'Starred — Thank you!' : 'Star on GitHub'}
                </span>
                <GitHubStarIcon className={`w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-125 ${starred ? 'text-yellow-200' : 'text-amber-400'}`} />
              </button>

              {/* Star count badge */}
              {starCount !== null && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <GitHubStarIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    <span className="font-bold text-amber-400">{starCount.toLocaleString()}</span>
                    {' '}stars and counting
                  </span>
                </div>
              )}

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2"
              >
                View source on GitHub
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

const techStack = [
  { name: 'JavaScript ES6+', color: '#F7DF1E' },
  { name: 'React 18', color: '#61DAFB' },
  { name: 'Spring Boot', color: '#6DB33F' },
  { name: 'Tailwind CSS', color: '#38B2AC' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'Google Gemini', color: '#4285F4' },
  { name: 'Zustand', color: '#F59E0B' },
  { name: 'Axios', color: '#5A29E4' },
]

export const TechSection = () => (
  <section id="tech" className="py-24 px-4 relative">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Technology</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Built with Modern Tech</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-12">Enterprise-grade architecture powered by industry-leading tools and frameworks.</p>

      <div className="flex flex-wrap justify-center gap-3 mb-20">
        {techStack.map((t, i) => (
          <div key={i} className="tech-badge">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export const CTASection = () => (
  <section className="py-24 px-4 relative">
    <div className="max-w-3xl mx-auto text-center">
      <div className="rounded-3xl p-12 md:p-16 relative overflow-hidden backdrop-blur-xl bg-white/[0.06] dark:bg-white/[0.06] border border-white/10 shadow-2xl" style={{ boxShadow: '0 0 80px rgba(139,92,246,0.15)' }}>
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-600/25 rounded-full blur-3xl" />

        <div className="relative z-10">
          <svg className="w-12 h-12 mx-auto mb-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Simplify?</h2>
          <p className="text-gray-300 dark:text-gray-300 mb-8 max-w-md mx-auto">Join thousands of users who decode complex language daily. Start for free today.</p>
          <Link to="/login" className="landing-cta">
            <span>Get Started Free</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export const LandingFooter = () => (
  <footer className="py-12 px-4 border-t border-white/5">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/explainit.png" alt="ExplainIt" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold text-slate-800 dark:text-white/80">ExplainIt</span>
          <span className="text-gray-600 text-sm">by Minus One Enterprise</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/StellarStacker/Explain-it" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
        <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} ExplainIt. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

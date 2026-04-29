import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const LandingNav = ({ isDark, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/explainit.png" alt="ExplainIt" className="w-9 h-9 rounded-lg" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ExplainIt
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('features')} className="nav-link bg-transparent border-none cursor-pointer">Features</button>
          <button onClick={() => scrollTo('how-it-works')} className="nav-link bg-transparent border-none cursor-pointer">How It Works</button>
          <button onClick={() => scrollTo('demo')} className="nav-link bg-transparent border-none cursor-pointer">Demo</button>
          <button onClick={() => scrollTo('tech')} className="nav-link bg-transparent border-none cursor-pointer">Tech Stack</button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all" title="Toggle theme">
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v3m0 16v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M4.22 19.78l2.12-2.12M18.36 5.64l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            ) : (
              <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>

          <Link to="/login" className="hidden md:inline-flex px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-violet-600 text-white no-underline hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5">
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10" aria-label="Menu">
            <svg className="w-5 h-5 text-gray-300 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 p-4 rounded-2xl landing-glass">
          <div className="flex flex-col gap-3">
            <button onClick={() => scrollTo('features')} className="nav-link bg-transparent border-none cursor-pointer text-left py-2">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="nav-link bg-transparent border-none cursor-pointer text-left py-2">How It Works</button>
            <button onClick={() => scrollTo('demo')} className="nav-link bg-transparent border-none cursor-pointer text-left py-2">Demo</button>
            <button onClick={() => scrollTo('tech')} className="nav-link bg-transparent border-none cursor-pointer text-left py-2">Tech Stack</button>
            <Link to="/login" className="mt-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-violet-600 text-white text-center no-underline">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

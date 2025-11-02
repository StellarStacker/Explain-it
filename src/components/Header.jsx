import React from 'react'

export const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="text-center py-12 relative">
      {/* Theme Toggle */}
      <div className="absolute top-0 right-0 md:right-8 p-2">
        <button 
          onClick={onThemeToggle}
          className="p-2 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full hover:bg-white/40 dark:hover:bg-white/20 transition-all duration-300 group"
          aria-label="Toggle theme"
        >
          {/* Sun icon (for dark mode) */}
          <svg 
            className={`w-6 h-6 text-yellow-500 ${theme === 'light' ? 'hidden' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          {/* Moon icon (for light mode) */}
          <svg 
            className={`w-6 h-6 text-gray-700 dark:text-gray-300 ${theme === 'dark' ? 'hidden' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Logo and Title */}
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <h1 className="relative text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          ExplainIt
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-xl text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto px-4 leading-relaxed">
        Transform complex jargon into simple, understandable language
        <span className="text-cyan-600 dark:text-cyan-400 font-medium"> instantly</span>
      </p>
    </header>
  )
}

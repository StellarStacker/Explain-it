import React from 'react'

export const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="text-center py-6 md:py-12 relative md:pt-12 pt-32">
      {/* Logo and Title */}
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <h1 className="relative text-4xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          ExplainIt
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4 md:mt-6 max-w-2xl mx-auto px-4 leading-relaxed">
        Transform complex jargon into simple, understandable language
        <span className="text-cyan-600 dark:text-cyan-400 font-medium"> instantly</span>
      </p>
    </header>
  )
}

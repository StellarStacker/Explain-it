import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useAuthStore } from '../store/authStore'
import { useTheme } from '../hooks/useTheme'
import App from '../App'

export const AppLayout = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const { isDark, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Fixed UI Elements rendered via Portal to bypass relative positioning */}
      {createPortal(
        <>
          {/* Dark/Light Mode Toggle - Top Left - Professional Transparent - TRULY FIXED - Responsive */}
          <button
            onClick={toggleTheme}
            className="fixed md:top-6 md:left-6 top-3 left-3 z-50 p-2 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/15 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/40 dark:hover:border-white/25 transition-all duration-300 shadow-lg hover:shadow-xl group pointer-events-auto flex items-center justify-center"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-300 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m5.08-5.08l4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-300 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.64 15.95a.75.75 0 0 0-.5-.9A8.05 8.05 0 0 1 9.95 2.86a.75.75 0 0 0-.9-.5.75.75 0 0 0-.5.9 9.5 9.5 0 1 0 14.59 5.19.75.75 0 0 0 .4-.9z" />
              </svg>
            )}
          </button>

          {/* Compact Profile Box - Top Right - Transparent & Professional - TRULY FIXED - RESPONSIVE */}
          <div
            className="fixed md:top-6 md:right-6 top-3 right-3 z-50 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-1.5 md:p-3 border border-white/20 dark:border-white/15 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 group pointer-events-auto flex items-center"
            aria-label="user-profile-box"
          >
            {user && (
              <div className="flex items-center gap-2 md:gap-3">
                {/* Avatar - Only show Google profile picture for Google users */}
                {user.provider === 'google' && user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.firstName || user.email}
                    className="w-8 md:w-9 h-8 md:h-9 rounded-full object-cover border border-cyan-400/60 shadow-md flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center border border-cyan-400/60 shadow-md flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {(user.firstName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                    </span>
                  </div>
                )}
                
                {/* User Info - Hidden on mobile, shown on md+ */}
                <div className="hidden md:flex flex-col gap-0 min-w-0">
                  <p className="text-xs text-white/70 font-medium uppercase tracking-wider">Welcome</p>
                  <p className="text-sm font-semibold text-cyan-300 truncate max-w-[110px]">
                    {user.firstName ? `${user.firstName}` : user.email?.split('@')[0] || 'User'}
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex-shrink-0 px-2 py-1 bg-red-600/80 hover:bg-red-600 border border-red-500/60 hover:border-red-500 rounded-md text-white text-xs font-semibold transition-all duration-200 hover:shadow-lg whitespace-nowrap"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </>,
        document.body
      )}

      <div className="w-full min-h-screen">
        <App />
      </div>
    </>
  )
}

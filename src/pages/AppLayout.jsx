import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useAuthStore } from '../store/authStore'
import { useTheme } from '../hooks/useTheme'
import App from '../App'

export const AppLayout = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Fixed UI Elements rendered via Portal to bypass relative positioning */}
      {createPortal(
        <>
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

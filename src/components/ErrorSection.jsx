import React from 'react'

export const ErrorSection = ({ error, onRetry }) => {
  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 animate-fade-in">
      <div className="bg-red-500/10 dark:bg-red-900/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-red-500/30 dark:border-red-900/30">
        <div className="text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4v2m0 0v2m0 0v2m-9-11h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2z"></path>
            </svg>
          </div>

          {/* Error Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>

          {/* Error Message */}
          <p className="text-red-600 dark:text-red-300 mb-4">
            {error}
          </p>

          {/* Retry Button */}
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300/80 dark:hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-200 flex items-center mx-auto gap-2 text-gray-700 dark:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

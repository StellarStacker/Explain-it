import React from 'react'

export const InputSection = ({ 
  input, 
  onInputChange, 
  onExplain, 
  isLoading,
  maxLength 
}) => {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      onExplain()
    }
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4">
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 hover:shadow-cyan-500/20 hover:shadow-2xl transition-shadow duration-300">
        {/* Input Label */}
        <label 
          htmlFor="jargon-input" 
          className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Paste your complex text here:
        </label>

        {/* Textarea */}
        <div className="relative">
          <textarea
            id="jargon-input"
            rows="6"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-6 py-4 bg-white/90 dark:bg-black/30 border-2 border-gray-300 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 resize-none transition-all duration-300"
            placeholder="Enter the complex text you want simplified... For example: 'The implementation leverages a microservices architecture with containerized deployments orchestrated through Kubernetes, utilizing asynchronous message queuing patterns for inter-service communication.'"
            disabled={isLoading}
          ></textarea>

          {/* Character Count */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-600 dark:text-gray-500 font-medium">
            {input.length}/{maxLength}
          </div>
        </div>

        {/* Explain Button */}
        <button
          id="explain-btn"
          onClick={onExplain}
          disabled={isLoading || !input.trim()}
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/50 disabled:shadow-none group relative overflow-hidden"
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500" style={{ transform: 'translateX(-100%)' }}></div>
          
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              {/* Professional Brain/AI Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c1.104 0 2 .896 2 2v2c0 .552.448 1 1 1h3c1.104 0 2 .896 2 2v1c0 1.104.896 2 2 2h1c.552 0 1 .448 1 1v2c0 .552-.448 1-1 1h-1c-1.104 0-2 .896-2 2v3c0 1.104-.896 2-2 2H7c-1.104 0-2-.896-2-2v-3c0-1.104-.896-2-2-2H2c-.552 0-1-.448-1-1v-2c0-.552.448-1 1-1h1c1.104 0 2-.896 2-2V8c0-1.104.896-2 2-2h3c.552 0 1-.448 1-1V4c0-1.104.896-2 2-2z"></path>
                <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
              </svg>
              Explain It
            </>
          )}
        </button>
      </div>
    </div>
  )
}

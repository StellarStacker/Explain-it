import React from 'react'

export const LoadingSection = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 animate-fade-in">
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
        <div className="text-center">
          <div>
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">AI is working its magic...</p>
            <div className="relative w-full h-1 bg-slate-300/30 dark:bg-slate-700/30 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-pulse" style={{
                animation: 'slide 2s infinite',
                width: '30%'
              }}></div>
            </div>
          </div>

          {/* Loading animation styles */}
          <style>{`
            @keyframes slide {
              0%, 100% { left: 0; }
              50% { left: 70%; }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}</style>

                <div className="text-center space-y-4">
          <br></br>
        <h3 className="text-1.5xl text-slate-900 dark:text-slate-200">
          Converting complex jargon into simple, clear language that anyone can understand
        </h3>
        <br></br>
      </div>

          {/* Animated dots */}
          <div className="mt-6 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                style={{
                  animation: `bounce 1.4s infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0);
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}

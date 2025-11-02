import React, { useEffect, useRef } from 'react'

export const BackgroundEffects = () => {
  const particlesRef = useRef(null)

  useEffect(() => {
    const generateParticles = () => {
      if (!particlesRef.current) return

      const particleCount = 50
      const colors = ['#00f5ff', '#bf00ff', '#ff0080']
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        const size = Math.random() * 3 + 1
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5
        
        particle.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          opacity: ${Math.random() * 0.5 + 0.3};
          animation: float ${duration}s linear ${delay}s infinite;
          box-shadow: 0 0 ${size * 2}px currentColor;
        `
        
        particlesRef.current.appendChild(particle)
      }
    }

    generateParticles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient Overlay - Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-blue-50/80 to-slate-50 dark:from-slate-900 dark:via-purple-900/80 dark:to-slate-900 opacity-90 dark:opacity-80 transition-all duration-500"></div>

      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30 transition-opacity duration-500" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-0 dark:opacity-30 transition-opacity duration-500" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-indigo-300/20 dark:bg-purple-600/20 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-blue-300/20 dark:bg-cyan-500/20 rounded-full blur-3xl transition-colors duration-500"></div>

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {/* Particles will be generated dynamically by JS */}
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

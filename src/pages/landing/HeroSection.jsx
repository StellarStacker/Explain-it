import React from 'react'
import { Link } from 'react-router-dom'

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
    {/* Orbs */}
    <div className="landing-orb landing-orb-1" />
    <div className="landing-orb landing-orb-2" />
    <div className="landing-orb landing-orb-3" />

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8" style={{ animation: 'slide-up 0.6s ease forwards' }}>
        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <span className="text-sm font-medium text-purple-300 dark:text-purple-300">Powered by Google Gemini AI</span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6" style={{ animation: 'slide-up 0.8s ease forwards' }}>
        <span className="text-slate-900 dark:text-white">Decode Any</span>
        <br />
        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Complex Jargon
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animation: 'slide-up 1s ease forwards' }}>
        Transform dense technical language, academic terminology, and industry-specific text into clear, beginner-friendly explanations instantly.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animation: 'slide-up 1.2s ease forwards' }}>
        <Link to="/login" className="landing-cta">
          <span>Start Simplifying</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </Link>
        <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="landing-cta-secondary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>See Demo</span>
        </button>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto" style={{ animation: 'slide-up 1.4s ease forwards' }}>
        {[
          { value: '10K+', label: 'Texts Simplified' },
          { value: '<10s', label: 'Avg Response' },
          { value: '50+', label: 'Fields Covered' },
          { value: '99.9%', label: 'Uptime' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</div>
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

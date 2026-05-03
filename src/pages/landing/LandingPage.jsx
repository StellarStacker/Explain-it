import React, { useEffect, useRef } from 'react'
import { LandingNav } from './LandingNav'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { HowItWorksSection } from './HowItWorksSection'
import { DemoSection } from './DemoSection'
import { TechSection, CTASection, LandingFooter } from './BottomSections'
import { StarSection } from './StarSection'
import { StarToast } from './StarToast'
import '../LandingPage.css'

export const LandingPage = () => {
  const sectionsRef = useRef([])

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = document.querySelectorAll('.reveal-section')
    sections.forEach((s) => observer.observe(s))

    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  return (
    <div className="landing-page dark">
      <div className="landing-hero-bg min-h-screen">
        <LandingNav />

        <HeroSection />

        <div className="section-divider" />

        <div className="reveal-section">
          <FeaturesSection />
        </div>

        <div className="section-divider" />

        <div className="reveal-section">
          <HowItWorksSection />
        </div>

        <div className="section-divider" />

        <div className="reveal-section">
          <DemoSection />
        </div>

        <div className="section-divider" />

        <div className="reveal-section">
          <StarSection />
        </div>

        <div className="section-divider" />

        <div className="reveal-section">
          <TechSection />
        </div>

        <div className="reveal-section">
          <CTASection />
        </div>

        <LandingFooter />
      </div>

      {/* LinkedIn-style star notification toast */}
      <StarToast />
    </div>
  )
}

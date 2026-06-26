// ============================================
// HowItWorks - Step-by-step guide cards with
//               scroll-triggered reveal animation
// ============================================

import { useRef, useEffect, useState } from 'react'
import './HowItWorks.css'

// ── Static steps data ──
const steps = [
  {
    number: '01',
    title: 'Login',
    description: 'Sign in with your student or faculty credentials to access the platform.'
  },
  {
    number: '02',
    title: 'Explore Dashboard',
    description: 'Get an overview of notices, upcoming events, and personalized updates.'
  },
  {
    number: '03',
    title: 'Access Campus Services',
    description: 'Use features like complaints, lost & found, study hub, and event registration.'
  },
  {
    number: '04',
    title: 'Stay Updated',
    description: 'Receive real-time notifications and stay connected with campus life.'
  }
]

export default function HowItWorks() {
  // ── State: triggers visibility animation once ──
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  // ── IntersectionObserver: reveals all steps when section enters viewport ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="how-section" id="about">
      <div className="how-container">
        {/* ── Section header ── */}
        <div className="section-header">
          <span className="section-badge">How It Works</span>
          <h2 className="section-title">Get Started in Minutes</h2>
          <p className="section-desc">
            Simple steps to unlock the full power of Campus360.
          </p>
        </div>
        {/* ── Steps grid ── */}
        <div className="steps-grid" ref={ref}>
          {steps.map((step, index) => (
            <div key={index} className={`step-card ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
              <span className="step-number">{step.number}</span>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// Testimonials - Student testimonial cards with
//                 scroll-triggered reveal animation
// ============================================

import { useRef, useEffect, useState } from 'react'
import './Testimonials.css'

// ── Static testimonials data ──
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Computer Science Student',
    avatar: 'PS',
    text: 'Campus360 has completely transformed how I stay updated with college events and notices. The dashboard is incredibly intuitive!'
  },
  {
    name: 'Rahul Verma',
    role: 'Electrical Engineering Student',
    avatar: 'RV',
    text: 'The complaint system is a game-changer. I can track issues in real-time and the response time has improved significantly.'
  },
  {
    name: 'Ananya Patel',
    role: 'MBA Student',
    avatar: 'AP',
    text: 'Lost & Found feature helped me recover my laptop within hours. The study hub is also an excellent resource for exam prep.'
  }
]

export default function Testimonials() {
  // ── State: triggers one-time reveal animation ──
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  // ── IntersectionObserver: reveals cards when section enters viewport ──
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
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* ── Section header ── */}
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Students Say</h2>
          <p className="section-desc">
            Hear from students who use Campus360 every day.
          </p>
        </div>
        {/* ── Testimonials grid ── */}
        <div className="testimonials-grid" ref={ref}>
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

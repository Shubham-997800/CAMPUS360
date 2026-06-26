// ============================================
// Hero - Landing page hero section with CTA,
//         decorative shapes, and stats row
// ============================================

import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      {/* ── Decorative background shapes for visual depth ── */}
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-container">
        {/* ── Badge label ── */}
        <div className="hero-badge">Smart Campus Management</div>

        {/* ── Main heading with accent span ── */}
        <h1 className="hero-title">
          Smart Campus. <span className="hero-title-accent">Smarter Students.</span>
        </h1>

        {/* ── Sub-headline description ── */}
        <p className="hero-subtitle">
          A centralized platform to manage notices, events, complaints, lost & found, study resources, and student services.
        </p>

        {/* ── Call-to-action buttons ── */}
        <div className="hero-cta">
          <a href="#get-started" className="btn btn-primary">Get Started</a>
          <a href="#login" className="btn btn-secondary">Login</a>
        </div>

        {/* ── Quick stats row (students, events, 24/7 access) ── */}
        <div className="hero-stats-row">
          <div className="hero-stat">
            <span className="hero-stat-number">5000+</span>
            <span className="hero-stat-label">Students</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">100+</span>
            <span className="hero-stat-label">Events</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">24/7</span>
            <span className="hero-stat-label">Access</span>
          </div>
        </div>
      </div>
    </section>
  )
}

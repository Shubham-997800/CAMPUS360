import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-container">
        <div className="hero-badge">Smart Campus Management</div>
        <h1 className="hero-title">
          Smart Campus. <span className="hero-title-accent">Smarter Students.</span>
        </h1>
        <p className="hero-subtitle">
          A centralized platform to manage notices, events, complaints, lost & found, study resources, and student services.
        </p>
        <div className="hero-cta">
          <a href="#get-started" className="btn btn-primary">Get Started</a>
          <a href="#login" className="btn btn-secondary">Login</a>
        </div>
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

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="white" />
          </svg>
          <span>Campus<span className="logo-accent">360</span></span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <Link to="/login" className="nav-login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

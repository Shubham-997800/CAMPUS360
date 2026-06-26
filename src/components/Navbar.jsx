import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogIn } from 'lucide-react'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  function handleNavClick(id) {
    setOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    scrollToSection(id)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-100/50 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900 hover:opacity-85 transition-opacity">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="white" />
          </svg>
          <span>Campus<span className="text-blue-600">360</span></span>
        </Link>

        <div className={`fixed top-16 left-0 right-0 bg-white/98 backdrop-blur-lg flex-col p-6 gap-5 border-b border-gray-200 transition-all duration-400 md:static md:flex-row md:bg-transparent md:p-0 md:border-0 md:gap-8 md:flex md:items-center md:translate-y-0 md:opacity-100 md:pointer-events-auto ${open ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => handleNavClick(l.id)} className="text-left text-gray-900 font-medium text-[15px] relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-blue-600 md:after:bottom-[-4px] cursor-pointer">{l.label}</button>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="text-blue-600 font-semibold md:hidden">Dashboard</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-1.5 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:-translate-y-0.5 hover:shadow-md md:ml-0">
            <LogIn size={16} /> Login
          </Link>
          <Link to="/register" onClick={() => setOpen(false)} className="text-sm font-semibold text-gray-600 hover:text-blue-600 md:hidden">Create Account</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="p-1 text-gray-900 md:hidden" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}

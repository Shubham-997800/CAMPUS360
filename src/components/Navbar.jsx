import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleNavClick(id) {
    setOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    scrollToSection(id)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-gray-900/85 backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-gray-900 dark:text-white hover:opacity-85 transition-opacity shrink-0">
          <Logo size={32} />
          <span>Nex<span className="text-[#6C5CE7] dark:text-[#7C5CFF]">Campus</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => handleNavClick(l.id)} className="text-gray-600 dark:text-gray-300 font-medium text-[15px] relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-[#6C5CE7] dark:after:bg-[#7C5CFF] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] cursor-pointer">{l.label}</button>
          ))}
          <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 font-medium text-[15px] hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] transition-colors">Dashboard</Link>
          <Link to="/register" className="text-sm font-semibold text-gray-500 dark:text-[#94A3B8] hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] transition-colors">Register</Link>
          <Link to="/login" className="flex items-center gap-1.5 bg-[#6C5CE7] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all hover:-translate-y-0.5 hover:shadow-md">
            <LogIn size={16} /> Login
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={toggle} className="p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer" aria-label="Toggle theme">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setOpen(!open)} className="p-1 text-gray-900 dark:text-white md:hidden" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && <div className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm md:hidden z-40" onClick={() => setOpen(false)} />}

      <div className={`fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl md:hidden z-50 transition-all duration-300 overflow-hidden ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => handleNavClick(l.id)} className="text-left text-gray-900 dark:text-white font-medium text-[15px] hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] transition-colors py-1 cursor-pointer">{l.label}</button>
          ))}
          <hr className="border-gray-100 dark:border-gray-800" />
          <Link to="/dashboard" onClick={() => setOpen(false)} className="text-gray-900 dark:text-white font-medium hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] transition-colors py-1">Dashboard</Link>
          <Link to="/register" onClick={() => setOpen(false)} className="text-gray-500 dark:text-[#94A3B8] font-medium hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] transition-colors py-1">Create Account</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-1.5 bg-[#6C5CE7] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all mt-2">
            <LogIn size={16} /> Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

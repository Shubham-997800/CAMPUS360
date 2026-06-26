import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import './Login.css'

const DUMMY_USERS = [
  { email: 'shubham@campus360.edu', password: 'password123', name: 'Shubham' },
  { email: 'admin@campus360.edu', password: 'admin123', name: 'Admin' },
  { email: 'student@campus360.edu', password: 'student123', name: 'Student' },
]

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (submitError) setSubmitError('')
  }

  function validate() {
    const errs = {}
    if (!form.email) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!form.password) {
      errs.password = 'Password is required'
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setSubmitError('')
    setTimeout(() => {
      const user = DUMMY_USERS.find(
        (u) => u.email === form.email && u.password === form.password
      )
      if (user) {
        navigate('/dashboard')
      } else {
        setLoading(false)
        setSubmitError('Invalid email or password. Please try again.')
      }
    }, 1200)
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-content">
          <Link to="/" className="login-left-logo">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="white" />
              <path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="#2563EB" />
            </svg>
            <span>Campus<span className="logo-accent">360</span></span>
          </Link>

          <div className="login-illustration">
            <svg viewBox="0 0 400 300" fill="none" className="floating-illustration">
              <circle cx="200" cy="160" r="120" fill="rgba(255,255,255,0.06)" />
              <rect x="80" y="100" width="60" height="80" rx="6" fill="rgba(255,255,255,0.15)" />
              <rect x="85" y="105" width="50" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="85" y="118" width="50" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="85" y="131" width="50" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="260" y="80" width="60" height="100" rx="6" fill="rgba(255,255,255,0.15)" />
              <rect x="265" y="85" width="50" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="265" y="98" width="50" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="265" y="111" width="50" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
              <circle cx="200" cy="200" r="8" fill="rgba(255,255,255,0.2)" />
              <circle cx="180" cy="210" r="6" fill="rgba(255,255,255,0.15)" />
              <circle cx="220" cy="208" r="6" fill="rgba(255,255,255,0.15)" />
              <path d="M140 220 Q200 240 260 220" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
              <circle cx="160" cy="140" r="4" fill="rgba(255,255,255,0.25)" />
              <circle cx="240" cy="120" r="4" fill="rgba(255,255,255,0.25)" />
              <circle cx="300" cy="150" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="100" cy="170" r="3" fill="rgba(255,255,255,0.2)" />
              <rect x="150" y="60" width="100" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
            </svg>
          </div>

          <h1 className="login-left-title">Welcome to Campus360</h1>
          <p className="login-left-desc">
            Manage your entire campus experience from one place.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Sign In</h2>
            <p className="login-card-desc">Enter your credentials to access your account</p>
          </div>

          {submitError && (
            <div className="login-error-banner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@university.edu"
              error={errors.email}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="remember-checkmark"></span>
                <span>Remember me</span>
              </label>
              <a href="#" className="login-forgot">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className={`login-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-divider">
            <span></span>
            <span className="login-divider-text">OR</span>
            <span></span>
          </div>

          <button className="google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="login-signup">
            Don't have an account? <a href="#">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  )
}

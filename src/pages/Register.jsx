import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (submitError) setSubmitError('')
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Min 6 characters'
    if (!form.confirmPassword) errs.confirmPassword = 'Confirm your password'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
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
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full"><circle cx="200" cy="160" r="120" fill="white" /><rect x="80" y="100" width="60" height="80" rx="6" fill="white" /><rect x="85" y="105" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="85" y="118" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="85" y="131" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="260" y="80" width="60" height="100" rx="6" fill="white" /><rect x="265" y="85" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="265" y="98" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="265" y="111" width="50" height="8" rx="2" fill="white" opacity="0.7" /></svg>
        </div>
        <div className="relative z-10 text-center text-white">
          <Link to="/" className="inline-flex items-center gap-2.5 text-white text-xl font-bold mb-8">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="white" /><path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="#2563EB" /></svg>
            <span>Campus<span className="text-blue-200">360</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold mb-3">Join Campus360!</h1>
          <p className="text-blue-100 max-w-sm mx-auto">Create your account and start managing your campus life.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-bold text-gray-900 mb-6 lg:hidden">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#2563EB" /><path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="white" /></svg>
            Campus<span className="text-blue-600">360</span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in the details to get started.</p>

          {submitError && (
            <div className="flex items-center gap-2.5 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5">
              <AlertCircle size={18} /> <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                <User size={18} className="text-gray-400 shrink-0" />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 placeholder:text-gray-400" />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                <Mail size={18} className="text-gray-400 shrink-0" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@university.edu" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 placeholder:text-gray-400" />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                <Lock size={18} className="text-gray-400 shrink-0" />
                <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                <Lock size={18} className="text-gray-400 shrink-0" />
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 placeholder:text-gray-400" />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-70 cursor-pointer">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : <><CheckCircle2 size={18} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

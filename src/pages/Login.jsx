import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import Logo from '../components/Logo'

const DUMMY_USERS = [
  { email: 'student@nexcampus.edu', password: 'student123', name: 'Rahul', role: 'Student' },
  { email: 'admin@nexcampus.edu', password: 'admin123', name: 'Admin', role: 'Admin' },
]

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
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
    if (!form.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Min 6 characters'
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
      const user = DUMMY_USERS.find(u => u.email === form.email && u.password === form.password)
      if (user) navigate('/dashboard', { state: { user } })
      else { setLoading(false); setSubmitError('Invalid email or password.') }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex animate-fadeIn">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#6C5CE7] dark:from-[#7C5CFF] to-purple-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full"><circle cx="200" cy="160" r="120" fill="white" /><rect x="80" y="100" width="60" height="80" rx="6" fill="white" /><rect x="85" y="105" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="85" y="118" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="85" y="131" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="260" y="80" width="60" height="100" rx="6" fill="white" /><rect x="265" y="85" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="265" y="98" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="265" y="111" width="50" height="8" rx="2" fill="white" opacity="0.7" /></svg>
        </div>
        <div className="relative z-10 text-center text-white">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <Logo className="h-9 w-auto" />
          </Link>
          <h1 className="text-3xl font-extrabold mb-3">Welcome Back!</h1>
          <p className="text-white/80 max-w-sm mx-auto">Manage your entire campus experience from one place.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 dark:bg-[#0F172A]">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10 lg:hidden">
            <Logo className="h-8 w-auto" />
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 dark:text-[#94A3B8] mb-6">Enter your credentials to access your account.</p>

          {submitError && (
            <div className="flex items-center gap-2.5 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5 dark:bg-red-950/40">
              <AlertCircle size={18} /> <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-[#6C5CE7]/20 focus-within:border-[#6C5CE7] ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 dark:border-white/10'} dark:bg-gray-800`}>
                <Mail size={18} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@university.edu" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-[#6C5CE7]/20 focus-within:border-[#6C5CE7] ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 dark:border-white/10'} dark:bg-gray-800`}>
                <Lock size={18} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 cursor-pointer">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#6C5CE7] focus:ring-[#6C5CE7]" /> Remember me
              </label>
              <span className="text-[#6C5CE7] dark:text-[#7C5CFF] font-medium cursor-default">Forgot Password?</span>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-violet-700 hover:to-cyan-600 dark:from-violet-500 dark:to-cyan-400 dark:hover:from-violet-600 dark:hover:to-cyan-500 transition-all disabled:opacity-70 cursor-pointer">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:border-white/10" />
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:border-white/10" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all cursor-pointer dark:bg-[#1E293B] dark:border-white/10 dark:text-gray-300 dark:hover:bg-gray-800">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            Continue with Google
          </button>

          <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 dark:bg-gray-800 dark:border-white/10 dark:text-gray-400">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Demo Credentials:</p>
            {DUMMY_USERS.map(u => (
              <div key={u.email} className="flex items-center gap-2 mb-1 last:mb-0">
                <span className={`w-1.5 h-1.5 rounded-full ${u.role === 'Student' ? 'bg-blue-500' : 'bg-green-500'}`} />
                <span className="font-medium">{u.role}:</span>
                <span>{u.email}</span>
                <span className="text-gray-400">/ {u.password}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-[#94A3B8] mt-4">Don't have an account? <Link to="/register" className="text-[#6C5CE7] dark:text-[#7C5CFF] font-medium hover:underline">Create Account</Link></p>
        </div>
      </div>
    </div>
  )
}

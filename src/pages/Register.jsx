import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import Logo from '../components/Logo'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', role: 'Student', password: '', confirmPassword: '' })
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
    if (!form.role) errs.role = 'Select a role'
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
    <div className="min-h-screen flex bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-x-hidden animate-fadeIn">
      <div className="hidden lg:flex w-1/2 bg-[#6C5CE7] dark:bg-[#7C5CFF] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full"><circle cx="200" cy="160" r="120" fill="white" /><rect x="80" y="100" width="60" height="80" rx="6" fill="white" /><rect x="85" y="105" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="85" y="118" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="85" y="131" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="260" y="80" width="60" height="100" rx="6" fill="white" /><rect x="265" y="85" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="265" y="98" width="50" height="8" rx="2" fill="white" opacity="0.7" /><rect x="265" y="111" width="50" height="8" rx="2" fill="white" opacity="0.7" /></svg>
        </div>
        <div className="relative z-10 text-center text-white">
          <Link to="/" className="inline-flex items-center gap-2.5 text-white text-xl font-bold mb-8">
            <Logo size={36} inverted />
            <span>Nex<span className="text-white/70">Campus</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold mb-3">Join NexCampus!</h1>
          <p className="text-white/80 max-w-sm mx-auto">Create your account and start managing your campus life.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 dark:bg-[#0F172A]">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-bold text-gray-900 dark:text-white mb-6 lg:hidden">
            <Logo size={32} />
            <span>Nex<span className="text-[#6C5CE7] dark:text-[#7C5CFF]">Campus</span></span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create Account</h2>
          <p className="text-sm text-gray-500 dark:text-[#94A3B8] mb-6">Fill in the details to get started.</p>

          {submitError && (
            <div className="flex items-center gap-2.5 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5 dark:bg-red-950/40">
              <AlertCircle size={18} /> <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-[#6C5CE7]/20 focus-within:border-[#6C5CE7] ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 dark:border-white/10'} dark:bg-gray-800`}>
                <User size={18} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Role</label>
              <select name="role" value={form.role} onChange={handleChange} className={`w-full border ${errors.role ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} bg-gray-50 rounded-xl px-3.5 py-3 text-sm text-gray-900 outline-none focus:border-[#6C5CE7] transition-all dark:bg-gray-800 dark:text-white`}>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && <p className="text-xs text-red-500 mt-1.5">{errors.role}</p>}
            </div>

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
                <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 cursor-pointer">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
              <div className={`flex items-center gap-3 bg-gray-50 border rounded-xl px-3.5 transition-all focus-within:ring-2 focus-within:ring-[#6C5CE7]/20 focus-within:border-[#6C5CE7] ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200 dark:border-white/10'} dark:bg-gray-800`}>
                <Lock size={18} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#6C5CE7] text-white py-3 rounded-xl font-semibold hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all disabled:opacity-70 cursor-pointer">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : <><CheckCircle2 size={18} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-[#94A3B8] mt-6">Already have an account? <Link to="/login" className="text-[#6C5CE7] dark:text-[#7C5CFF] font-medium hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

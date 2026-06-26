import { Link } from 'react-router-dom'
import { Bell, CalendarDays, MessageSquareWarning, PackageSearch, UserRound, CheckCircle2, Sparkles, BookOpen, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'

const FEATURES = [
  { icon: Bell, title: 'Notice Board', desc: 'Real-time campus announcements and updates.' },
  { icon: CalendarDays, title: 'Event Management', desc: 'Discover and register for campus events.' },
  { icon: MessageSquareWarning, title: 'Complaint Portal', desc: 'Submit and track complaints seamlessly.' },
  { icon: PackageSearch, title: 'Lost & Found', desc: 'Report lost items or help others find theirs.' },
  { icon: BookOpen, title: 'Study Hub', desc: 'Access notes, papers, and study materials.' },
  { icon: UserRound, title: 'Profile Management', desc: 'Manage your academic and personal info.' },
]

function SectionTitle({ label, title, desc }) {
  return (
    <div className="text-center mb-14">
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider dark:text-blue-400 dark:bg-blue-950/40">{label}</span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-4 tracking-tight">{title}</h2>
      {desc && <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">{desc}</p>}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 animate-fadeIn">
      <Navbar />

      {/* ── Hero ── */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider mb-6 dark:text-blue-400 dark:bg-blue-950/40">
            <Sparkles size={14} /> Smart Campus Management
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
            Everything Your Campus Needs,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">One Platform</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-5 max-w-2xl mx-auto">
            From notices and events to complaints and study materials — Campus360 connects students, faculty, and administration seamlessly.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Link to="/login" className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:-translate-y-0.5 hover:shadow-lg">Get Started <ArrowRight size={18} /></Link>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 text-gray-700 bg-white px-7 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all hover:-translate-y-0.5 cursor-pointer dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700/50 dark:hover:border-gray-600">Explore Features</button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-400 dark:text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Free for students</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Real-time updates</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> 24/7 Support</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <SectionTitle label="Features" title="Everything You Need" desc="Campus360 provides all the tools to manage your campus life efficiently." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent group dark:bg-gray-800 dark:border-gray-700/50">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all dark:bg-blue-950/40 dark:text-blue-400">
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle label="How It Works" title="Simple & Intuitive" desc="Get started in minutes with our streamlined workflow." />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up with your university email and set up your profile in seconds.' },
              { step: '02', title: 'Explore Dashboard', desc: 'Access notices, events, complaints, study hub, and more from one place.' },
              { step: '03', title: 'Stay Connected', desc: 'Get real-time updates, submit complaints, and engage with campus life.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg mx-auto mb-5">{item.step}</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-500 px-6 py-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs">© {new Date().getFullYear()} Campus360. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
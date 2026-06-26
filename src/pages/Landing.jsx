import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CalendarDays, MessageSquareWarning, PackageSearch, UserRound, CheckCircle2, Sparkles, BookOpen, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'

const FEATURES = [
  { icon: Bell, title: 'Notice Board', desc: 'Real-time campus announcements and updates.' },
  { icon: CalendarDays, title: 'Event Management', desc: 'Discover and register for campus events.' },
  { icon: MessageSquareWarning, title: 'Complaint Portal', desc: 'Submit and track complaints seamlessly.' },
  { icon: PackageSearch, title: 'Lost & Found', desc: 'Report lost items or help others find theirs.' },
  { icon: BookOpen, title: 'Study Hub', desc: 'Access notes, papers, and study materials.' },
  { icon: UserRound, title: 'Profile Management', desc: 'Manage your academic and personal info.' },
]

const STATS = [
  { value: '5,000+', label: 'Active Students' },
  { value: '200+', label: 'Faculty Members' },
  { value: '50+', label: 'Departments' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Computer Science, 3rd Year', text: 'Campus360 has completely transformed how I stay updated. Never miss a notice or event anymore!', avatar: 'PS' },
  { name: 'Rahul Verma', role: 'Faculty, Mathematics', text: 'Managing complaints and announcements has become so much easier. A must-have for every campus.', avatar: 'RV' },
  { name: 'Ananya Patel', role: 'Administration', text: 'The dashboard gives me a complete picture of campus activities. Incredibly useful tool.', avatar: 'AP' },
]

function SectionTitle({ label, title, desc }) {
  return (
    <div className="text-center mb-14">
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider">{label}</span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">{title}</h2>
      {desc && <p className="text-gray-500 mt-3 max-w-xl mx-auto">{desc}</p>}
    </div>
  )
}

function StatItem({ value, label }) {
  return (
    <div className="text-center p-6">
      <span className="text-3xl md:text-4xl font-extrabold text-blue-600">{value}</span>
      <p className="text-sm text-gray-400 mt-1 font-medium">{label}</p>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* ── Hero ── */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Smart Campus Management
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Everything Your Campus Needs,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">One Platform</span>
          </h1>
          <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
            From notices and events to complaints and study materials — Campus360 connects students, faculty, and administration seamlessly.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Link to="/login" className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:-translate-y-0.5 hover:shadow-lg">Get Started <ArrowRight size={18} /></Link>
            <a href="#features" className="inline-flex items-center gap-2 text-gray-700 bg-white px-7 py-3 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 transition-all hover:-translate-y-0.5">Explore Features</a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Free for students</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Real-time updates</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> 24/7 Support</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionTitle label="Features" title="Everything You Need" desc="Campus360 provides all the tools to manage your campus life efficiently." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent group">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
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
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-gray-950 text-gray-500 px-6 pt-16 pb-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 text-white font-bold text-xl mb-4">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#2563EB" />
                  <path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="white" />
                </svg>
                <span>Campus<span className="text-blue-500">360</span></span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">Empowering campuses with smart management solutions. Connecting students, faculty, and administration seamlessly.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-5">Quick Links</h4>
              {['Home', 'Features', 'About Us', 'Contact'].map(l => <a key={l} href="#" className="block text-sm hover:text-blue-500 transition-colors mb-3">{l}</a>)}
            </div>
            <div>
              <h4 className="text-white font-bold mb-5">Services</h4>
              {['Notice Board', 'Events', 'Complaints', 'Study Hub'].map(l => <a key={l} href="#" className="block text-sm hover:text-blue-500 transition-colors mb-3">{l}</a>)}
            </div>
            <div>
              <h4 className="text-white font-bold mb-5">Contact</h4>
              <div className="flex items-center gap-2.5 text-sm mb-3"><MapPin size={16} className="text-blue-500 shrink-0" /> 123 University Ave, Campus Town</div>
              <div className="flex items-center gap-2.5 text-sm mb-3"><Mail size={16} className="text-blue-500 shrink-0" /> hello@campus360.edu</div>
              <div className="flex items-center gap-2.5 text-sm mb-3"><Phone size={16} className="text-blue-500 shrink-0" /> +1 (555) 123-4567</div>
            </div>
          </div>
          <div className="py-6 text-center">
            <p className="text-xs">© {new Date().getFullYear()} Campus360. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Twitter(props) { return <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg> }
function Linkedin(props) { return <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> }
function Github(props) { return <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> }

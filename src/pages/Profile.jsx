import { useState } from 'react'
import { Menu, Mail, Phone, MapPin, BookOpen, Edit3, Lock, Save, X, User } from 'lucide-react'
import Sidebar from '../components/Sidebar'

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editing, setEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Shubham',
    enrollment: '2024CSE0123',
    course: 'B.Tech Computer Science',
    semester: '4th',
    email: 'shubham@campus.edu',
    phone: '+91 98765 43210',
    avatarInitials: 'S',
    batch: '2024-2028',
    section: 'A',
    cgpa: '8.6 / 10.0',
    advisor: 'Dr. Sharma',
    address: 'Room 204, Boys Hostel Block B',
    emergency: '+91 98765 43211',
  })

  const [draft, setDraft] = useState({ ...profile })

  function handleChange(e) {
    setDraft(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function startEditing() {
    setDraft({ ...profile })
    setEditing(true)
  }

  function cancelEditing() {
    setEditing(false)
  }

  function saveProfile() {
    setProfile({ ...draft })
    setEditing(false)
  }

  const row = (label, name) => (
    <div key={name} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      {editing ? (
        <input type="text" name={name} value={draft[name]} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 w-48" />
      ) : (
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{profile[name]}</span>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">My Profile</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-4xl w-full animate-fadeIn">
          {/* ── Profile Header ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6 dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">{profile.avatarInitials}</div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                {editing ? (
                  <input type="text" name="name" value={draft.name} onChange={handleChange} className="text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:border-blue-500 w-64 mb-1 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700/50" />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h1>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{profile.enrollment} · {profile.course}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-lg dark:text-blue-400 dark:bg-blue-950/40"><BookOpen size={13} /> {profile.semester} Semester</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg dark:text-gray-300 dark:bg-gray-800"><Mail size={13} /> {profile.email}</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg dark:text-gray-300 dark:bg-gray-800"><Phone size={13} /> {profile.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button onClick={saveProfile} className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-all cursor-pointer"><Save size={15} /> Save</button>
                    <button onClick={cancelEditing} className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"><X size={15} /> Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={startEditing} className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"><Edit3 size={15} /> Edit</button>
                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"><Lock size={15} /> Password</button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Info Cards ── */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ── Academic Information ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center"><BookOpen size={18} className="text-blue-600 dark:text-blue-400" /></div>
                <h2 className="font-bold text-gray-900 dark:text-gray-100">Academic Information</h2>
              </div>
              <div className="space-y-0">
                {row('Course', 'course')}
                {row('Enrollment No.', 'enrollment')}
                {row('Current Semester', 'semester')}
                {row('Batch', 'batch')}
                {row('Section', 'section')}
                {row('CGPA', 'cgpa')}
                {row('Advisor', 'advisor')}
              </div>
            </div>

            {/* ── Contact Information ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center"><Mail size={18} className="text-blue-600 dark:text-blue-400" /></div>
                <h2 className="font-bold text-gray-900 dark:text-gray-100">Contact Information</h2>
              </div>
              <div className="space-y-0">
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                  {editing ? (
                    <input type="email" name="email" value={draft.email} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 w-48" />
                  ) : (
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-blue-600 hover:underline">{profile.email}</a>
                  )}
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Phone</span>
                  {editing ? (
                    <input type="text" name="phone" value={draft.phone} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 w-48" />
                  ) : (
                    <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-sm font-semibold text-blue-600 hover:underline">{profile.phone}</a>
                  )}
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Address</span>
                  {editing ? (
                    <input type="text" name="address" value={draft.address} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 w-48" />
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{profile.address}</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Emergency Contact</span>
                  {editing ? (
                    <input type="text" name="emergency" value={draft.emergency} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 w-48" />
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{profile.emergency}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

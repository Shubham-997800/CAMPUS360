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
    <div key={name} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-[#94A3B8]">{label}</span>
      {editing ? (
        <input type="text" name={name} value={draft[name]} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] w-48" />
      ) : (
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{profile[name]}</span>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Profile</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-4xl w-full animate-fadeIn">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-[#6C5CE7] dark:bg-[#7C5CFF] flex items-center justify-center text-white font-bold text-2xl">{profile.avatarInitials}</div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                {editing ? (
                  <input type="text" name="name" value={draft.name} onChange={handleChange} className="text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:border-[#6C5CE7] w-64 mb-1 dark:text-white dark:bg-gray-800 dark:border-white/10" />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                )}
                <p className="text-sm text-gray-500 dark:text-[#94A3B8] mt-0.5">{profile.enrollment} · {profile.course}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#6C5CE7] dark:text-[#7C5CFF] bg-[#EDE9FE] dark:bg-[rgba(124,92,255,0.15)] px-3 py-1 rounded-lg"><BookOpen size={13} /> {profile.semester} Semester</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg dark:text-gray-300 dark:bg-gray-800"><Mail size={13} /> {profile.email}</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg dark:text-gray-300 dark:bg-gray-800"><Phone size={13} /> {profile.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button onClick={saveProfile} className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 rounded-xl hover:from-violet-700 hover:to-cyan-600 dark:from-violet-500 dark:to-cyan-400 dark:hover:from-violet-600 dark:hover:to-cyan-500 transition-all cursor-pointer"><Save size={15} /> Save</button>
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] dark:bg-[rgba(124,92,255,0.15)] flex items-center justify-center"><BookOpen size={18} className="text-[#6C5CE7] dark:text-[#7C5CFF]" /></div>
                <h2 className="font-bold text-gray-900 dark:text-white">Academic Information</h2>
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

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] dark:bg-[rgba(124,92,255,0.15)] flex items-center justify-center"><Mail size={18} className="text-[#6C5CE7] dark:text-[#7C5CFF]" /></div>
                <h2 className="font-bold text-gray-900 dark:text-white">Contact Information</h2>
              </div>
              <div className="space-y-0">
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-[#94A3B8]">Email</span>
                  {editing ? (
                    <input type="email" name="email" value={draft.email} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] w-48" />
                  ) : (
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:underline">{profile.email}</a>
                  )}
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-[#94A3B8]">Phone</span>
                  {editing ? (
                    <input type="text" name="phone" value={draft.phone} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] w-48" />
                  ) : (
                    <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-sm font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:underline">{profile.phone}</a>
                  )}
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-[#94A3B8]">Address</span>
                  {editing ? (
                    <input type="text" name="address" value={draft.address} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] w-48" />
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{profile.address}</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <span className="text-sm text-gray-500 dark:text-[#94A3B8]">Emergency Contact</span>
                  {editing ? (
                    <input type="text" name="emergency" value={draft.emergency} onChange={handleChange} className="text-right text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] w-48" />
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{profile.emergency}</span>
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

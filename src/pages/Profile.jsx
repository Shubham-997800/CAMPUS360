import { useState } from 'react'
import { Menu, Mail, Phone, MapPin, CalendarDays, BookOpen, Edit3, Lock } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const PROFILE = {
  name: 'Shubham',
  enrollment: '2024CSE0123',
  course: 'B.Tech Computer Science',
  semester: '4th',
  email: 'shubham@campus.edu',
  phone: '+91 98765 43210',
  avatarInitials: 'S',
}

const ACADEMIC_INFO = [
  { label: 'Course', value: 'B.Tech Computer Science' },
  { label: 'Enrollment No.', value: '2024CSE0123' },
  { label: 'Current Semester', value: '4th' },
  { label: 'Batch', value: '2024-2028' },
  { label: 'Section', value: 'A' },
  { label: 'CGPA', value: '8.6 / 10.0' },
  { label: 'Advisor', value: 'Dr. Sharma' },
]

const CONTACT_INFO = [
  { label: 'Email', value: 'shubham@campus.edu', type: 'email' },
  { label: 'Phone', value: '+91 98765 43210', type: 'phone' },
  { label: 'Address', value: 'Room 204, Boys Hostel Block B', type: 'text' },
  { label: 'Emergency Contact', value: '+91 98765 43211', type: 'phone' },
]

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-4xl w-full">
          {/* ── Profile Header ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">{PROFILE.avatarInitials}</div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 cursor-pointer" aria-label="Change photo"><Edit3 size={14} className="text-gray-500" /></button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{PROFILE.name}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{PROFILE.enrollment} · {PROFILE.course}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-lg"><BookOpen size={13} /> {PROFILE.semester} Semester</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"><Mail size={13} /> {PROFILE.email}</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"><Phone size={13} /> {PROFILE.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"><Edit3 size={15} /> Edit</button>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"><Lock size={15} /> Password</button>
              </div>
            </div>
          </div>

          {/* ── Info Cards ── */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ── Academic Information ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><BookOpen size={18} className="text-blue-600" /></div>
                <h2 className="font-bold text-gray-900">Academic Information</h2>
              </div>
              <div className="space-y-0">
                {ACADEMIC_INFO.map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Contact Information ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Mail size={18} className="text-blue-600" /></div>
                <h2 className="font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="space-y-0">
                {CONTACT_INFO.map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    {item.type === 'email' ? (
                      <a href={`mailto:${item.value}`} className="text-sm font-semibold text-blue-600 hover:underline">{item.value}</a>
                    ) : item.type === 'phone' ? (
                      <a href={`tel:${item.value.replace(/\s/g, '')}`} className="text-sm font-semibold text-blue-600 hover:underline">{item.value}</a>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

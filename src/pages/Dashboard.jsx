import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, MessageSquareWarning, BookOpen, AlertCircle, Menu, X, FileText, Search, Clock, Sun, Moon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { useTheme } from '../context/ThemeContext'

const STATS = {
  totalNotices: { value: 12, label: 'Total Notices', change: '+3 this week', barClass: 'bg-[#6C5CE7]', iconClass: 'bg-[#6C5CE7]', icon: Bell },
  upcomingEvents: { value: 5, label: 'Upcoming Events', change: 'Next: Tomorrow', barClass: 'bg-[#00D4FF]', iconClass: 'bg-[#00D4FF]', icon: CalendarDays },
  pendingComplaints: { value: 3, label: 'Pending Complaints', change: '2 in progress', barClass: 'bg-[#DC2626]', iconClass: 'bg-[#DC2626]', icon: MessageSquareWarning },
  studyMaterials: { value: 24, label: 'Study Materials', change: '4 new this week', barClass: 'bg-[#10B981]', iconClass: 'bg-[#10B981]', icon: BookOpen },
}

const NOTICES = [
  { id: 1, title: 'Final Exam Schedule Released', date: '2026-06-25', category: 'Academic' },
  { id: 2, title: 'Library Hours Extended for Exams', date: '2026-06-24', category: 'Library' },
  { id: 3, title: 'Campus Maintenance - Water Shutdown', date: '2026-06-23', category: 'Facility' },
]

const EVENTS = [
  { id: 1, name: 'Tech Symposium 2026', date: '2026-07-15', venue: 'Auditorium A', time: '10:00 AM' },
  { id: 2, name: 'Cultural Fest', date: '2026-07-20', venue: 'Open Air Theatre', time: '9:00 AM' },
]

const COMPLAINT_STATS = { pending: 3, inProgress: 2, resolved: 15 }

const ACTIVITY_CLASSES = { complaint: 'bg-[#EF4444]', study: 'bg-[#10B981]', event: 'bg-[#6C5CE7]', notice: 'bg-[#00D4FF]', lost: 'bg-[#F59E0B]', profile: 'bg-[#6B7280]' }

const NOTIFICATIONS_DATA = [
  { id: 1, text: 'New notice: Exam schedule released', time: '2 min ago', type: 'notice' },
  { id: 2, text: 'Tech Symposium registration closes soon', time: '15 min ago', type: 'event' },
  { id: 3, text: 'Your complaint #1003 has been resolved', time: '1 hour ago', type: 'complaint' },
  { id: 4, text: 'New study material added for DBMS', time: '3 hours ago', type: 'study' },
]

const QUICK_ACTIONS = [
  { label: 'Report Complaint', to: '/dashboard/complaints', icon: MessageSquareWarning, iconClass: 'bg-[#DC2626]' },
  { label: 'View Notices', to: '/dashboard/notices-events', icon: Bell, iconClass: 'bg-[#6C5CE7]' },
  { label: 'Explore Events', to: '/dashboard/notices-events', icon: CalendarDays, iconClass: 'bg-[#00D4FF]' },
  { label: 'Lost & Found', to: '/dashboard/lost-found', icon: Search, iconClass: 'bg-[#F59E0B]' },
  { label: 'Study Hub', to: '/dashboard/study-hub', icon: BookOpen, iconClass: 'bg-[#10B981]' },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const categoryStyles = {
  Academic: 'bg-[#EDE9FE] text-[#6C5CE7] ring-1 ring-[#6C5CE7]/30 dark:bg-[rgba(124,92,255,0.15)] dark:text-[#7C5CFF] dark:ring-[#7C5CFF]/30',
  Library: 'bg-green-50 text-green-600 ring-1 ring-green-200/50 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-800/30',
  Facility: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200/50 dark:bg-orange-950/40 dark:text-orange-400 dark:ring-orange-800/30',
  Events: 'bg-[#EDE9FE] text-[#6C5CE7] ring-1 ring-[#6C5CE7]/30 dark:bg-[rgba(124,92,255,0.15)] dark:text-[#7C5CFF] dark:ring-[#7C5CFF]/30',
}

export default function Dashboard() {
  const { dark, toggle } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA)
  const { state } = useLocation()
  const navigate = useNavigate()
  const user = state?.user || { name: 'Shubham', role: 'Student' }
  const initial = user.name.charAt(0).toUpperCase()
  const total = COMPLAINT_STATS.pending + COMPLAINT_STATS.inProgress + COMPLAINT_STATS.resolved

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        { text: 'Campus cafe menu updated for this week', type: 'notice' },
        { text: 'Sports meet registrations are now open', type: 'event' },
        { text: 'Library announced extended weekend hours', type: 'notice' },
        { text: 'New assignment posted for Web Development', type: 'study' },
      ]
      const pick = msgs[Math.floor(Math.random() * msgs.length)]
      setNotifications(prev => [{ id: Date.now(), ...pick, time: 'Just now' }, ...prev].slice(0, 8))
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 h-16 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer" aria-label="Menu">
            <Menu size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Welcome Back, {user.name} <span>👋</span></h1>
          </div>
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer" aria-label="Notifications">
              <Bell size={20} />
              {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">{notifications.length}</span>}
            </button>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl z-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Notifications</h3>
                    <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 cursor-pointer"><X size={16} /></button>
                  </div>
                  <div className="space-y-0 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-[#94A3B8] py-4 text-center">No new notifications</p>
                    ) : (
                      notifications.map((n, i) => (
                        <div key={n.id} className={`flex items-start gap-3 py-3 ${i < notifications.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${ACTIVITY_CLASSES[n.type] || 'bg-[#6B7280]'}`}>
                            {n.type === 'notice' && <Bell size={13} className="text-white" />}
                            {n.type === 'event' && <CalendarDays size={13} className="text-white" />}
                            {n.type === 'complaint' && <AlertCircle size={13} className="text-white" />}
                            {n.type === 'study' && <BookOpen size={13} className="text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 dark:text-white leading-snug">{n.text}</p>
                            <span className="text-xs text-gray-500 dark:text-[#94A3B8]">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <button onClick={toggle} className="p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer" aria-label="Toggle theme">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => navigate('/dashboard/profile')} className="flex items-center gap-2.5 pl-1 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#6C5CE7] dark:bg-[#7C5CFF] flex items-center justify-center text-white font-bold text-sm">{initial}</div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{user.name}</p>
              <p className="text-[11px] text-gray-500 dark:text-[#94A3B8]">{user.role}</p>
            </div>
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {Object.entries(STATS).map(([key, s]) => <StatCard key={key} {...s} />)}
          </div>

          <div className="mb-7">
            <h2 className="font-bold text-gray-900 dark:text-white mb-3.5">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {QUICK_ACTIONS.map(a => (
                <button key={a.label} onClick={() => navigate(a.to)} className="group flex items-center gap-3 p-4 bg-white dark:bg-[#1E293B] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all text-left cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110 ${a.iconClass}`}>
                    <a.icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">

            <div className="space-y-6">

              <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 dark:text-white">Recent Notices</h3>
                  <button onClick={() => navigate('/dashboard/notices-events')} className="text-xs font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:bg-[#EDE9FE] dark:hover:bg-[rgba(124,92,255,0.15)] transition-all px-3 py-1.5 rounded-lg cursor-pointer">View All</button>
                </div>
                <div className="space-y-0">
                  {NOTICES.map(n => (
                    <div key={n.id} className="flex items-start gap-4 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 first:pt-0">
                      <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] dark:bg-[rgba(124,92,255,0.15)] flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-[#6C5CE7] dark:text-[#7C5CFF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">{n.title}</span>
                        <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-[#94A3B8]">
                          <span>{formatDate(n.date)}</span>
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${categoryStyles[n.category] || 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>{n.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 dark:text-white">Complaint Status</h3>
                  <button onClick={() => navigate('/dashboard/complaints')} className="text-xs font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:bg-[#EDE9FE] dark:hover:bg-[rgba(124,92,255,0.15)] transition-all px-3 py-1.5 rounded-lg cursor-pointer">View All</button>
                </div>
                <div className="space-y-5">
                  <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
                    <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${(COMPLAINT_STATS.pending / total) * 100}%` }} title="Pending" />
                    <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(COMPLAINT_STATS.inProgress / total) * 100}%` }} title="In Progress" />
                    <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(COMPLAINT_STATS.resolved / total) * 100}%` }} title="Resolved" />
                  </div>
                  <div className="flex gap-6 text-xs">
                    {[
                      { label: 'Pending', value: COMPLAINT_STATS.pending, bgClass: 'bg-amber-50 dark:bg-amber-950/40', icon: Clock, iconClass: 'text-amber-500 dark:text-amber-400' },
                      { label: 'In Progress', value: COMPLAINT_STATS.inProgress, bgClass: 'bg-blue-50 dark:bg-blue-950/40', icon: AlertCircle, iconClass: 'text-blue-500 dark:text-blue-400' },
                      { label: 'Resolved', value: COMPLAINT_STATS.resolved, bgClass: 'bg-emerald-50 dark:bg-emerald-950/40', icon: Bell, iconClass: 'text-emerald-500 dark:text-emerald-400' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bgClass}`}>
                          <item.icon size={14} className={item.iconClass} />
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-[#94A3B8]">{item.label}</span>
                          <span className="font-bold text-gray-900 dark:text-white ml-1">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">

              <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 dark:text-white">Upcoming Events</h3>
                  <button onClick={() => navigate('/dashboard/notices-events')} className="text-xs font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:bg-[#EDE9FE] dark:hover:bg-[rgba(124,92,255,0.15)] transition-all px-3 py-1.5 rounded-lg cursor-pointer">View All</button>
                </div>
                <div className="space-y-0">
                  {EVENTS.map(e => (
                    <div key={e.id} className="flex items-center gap-4 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 first:pt-0">
                      <div className="flex flex-col items-center w-14 py-2.5 bg-[#EDE9FE] dark:bg-[rgba(124,92,255,0.15)] rounded-xl shrink-0 ring-1 ring-[#6C5CE7]/30 dark:ring-[#7C5CFF]/30">
                        <span className="text-[10px] font-bold text-[#6C5CE7] dark:text-[#7C5CFF] uppercase leading-none">{new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight mt-0.5">{new Date(e.date).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{e.name}</span>
                        <span className="text-xs text-gray-500 dark:text-[#94A3B8] flex items-center gap-1">
                          <CalendarDays size={11} />
                          {e.venue} · {e.time}
                        </span>
                      </div>
                      <button className="text-xs font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:bg-[#EDE9FE] dark:hover:bg-[rgba(124,92,255,0.15)] px-3 py-1.5 rounded-lg transition-all cursor-pointer">Details</button>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

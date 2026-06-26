import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, MessageSquareWarning, BookOpen, AlertCircle, Menu, X, FileText, Search } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

const STATS = {
  totalNotices: { value: 12, label: 'Total Notices', change: '+3 this week', color: '#2563EB', icon: Bell },
  upcomingEvents: { value: 5, label: 'Upcoming Events', change: 'Next: Tomorrow', color: '#7C3AED', icon: CalendarDays },
  pendingComplaints: { value: 3, label: 'Pending Complaints', change: '2 in progress', color: '#DC2626', icon: MessageSquareWarning },
  studyMaterials: { value: 24, label: 'Study Materials', change: '4 new this week', color: '#059669', icon: BookOpen },
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

const ACTIVITY_COLORS = { complaint: '#EF4444', study: '#10B981', event: '#8B5CF6', notice: '#2563EB', lost: '#F59E0B', profile: '#6B7280' }

const NOTIFICATIONS_DATA = [
  { id: 1, text: 'New notice: Exam schedule released', time: '2 min ago', type: 'notice' },
  { id: 2, text: 'Tech Symposium registration closes soon', time: '15 min ago', type: 'event' },
  { id: 3, text: 'Your complaint #1003 has been resolved', time: '1 hour ago', type: 'complaint' },
  { id: 4, text: 'New study material added for DBMS', time: '3 hours ago', type: 'study' },
]

const QUICK_ACTIONS = [
  { label: 'Report Complaint', to: '/dashboard/complaints', icon: MessageSquareWarning, color: '#EF4444' },
  { label: 'View Notices', to: '/dashboard/notices-events', icon: Bell, color: '#2563EB' },
  { label: 'Explore Events', to: '/dashboard/notices-events', icon: CalendarDays, color: '#8B5CF6' },
  { label: 'Lost & Found', to: '/dashboard/lost-found', icon: Search, color: '#F59E0B' },
  { label: 'Study Hub', to: '/dashboard/study-hub', icon: BookOpen, color: '#10B981' },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const categoryStyles = {
  Academic: 'bg-blue-50 text-blue-600 ring-1 ring-blue-200/50 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-800/30',
  Library: 'bg-green-50 text-green-600 ring-1 ring-green-200/50 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-800/30',
  Facility: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200/50 dark:bg-orange-950/40 dark:text-orange-400 dark:ring-orange-800/30',
  Events: 'bg-purple-50 text-purple-600 ring-1 ring-purple-200/50 dark:bg-purple-950/40 dark:text-purple-400 dark:ring-purple-800/30',
}

export default function Dashboard() {
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer" aria-label="Menu">
            <Menu size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Welcome Back, {user.name} <span>👋</span></h1>
          </div>
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer" aria-label="Notifications">
              <Bell size={20} />
              {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">{notifications.length}</span>}
            </button>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 p-4 dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Notifications</h3>
                    <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 cursor-pointer"><X size={16} /></button>
                  </div>
                  <div className="space-y-0 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">No new notifications</p>
                    ) : (
                      notifications.map((n, i) => (
                        <div key={n.id} className={`flex items-start gap-3 py-3 ${i < notifications.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: ACTIVITY_COLORS[n.type] || '#6B7280' }}>
                            {n.type === 'notice' && <Bell size={13} className="text-white" />}
                            {n.type === 'event' && <CalendarDays size={13} className="text-white" />}
                            {n.type === 'complaint' && <AlertCircle size={13} className="text-white" />}
                            {n.type === 'study' && <BookOpen size={13} className="text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 dark:text-gray-100 leading-snug">{n.text}</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <button onClick={() => navigate('/dashboard/profile')} className="flex items-center gap-2.5 pl-1 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">{initial}</div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">{user.name}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">{user.role}</p>
            </div>
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">

          {/* ── Stats Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {Object.entries(STATS).map(([key, s]) => <StatCard key={key} {...s} />)}
          </div>

          {/* ── Quick Actions ── */}
          <div className="mb-7">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3.5">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {QUICK_ACTIONS.map(a => (
                <button key={a.label} onClick={() => navigate(a.to)} className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all text-left cursor-pointer dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: a.color }}>
                    <a.icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Main Content Grid ── */}
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">

            {/* ── Left Column ── */}
            <div className="space-y-6">

              {/* ── Recent Notices ── */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Recent Notices</h3>
                  <button onClick={() => navigate('/dashboard/notices-events')} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all px-3 py-1.5 rounded-lg cursor-pointer dark:text-blue-400 dark:bg-blue-950/40 dark:hover:bg-blue-950/60">View All</button>
                </div>
                <div className="space-y-0">
                  {NOTICES.map(n => (
                    <div key={n.id} className="flex items-start gap-4 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 first:pt-0">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{n.title}</span>
                        <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                          <span>{formatDate(n.date)}</span>
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${categoryStyles[n.category] || 'bg-gray-50 text-gray-600'}`}>{n.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Complaint Status ── */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Complaint Status</h3>
                  <button onClick={() => navigate('/dashboard/complaints')} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all px-3 py-1.5 rounded-lg cursor-pointer dark:text-blue-400 dark:bg-blue-950/40 dark:hover:bg-blue-950/60">View All</button>
                </div>
                <div className="space-y-5">
                  <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
                    <div className="h-full transition-all duration-700" style={{ width: `${(COMPLAINT_STATS.pending / total) * 100}%`, backgroundColor: '#F59E0B' }} title="Pending" />
                    <div className="h-full transition-all duration-700" style={{ width: `${(COMPLAINT_STATS.inProgress / total) * 100}%`, backgroundColor: '#3B82F6' }} title="In Progress" />
                    <div className="h-full transition-all duration-700" style={{ width: `${(COMPLAINT_STATS.resolved / total) * 100}%`, backgroundColor: '#10B981' }} title="Resolved" />
                  </div>
                  <div className="flex gap-6 text-xs">
                    {[
                      { label: 'Pending', value: COMPLAINT_STATS.pending, color: '#F59E0B', icon: Clock },
                      { label: 'In Progress', value: COMPLAINT_STATS.inProgress, color: '#3B82F6', icon: AlertCircle },
                      { label: 'Resolved', value: COMPLAINT_STATS.resolved, color: '#10B981', icon: Bell },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + '15' }}>
                          <item.icon size={14} style={{ color: item.color }} />
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                          <span className="font-bold text-gray-900 dark:text-gray-100 ml-1">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">

              {/* ── Upcoming Events ── */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Upcoming Events</h3>
                  <button onClick={() => navigate('/dashboard/notices-events')} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all px-3 py-1.5 rounded-lg cursor-pointer dark:text-blue-400 dark:bg-blue-950/40 dark:hover:bg-blue-950/60">View All</button>
                </div>
                <div className="space-y-0">
                  {EVENTS.map(e => (
                    <div key={e.id} className="flex items-center gap-4 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 first:pt-0">
                      <div className="flex flex-col items-center w-14 py-2.5 bg-gradient-to-b from-blue-50 to-white rounded-xl shrink-0 ring-1 ring-blue-100 dark:from-blue-950/40 dark:to-gray-900 dark:ring-blue-800/30">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase leading-none">{new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mt-0.5">{new Date(e.date).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
<span className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-0.5">{e.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <CalendarDays size={11} />
                          {e.venue} · {e.time}
                        </span>
                      </div>
                      <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all cursor-pointer dark:text-blue-400 dark:bg-blue-950/40 dark:hover:bg-blue-950/60">Details</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Quick Stats Mini ── */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-sm">
                <h3 className="font-bold text-white/90 mb-3">This Week</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'New Notices', value: '4', color: 'bg-white/20' },
                    { label: 'Events', value: '2', color: 'bg-white/20' },
                    { label: 'Complaints', value: '1', color: 'bg-white/20' },
                    { label: 'Downloads', value: '8', color: 'bg-white/20' },
                  ].map(item => (
                    <div key={item.label} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <span className="text-2xl font-extrabold block leading-none mb-1">{item.value}</span>
                      <span className="text-xs text-blue-100">{item.label}</span>
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

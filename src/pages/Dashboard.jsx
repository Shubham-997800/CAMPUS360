import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, MessageSquareWarning, BookOpen, CheckCircle2, AlertCircle, Clock, Menu, X } from 'lucide-react'
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

const RECENT_ACTIVITY = [
  { id: 1, action: 'Submitted complaint about Wi-Fi connectivity', time: '2 hours ago', type: 'complaint' },
  { id: 2, action: 'Downloaded "Data Structures" study material', time: '4 hours ago', type: 'study' },
  { id: 3, action: 'Registered for Tech Symposium 2026', time: '1 day ago', type: 'event' },
]

const ACTIVITY_COLORS = { complaint: '#EF4444', study: '#10B981', event: '#8B5CF6', notice: '#2563EB', lost: '#F59E0B', profile: '#6B7280' }

const NOTIFICATIONS_DATA = [
  { id: 1, text: 'New notice: Exam schedule released', time: '2 min ago', type: 'notice' },
  { id: 2, text: 'Tech Symposium registration closes soon', time: '15 min ago', type: 'event' },
  { id: 3, text: 'Your complaint #1003 has been resolved', time: '1 hour ago', type: 'complaint' },
  { id: 4, text: 'New study material added for DBMS', time: '3 hours ago', type: 'study' },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer" aria-label="Menu">
            <Menu size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900">Welcome Back, {user.name} <span>👋</span></h1>
          </div>
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer" aria-label="Notifications">
              <Bell size={20} />
              {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">{notifications.length}</span>}
            </button>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                    <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={16} /></button>
                  </div>
                  <div className="space-y-0 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400 py-4 text-center">No new notifications</p>
                    ) : (
                      notifications.map((n, i) => (
                        <div key={n.id} className={`flex items-start gap-3 py-3 ${i < notifications.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: ACTIVITY_COLORS[n.type] || '#6B7280' }}>
                            {n.type === 'notice' && <Bell size={13} className="text-white" />}
                            {n.type === 'event' && <CalendarDays size={13} className="text-white" />}
                            {n.type === 'complaint' && <AlertCircle size={13} className="text-white" />}
                            {n.type === 'study' && <BookOpen size={13} className="text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 leading-snug">{n.text}</p>
                            <span className="text-xs text-gray-400">{n.time}</span>
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
              <p className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</p>
              <p className="text-[11px] text-gray-500">{user.role}</p>
            </div>
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full">
          {/* ── Stats Grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {Object.entries(STATS).map(([key, s]) => <StatCard key={key} {...s} />)}
          </div>

          {/* ── Quick Actions ── */}
          <div className="mb-7">
            <h2 className="font-bold text-gray-900 mb-3.5">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { label: 'Report Complaint', to: '/dashboard/complaints', emoji: '📋' },
                { label: 'View Notices', to: '/dashboard/notices-events', emoji: '📢' },
                { label: 'Explore Events', to: '/dashboard/notices-events', emoji: '🎉' },
                { label: 'Lost & Found', to: '/dashboard/lost-found', emoji: '🔍' },
                { label: 'Study Hub', to: '/dashboard/study-hub', emoji: '📚' },
              ].map(a => (
                <button key={a.label} onClick={() => navigate(a.to)} className="flex items-center gap-2.5 p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all text-left cursor-pointer">
                  <span className="text-xl">{a.emoji}</span>
                  <span className="text-xs font-semibold text-gray-900">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Content Grid ── */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
            <div className="space-y-6">
              {/* ── Recent Notices ── */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900">Recent Notices</h3>
                  <button onClick={() => navigate('/dashboard/notices-events')} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-all cursor-pointer">View All</button>
                </div>
                <div className="space-y-0">
                  {NOTICES.map(n => (
                    <div key={n.id} className="flex items-start gap-3.5 py-3.5 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 mb-1">{n.title}</span>
                        <div className="flex items-center gap-2.5 text-xs text-gray-500">
                          <span>{formatDate(n.date)}</span>
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            n.category === 'Academic' ? 'bg-blue-50 text-blue-600' :
                            n.category === 'Library' ? 'bg-green-50 text-green-600' :
                            n.category === 'Facility' ? 'bg-orange-50 text-orange-600' :
                            n.category === 'Events' ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600'
                          }`}>{n.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Complaint Status ── */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900">Complaint Status</h3>
                  <button onClick={() => navigate('/dashboard/complaints')} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-all cursor-pointer">View All</button>
                </div>
                <div className="space-y-4">
                  <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
                    <div className="h-full transition-all duration-600" style={{ width: `${(COMPLAINT_STATS.pending / total) * 100}%`, backgroundColor: '#F59E0B' }} />
                    <div className="h-full transition-all duration-600" style={{ width: `${(COMPLAINT_STATS.inProgress / total) * 100}%`, backgroundColor: '#3B82F6' }} />
                    <div className="h-full transition-all duration-600" style={{ width: `${(COMPLAINT_STATS.resolved / total) * 100}%`, backgroundColor: '#10B981' }} />
                  </div>
                  <div className="flex gap-5 text-xs text-gray-500">
                    {[
                      { label: 'Pending', value: COMPLAINT_STATS.pending, color: '#F59E0B' },
                      { label: 'In Progress', value: COMPLAINT_STATS.inProgress, color: '#3B82F6' },
                      { label: 'Resolved', value: COMPLAINT_STATS.resolved, color: '#10B981' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                        <span className="font-bold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Recent Activity ── */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900">Recent Activity</h3>
                  <button onClick={() => navigate('/dashboard/profile')} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-all cursor-pointer">View All</button>
                </div>
                <div className="space-y-0">
                  {RECENT_ACTIVITY.map((item, i) => (
                    <div key={item.id} className="flex gap-3.5">
                      <div className="flex flex-col items-center w-6 shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: ACTIVITY_COLORS[item.type] }}>
                          {item.type === 'complaint' && <AlertCircle size={12} className="text-white" />}
                          {item.type === 'study' && <BookOpen size={12} className="text-white" />}
                          {item.type === 'event' && <CalendarDays size={12} className="text-white" />}
                        </div>
                        {i < RECENT_ACTIVITY.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
                      </div>
                      <div className="flex-1 min-w-0 pb-5 last:pb-0">
                        <p className="text-sm text-gray-900 leading-relaxed">{item.action}</p>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Upcoming Events (right column) ── */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900">Upcoming Events</h3>
                  <button onClick={() => navigate('/dashboard/notices-events')} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-all cursor-pointer">View All</button>
                </div>
                <div className="space-y-0">
                  {EVENTS.map(e => (
                    <div key={e.id} className="flex items-center gap-4 py-3.5 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
                      <div className="flex flex-col items-center w-12 py-2 bg-gray-50 rounded-xl shrink-0">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">{new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-lg font-extrabold text-gray-900 leading-tight">{new Date(e.date).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900">{e.name}</span>
                        <span className="text-xs text-gray-500">{e.venue} · {e.time}</span>
                      </div>
                      <button className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">Details</button>
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

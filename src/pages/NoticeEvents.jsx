import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, ArrowRight, MapPin, Clock, CalendarDays, CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'
import { Menu } from 'lucide-react'

const NOTICES = [
  { id: 1, title: 'Final Exam Schedule Released', date: '2026-06-25', category: 'Academic', description: 'The final examination schedule for the 2026 academic year has been released. Please check your respective department notice boards for details.' },
  { id: 2, title: 'Library Hours Extended for Exams', date: '2026-06-24', category: 'Library', description: 'The library will remain open until midnight during the examination period starting June 28th.' },
  { id: 3, title: 'Campus Maintenance - Water Shutdown', date: '2026-06-23', category: 'Facility', description: 'There will be a scheduled water shutdown on June 27th from 9 AM to 5 PM for maintenance work.' },
  { id: 4, title: 'Hackathon 2026 Registrations Open', date: '2026-06-22', category: 'Events', description: 'Registrations are now open for the annual Hackathon 2026. Form teams of 3-4 and register by July 10th.' },
  { id: 5, title: 'Hostel Fee Payment Deadline Extended', date: '2026-06-21', category: 'Finance', description: 'The deadline for hostel fee payment has been extended to July 5th. Pay through the portal to avoid late fees.' },
]

const EVENTS_DATA = [
  { id: 1, title: 'Tech Symposium 2026', date: '2026-07-15', venue: 'Auditorium A', time: '10:00 AM', category: 'Tech', description: 'Annual technical symposium featuring workshops, competitions, and guest lectures from industry experts.', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', icon: '💻' },
  { id: 2, title: 'Cultural Fest', date: '2026-07-20', venue: 'Open Air Theatre', time: '9:00 AM', category: 'Cultural', description: 'Showcase your talent in music, dance, drama, and art. Prizes for winners across all categories.', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', icon: '🎭' },
  { id: 3, title: 'Workshop: AI & ML Basics', date: '2026-07-25', venue: 'CS Lab 3', time: '2:00 PM', category: 'Academic', description: 'Hands-on workshop covering fundamentals of artificial intelligence and machine learning.', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', icon: '🤖' },
  { id: 4, title: 'Sports Meet 2026', date: '2026-08-01', venue: 'Sports Complex', time: '7:00 AM', category: 'Sports', description: 'Inter-department sports competition featuring cricket, football, basketball, and athletics.', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', icon: '🏆' },
]

const CATEGORIES = ['All', 'Academic', 'Library', 'Facility', 'Events', 'Finance', 'Tech', 'Cultural', 'Sports']

function formatDate(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

function CategoryBadge({ cat }) {
  const colors = {
    Academic: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400', Library: 'bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400', Facility: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400',
    Events: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400', Finance: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400', Tech: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
    Cultural: 'bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400', Sports: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  }
  return <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${colors[cat] || 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>{cat}</span>
}

export default function NoticeEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('notices')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 4

  // ── Notices filtering & pagination ──
  const filteredNotices = NOTICES.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || n.category === filter
    return matchSearch && matchFilter
  })
  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE)
  const paginatedNotices = filteredNotices.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // ── Events filtering ──
  const filteredEvents = EVENTS_DATA.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || e.category === filter
    return matchSearch && matchFilter
  })

  function handleTabChange(newTab) { setTab(newTab); setPage(1); setSearch(''); setFilter('All') }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{tab === 'notices' ? 'Notices & Announcements' : 'Campus Events'}</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{tab === 'notices' ? 'Notices' : 'Events'}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tab === 'notices' ? 'Stay updated with all campus announcements.' : 'Discover and register for campus events.'}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3.5">
                <Search size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input type="text" placeholder={`Search ${tab}...`} value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 w-40" />
              </div>
              <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium outline-none cursor-pointer">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
            {['notices', 'events'].map(t => (
              <button key={t} onClick={() => handleTabChange(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${tab === t ? 'bg-white text-gray-900 dark:text-gray-100 shadow-sm dark:bg-gray-900' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}>
                {t === 'notices' ? 'Notices' : 'Events'}
              </button>
            ))}
          </div>

          {/* ── Notices Tab ── */}
          {tab === 'notices' && (
            <>
              {filteredNotices.length === 0 ? <EmptyState message="No notices found matching your search." /> : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    {paginatedNotices.map(n => (
                      <div key={n.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                        <div className="flex items-center justify-between mb-3">
                          <CategoryBadge cat={n.category} />
                          <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(n.date)}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{n.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{n.description}</p>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all cursor-pointer dark:text-blue-400 dark:bg-blue-950/40 dark:hover:bg-blue-950/60"><ArrowRight size={14} /> Read More</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-8">
                      <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-40 cursor-pointer"><ChevronLeft size={16} /> Previous</button>
                      <div className="flex gap-1.5">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                          <button key={n} onClick={() => setPage(n)} className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all cursor-pointer ${page === n ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}>{n}</button>
                        ))}
                      </div>
                      <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-40 cursor-pointer">Next <ChevronRight size={16} /></button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── Events Tab ── */}
          {tab === 'events' && (
            <>
              {filteredEvents.length === 0 ? <EmptyState message="No events found matching your search." /> : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredEvents.map(e => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function EventCard({ event: e }) {
  const [registered, setRegistered] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
      <div className="h-28 relative flex items-end p-4" style={{ background: e.gradient }}>
        <span className="text-3xl">{e.icon}</span>
        <span className="absolute top-3 right-3 text-[10px] font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded">{e.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(e.date)}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {e.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2.5"><MapPin size={13} /> {e.venue}</div>
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1.5">{e.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{e.description}</p>
        <button onClick={() => setRegistered(true)} disabled={registered} className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all cursor-pointer ${registered ? 'bg-green-50 text-green-600 dark:bg-green-950/40' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {registered ? <><CheckCircle2 size={16} /> Registered</> : 'Register Now'}
        </button>
      </div>
    </div>
  )
}

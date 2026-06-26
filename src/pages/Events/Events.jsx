// ============================================
// Events - Displays upcoming and past campus events with search, category filter,
//          and a registration toggle per event card
// ============================================

import { useState } from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import TopNavbar from '../Dashboard/components/TopNavbar'
import { events, categories } from './data'
import './Events.css'

export default function Events() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  // ── Filter events by search text (title/description/venue) and category ──
  const filtered = events.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || e.category === filter
    return matchSearch && matchFilter
  })

  // ── Split filtered list into upcoming vs past events based on isPast flag ──
  const upcoming = filtered.filter((e) => !e.isPast)
  const past = filtered.filter((e) => e.isPast)

  function handleFilterChange(e) {
    setFilter(e.target.value)
  }

  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="events-page">
          {/* ── Banner: page title, subtitle, and decorative SVG art ── */}
          <div className="events-banner">
            <div className="events-banner-content">
              <h1 className="events-banner-title">Upcoming Campus Events</h1>
              <p className="events-banner-subtitle">Stay connected. Stay engaged. Make the most of your campus life.</p>
            </div>
            <svg className="events-banner-art" width="200" height="120" viewBox="0 0 200 120" fill="none">
              <rect x="20" y="10" width="60" height="80" rx="8" fill="rgba(255,255,255,0.12)" />
              <rect x="24" y="14" width="52" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
              <rect x="24" y="24" width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="24" y="32" width="52" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="24" y="40" width="30" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <circle cx="50" cy="62" r="12" fill="rgba(255,255,255,0.08)" />
              <rect x="120" y="20" width="60" height="80" rx="8" fill="rgba(255,255,255,0.12)" />
              <rect x="124" y="24" width="52" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
              <rect x="124" y="34" width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="124" y="42" width="52" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="124" y="50" width="30" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <circle cx="150" cy="72" r="12" fill="rgba(255,255,255,0.08)" />
              <circle cx="30" cy="90" r="4" fill="rgba(255,255,255,0.15)" />
              <circle cx="170" cy="15" r="3" fill="rgba(255,255,255,0.15)" />
              <circle cx="100" cy="8" r="5" fill="rgba(255,255,255,0.1)" />
            </svg>
          </div>

          {/* ── Toolbar: search input and category filter dropdown ── */}
          <div className="events-toolbar">
            <div className="events-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={handleSearchChange}
                className="events-search-input"
              />
            </div>
            <div className="events-filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="12" y1="18" x2="20" y2="18" />
              </svg>
              <select value={filter} onChange={handleFilterChange} className="events-select">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Event sections: upcoming then past (or empty state) ── */}
          {upcoming.length === 0 && past.length === 0 ? (
            <div className="events-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No events found matching your search.</p>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <section className="events-section">
                  <div className="events-section-header">
                    <h2 className="events-section-title">Upcoming Events</h2>
                    <span className="events-section-count">{upcoming.length} event{upcoming.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="events-grid">
                    {upcoming.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              )}

              {past.length > 0 && (
                <section className="events-section">
                  <div className="events-section-header">
                    <h2 className="events-section-title">Past Events</h2>
                    <span className="events-section-count">{past.length} event{past.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="events-grid">
                    {past.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// EventCard - Sub-component rendering a single event card
// Features: gradient poster, icon, date/time/venue metadata,
//           registration button with local toggle state
// ============================================
function EventCard({ event }) {
  const [registered, setRegistered] = useState(false)

  return (
    <div className={`event-card ${event.isPast ? 'past' : ''}`}>
      {/* ── Poster area: gradient background, emoji icon, category overlay ── */}
      <div className="event-card-poster" style={{ background: event.gradient }}>
        <span className="event-card-icon">{event.icon}</span>
        <div className="event-card-poster-overlay">
          <span className="event-card-category">{event.category}</span>
          {event.isPast && <span className="event-card-past-badge">Past</span>}
        </div>
      </div>
      <div className="event-card-body">
        {/* ── Meta row: date and time ── */}
        <div className="event-card-meta">
          <span className="event-card-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="event-card-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.time}
          </span>
        </div>
        {/* ── Venue ── */}
        <div className="event-card-venue">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {event.venue}
        </div>
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-desc">{event.description}</p>
        {/* ── Registration button: toggles to "Registered" on click, hidden for past events ── */}
        {!event.isPast && (
          <button
            className={`event-card-register ${registered ? 'registered' : ''}`}
            onClick={() => setRegistered(true)}
            disabled={registered}
          >
            {registered ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Registered
              </>
            ) : (
              <>
                Register Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

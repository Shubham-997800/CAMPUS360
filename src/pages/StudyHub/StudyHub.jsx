import { useState } from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import TopNavbar from '../Dashboard/components/TopNavbar'
import { resources, sections, semesters, typeGradients, typeIcons, typeLabels } from './data'
import './StudyHub.css'

export default function StudyHub() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('notes')
  const [search, setSearch] = useState('')
  const [semester, setSemester] = useState('All')

  const filtered = resources.filter((r) => {
    const matchTab = r.type === tab
    const matchSem = semester === 'All' || r.semester === semester
    const matchSearch =
      r.subject.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSem && matchSearch
  })

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="studyhub-page">
          <div className="studyhub-banner">
            <div className="studyhub-banner-content">
              <h1 className="studyhub-banner-title">Study Hub</h1>
              <p className="studyhub-banner-subtitle">Access notes, previous year papers, assignments, and syllabus.</p>
            </div>
            <svg className="studyhub-banner-art" width="180" height="110" viewBox="0 0 180 110" fill="none">
              <rect x="20" y="15" width="50" height="65" rx="6" fill="rgba(255,255,255,0.1)" />
              <rect x="24" y="20" width="42" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
              <rect x="24" y="28" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <rect x="24" y="35" width="42" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <rect x="24" y="42" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <rect x="110" y="20" width="50" height="65" rx="6" fill="rgba(255,255,255,0.1)" />
              <rect x="114" y="25" width="42" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
              <rect x="114" y="33" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <rect x="114" y="40" width="42" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <rect x="114" y="47" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <circle cx="65" cy="90" r="4" fill="rgba(255,255,255,0.1)" />
              <circle cx="135" cy="95" r="3" fill="rgba(255,255,255,0.1)" />
            </svg>
          </div>

          <div className="studyhub-tabs">
            {sections.map((s) => (
              <button
                key={s.key}
                className={`studyhub-tab ${tab === s.key ? 'active' : ''}`}
                onClick={() => setTab(s.key)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
                {s.label}
                <span className="studyhub-tab-count">
                  {resources.filter((r) => r.type === s.key).length}
                </span>
              </button>
            ))}
          </div>

          <div className="studyhub-toolbar">
            <div className="studyhub-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder={`Search ${typeLabels[tab].toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="studyhub-search-input"
              />
            </div>
            <div className="studyhub-sem-filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="12" y1="18" x2="20" y2="18" />
              </svg>
              <select value={semester} onChange={(e) => setSemester(e.target.value)} className="studyhub-select">
                {semesters.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Semesters' : `${s} Semester`}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="studyhub-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No resources found.</p>
            </div>
          ) : (
            <div className="studyhub-grid">
              {filtered.map((r) => (
                <div key={r.id} className="studyhub-card">
                  <div className="studyhub-card-accent" style={{ background: typeGradients[r.type] }} />
                  <div className="studyhub-card-body">
                    <div className="studyhub-card-type">
                      <span className="studyhub-type-icon">{typeIcons[r.type]}</span>
                      <span className={`studyhub-type-badge ${r.type}`}>{typeLabels[r.type]}</span>
                    </div>
                    <h3 className="studyhub-card-subject">{r.subject}</h3>
                    <div className="studyhub-card-meta">
                      {r.semester !== 'All' && (
                        <span className="studyhub-card-sem">{r.semester} Semester</span>
                      )}
                      {r.semester === 'All' && (
                        <span className="studyhub-card-sem all">All Semesters</span>
                      )}
                      <span className="studyhub-card-downloads">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {r.downloads}
                      </span>
                    </div>
                    <button className="studyhub-card-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

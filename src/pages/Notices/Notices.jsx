// ============================================
// Notices - Displays campus notices with search, category filter, and pagination
// ============================================

import { useState } from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import TopNavbar from '../Dashboard/components/TopNavbar'
import { notices, categories } from './data'
import './Notices.css'

const ITEMS_PER_PAGE = 6

export default function Notices() {
  // ── State: sidebar toggle, search query, category filter, current page ──
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)

  // ── Filter notices by search text (title/description) and category ──
  const filtered = notices.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || n.category === filter
    return matchSearch && matchFilter
  })

  // ── Pagination: calculate total pages and slice current page items ──
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // ── Reset to first page when filter or search changes ──
  function handleFilterChange(e) {
    setFilter(e.target.value)
    setPage(1)
  }

  function handleSearchChange(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="notices-page">
          {/* ── Header: title, subtitle, search input, and category dropdown ── */}
          <div className="notices-header">
            <div className="notices-header-left">
              <h1 className="notices-title">Notices</h1>
              <p className="notices-subtitle">Stay updated with all campus announcements.</p>
            </div>
            <div className="notices-controls">
              <div className="notices-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={search}
                  onChange={handleSearchChange}
                  className="notices-search-input"
                />
              </div>
              <div className="notices-filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="18" x2="20" y2="18" />
                </svg>
                <select value={filter} onChange={handleFilterChange} className="notices-select">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Notice cards grid or empty state ── */}
          {paginated.length === 0 ? (
            <div className="notices-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No notices found matching your search.</p>
            </div>
          ) : (
            <>
              {/* ── Notice cards grid ── */}
              <div className="notices-grid">
                {paginated.map((notice) => (
                  <div key={notice.id} className="notice-card">
                    <div className="notice-card-top">
                      <span className={`notice-card-category ${notice.category.toLowerCase()}`}>
                        {notice.category}
                      </span>
                      <span className="notice-card-date">
                        {new Date(notice.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="notice-card-title">{notice.title}</h3>
                    <p className="notice-card-desc">{notice.description}</p>
                    <div className="notice-card-actions">
                      <button className="notice-btn notice-btn-download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download
                      </button>
                      <button className="notice-btn notice-btn-read">
                        Read More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Pagination: previous/next buttons and page number buttons ── */}
              {totalPages > 1 && (
                <div className="notices-pagination">
                  <button
                    className="page-btn"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Previous
                  </button>
                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        className={`page-number ${page === n ? 'active' : ''}`}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <button
                    className="page-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

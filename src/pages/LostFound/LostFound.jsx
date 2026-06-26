import { useState } from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import TopNavbar from '../Dashboard/components/TopNavbar'
import { lostItems, foundItems, categories } from './data'
import './LostFound.css'

export default function LostFound() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('lost')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', location: '', description: '' })
  const [formErrors, setFormErrors] = useState({})
  const [lostList, setLostList] = useState(lostItems)
  const [foundList] = useState(foundItems)

  const currentList = tab === 'lost' ? lostList : foundList

  const filtered = currentList.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || item.category === filter
    return matchSearch && matchFilter
  })

  function handleFormChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validateForm() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Item name is required'
    if (!form.category) errs.category = 'Please select a category'
    if (!form.location.trim()) errs.location = 'Location is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    else if (form.description.trim().length < 20) errs.description = 'Please provide at least 20 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validateForm()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    const newItem = {
      id: lostList.length > 0 ? Math.max(...lostList.map((i) => i.id)) + 1 : 1,
      name: form.name.trim(),
      category: form.category,
      date: new Date().toISOString().split('T')[0],
      location: form.location.trim(),
      description: form.description.trim(),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🔍',
      status: 'lost',
    }

    setLostList((prev) => [newItem, ...prev])
    setForm({ name: '', category: '', location: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="lostfound-page">
          <div className="lostfound-banner">
            <div className="lostfound-banner-content">
              <h1 className="lostfound-banner-title">Lost & Found</h1>
              <p className="lostfound-banner-subtitle">Report lost items or help others find theirs.</p>
            </div>
            <button className="lostfound-report-btn" onClick={() => setShowForm(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Report Lost Item
            </button>
          </div>

          {showForm && (
            <div className="lostfound-overlay" onClick={() => setShowForm(false)}>
              <div className="lostfound-modal" onClick={(e) => e.stopPropagation()}>
                <div className="lostfound-modal-header">
                  <h2 className="lostfound-modal-title">Report a Lost Item</h2>
                  <button className="lostfound-modal-close" onClick={() => setShowForm(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="lostfound-form">
                  <div className="lostfound-form-group">
                    <label className="lostfound-form-label">Item Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Black Water Bottle"
                      className={`lostfound-form-input ${formErrors.name ? 'error' : ''}`}
                    />
                    {formErrors.name && <span className="lostfound-form-error">{formErrors.name}</span>}
                  </div>

                  <div className="lostfound-form-group">
                    <label className="lostfound-form-label">Category <span className="required">*</span></label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      className={`lostfound-form-input ${formErrors.category ? 'error' : ''}`}
                    >
                      <option value="">Select a category</option>
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {formErrors.category && <span className="lostfound-form-error">{formErrors.category}</span>}
                  </div>

                  <div className="lostfound-form-group">
                    <label className="lostfound-form-label">Last Seen Location <span className="required">*</span></label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleFormChange}
                      placeholder="e.g. Library, 2nd Floor"
                      className={`lostfound-form-input ${formErrors.location ? 'error' : ''}`}
                    />
                    {formErrors.location && <span className="lostfound-form-error">{formErrors.location}</span>}
                  </div>

                  <div className="lostfound-form-group">
                    <label className="lostfound-form-label">Description <span className="required">*</span></label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      placeholder="Describe the item in detail (color, brand, distinguishing features)..."
                      rows={4}
                      className={`lostfound-form-input lostfound-form-textarea ${formErrors.description ? 'error' : ''}`}
                    />
                    {formErrors.description && <span className="lostfound-form-error">{formErrors.description}</span>}
                  </div>

                  <button type="submit" className="lostfound-form-submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Submit Report
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="lostfound-tabs">
            <button
              className={`lostfound-tab ${tab === 'lost' ? 'active' : ''}`}
              onClick={() => setTab('lost')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Lost Items
              <span className="lostfound-tab-count">{lostList.length}</span>
            </button>
            <button
              className={`lostfound-tab ${tab === 'found' ? 'active' : ''}`}
              onClick={() => setTab('found')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Found Items
              <span className="lostfound-tab-count">{foundList.length}</span>
            </button>
          </div>

          <div className="lostfound-toolbar">
            <div className="lostfound-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="lostfound-search-input"
              />
            </div>
            <div className="lostfound-filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="12" y1="18" x2="20" y2="18" />
              </svg>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="lostfound-select">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="lostfound-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No items found.</p>
            </div>
          ) : (
            <div className="lostfound-grid">
              {filtered.map((item) => (
                <div key={item.id} className={`lostfound-card ${item.status}`}>
                  <div className="lostfound-card-poster" style={{ background: item.gradient }}>
                    <span className="lostfound-card-icon">{item.icon}</span>
                    <span className={`lostfound-card-badge ${item.status}`}>
                      {item.status === 'lost' ? 'Lost' : 'Found'}
                    </span>
                  </div>
                  <div className="lostfound-card-body">
                    <h3 className="lostfound-card-name">{item.name}</h3>
                    <div className="lostfound-card-info">
                      <span className="lostfound-card-detail">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {item.category !== 'All' && (
                        <span className="lostfound-card-category">{item.category}</span>
                      )}
                    </div>
                    <div className="lostfound-card-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {item.location}
                    </div>
                    <p className="lostfound-card-desc">{item.description}</p>
                    <button className="lostfound-card-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Contact Admin
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

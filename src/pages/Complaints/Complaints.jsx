// ============================================
// Complaints - Complaint management page with:
//   - New complaint form (modal overlay with validation)
//   - Search + status filter toolbar
//   - Table listing complaints with status badges
//   - Summary cards showing pending/in-progress/resolved/total counts
// ============================================

import { useState } from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import TopNavbar from '../Dashboard/components/TopNavbar'
import { complaints, complaintCategories, statusFilters, statusConfig } from './data'
import './Complaints.css'

export default function Complaints() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [list, setList] = useState(complaints)
  const [form, setForm] = useState({ title: '', category: '', description: '' })
  const [formErrors, setFormErrors] = useState({})
  const [fileName, setFileName] = useState('')

  // ── Filter complaints by search text (title/ID/category) and status filter ──
  const filtered = list.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toString().includes(search) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === 'All' || c.status === statusFilter.toLowerCase().replace(' ', '-')
    return matchSearch && matchStatus
  })

  // ── Update form field value and clear corresponding validation error ──
  function handleFormChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ── Capture file name from file input ──
  function handleFileChange(e) {
    const file = e.target.files[0]
    setFileName(file ? file.name : '')
  }

  // ── Validate form fields before submission ──
  function validateForm() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.category) errs.category = 'Please select a category'
    if (!form.description.trim()) errs.description = 'Description is required'
    else if (form.description.trim().length < 20) errs.description = 'Please provide at least 20 characters'
    return errs
  }

  // ── Handle form submission: validate, create new complaint, prepend to list ──
  function handleSubmit(e) {
    e.preventDefault()
    const errs = validateForm()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return

    const newComplaint = {
      id: list.length > 0 ? Math.max(...list.map((c) => c.id)) + 1 : 1001,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      attachments: fileName ? [fileName] : [],
    }

    setList((prev) => [newComplaint, ...prev])
    setForm({ title: '', category: '', description: '' })
    setFileName('')
    setShowForm(false)
  }

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="complaints-page">
          {/* ── Banner: page title + "New Complaint" button ── */}
          <div className="complaints-banner">
            <div className="complaints-banner-content">
              <h1 className="complaints-banner-title">Complaint Management</h1>
              <p className="complaints-banner-subtitle">Submit and track your campus complaints seamlessly.</p>
            </div>
            <button className="complaints-new-btn" onClick={() => setShowForm(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Complaint
            </button>
          </div>

          {/* ── New Complaint Form Modal: overlay with form for title, category, description, attachment ── */}
          {showForm && (
            <div className="complaints-form-overlay" onClick={() => setShowForm(false)}>
              <div className="complaints-form-modal" onClick={(e) => e.stopPropagation()}>
                <div className="complaints-form-header">
                  <h2 className="complaints-form-title">Submit a Complaint</h2>
                  <button className="complaints-form-close" onClick={() => setShowForm(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="complaints-form">
                  <div className="complaints-form-group">
                    <label className="complaints-form-label">Title <span className="required">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleFormChange}
                      placeholder="Brief title of your complaint"
                      className={`complaints-form-input ${formErrors.title ? 'error' : ''}`}
                    />
                    {formErrors.title && <span className="complaints-form-error">{formErrors.title}</span>}
                  </div>

                  <div className="complaints-form-group">
                    <label className="complaints-form-label">Category <span className="required">*</span></label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      className={`complaints-form-input ${formErrors.category ? 'error' : ''}`}
                    >
                      <option value="">Select a category</option>
                      {complaintCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {formErrors.category && <span className="complaints-form-error">{formErrors.category}</span>}
                  </div>

                  <div className="complaints-form-group">
                    <label className="complaints-form-label">Description <span className="required">*</span></label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      placeholder="Describe your complaint in detail..."
                      rows={5}
                      className={`complaints-form-input complaints-form-textarea ${formErrors.description ? 'error' : ''}`}
                    />
                    {formErrors.description && <span className="complaints-form-error">{formErrors.description}</span>}
                  </div>

                  <div className="complaints-form-group">
                    <label className="complaints-form-label">Attachment (optional)</label>
                    <label className="complaints-file-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                      {fileName || 'Choose file'}
                      <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                    </label>
                  </div>

                  <button type="submit" className="complaints-form-submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Submit Complaint
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── Toolbar: search input and status filter button group ── */}
          <div className="complaints-toolbar">
            <div className="complaints-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, ID, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="complaints-search-input"
              />
            </div>
            <div className="complaints-status-filters">
              {statusFilters.map((s) => (
                <button
                  key={s}
                  className={`complaints-status-btn ${statusFilter === s ? 'active' : ''}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Complaint table (or empty state) ── */}
          {filtered.length === 0 ? (
            <div className="complaints-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>No complaints found.</p>
            </div>
          ) : (
            <div className="complaints-table-wrapper">
              <table className="complaints-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => {
                    const cfg = statusConfig[c.status]
                    return (
                      <tr key={c.id}>
                        <td className="complaints-id">#{c.id}</td>
                        <td className="complaints-title-cell">
                          <span className="complaints-title-text">{c.title}</span>
                          <span className="complaints-desc-preview">{c.description.slice(0, 80)}...</span>
                        </td>
                        <td><span className="complaints-category-badge">{c.category}</span></td>
                        <td className="complaints-date">
                          {new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td>
                          {/* ── Status badge with color-coded dot and label from statusConfig ── */}
                          <span className="complaints-status-badge" style={{ background: cfg.bg, color: cfg.color }}>
                            <span className="complaints-status-dot" style={{ background: cfg.color }} />
                            {cfg.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Summary cards: counts for pending, in-progress, resolved, and total ── */}
          <div className="complaints-summary">
            <div className="complaints-summary-item">
              <span className="complaints-summary-value">{list.filter((c) => c.status === 'pending').length}</span>
              <span className="complaints-summary-label">Pending</span>
              <span className="complaints-summary-dot" style={{ background: '#F59E0B' }} />
            </div>
            <div className="complaints-summary-item">
              <span className="complaints-summary-value">{list.filter((c) => c.status === 'in-progress').length}</span>
              <span className="complaints-summary-label">In Progress</span>
              <span className="complaints-summary-dot" style={{ background: '#3B82F6' }} />
            </div>
            <div className="complaints-summary-item">
              <span className="complaints-summary-value">{list.filter((c) => c.status === 'resolved').length}</span>
              <span className="complaints-summary-label">Resolved</span>
              <span className="complaints-summary-dot" style={{ background: '#10B981' }} />
            </div>
            <div className="complaints-summary-item">
              <span className="complaints-summary-value">{list.length}</span>
              <span className="complaints-summary-label">Total</span>
              <span className="complaints-summary-dot" style={{ background: '#64748B' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

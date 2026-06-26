import { useState } from 'react'
import { Search, Plus, Menu, X, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const INITIAL_COMPLAINTS = [
  { id: 1001, title: 'Wi-Fi not working in library', category: 'Infrastructure', description: 'The Wi-Fi connection in the library has been down for the past 3 days, causing inconvenience for students preparing for exams.', status: 'in-progress', date: '2026-06-20' },
  { id: 1002, title: 'Canteen food quality issue', category: 'Food Services', description: 'The food quality in the main canteen has deteriorated significantly. Several students have reported stomach issues after eating.', status: 'pending', date: '2026-06-22' },
  { id: 1003, title: 'Broken projector in room 301', category: 'Infrastructure', description: 'The projector in classroom 301 has been broken for a week. Requesting immediate repair for ongoing presentations.', status: 'resolved', date: '2026-06-18' },
  { id: 1004, title: 'Hostel water supply issue', category: 'Hostel', description: 'No hot water supply in Boys Hostel Block B since morning. Need immediate attention.', status: 'in-progress', date: '2026-06-23' },
  { id: 1005, title: 'Library book not available', category: 'Academic', description: 'The textbook "Data Structures and Algorithms" is not available in the library. Requesting to purchase new copies.', status: 'pending', date: '2026-06-21' },
]

const CATEGORIES = ['Infrastructure', 'Food Services', 'Hostel', 'Academic', 'Cleanliness', 'Security', 'Transport', 'Other']

const STATUS_MAP = {
  'all': { label: 'All' },
  'pending': { label: 'Pending', color: '#F59E0B', bg: '#FEF3C7' },
  'in-progress': { label: 'In Progress', color: '#3B82F6', bg: '#DBEAFE' },
  'resolved': { label: 'Resolved', color: '#10B981', bg: '#D1FAE5' },
}

export default function Complaints() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [list, setList] = useState(INITIAL_COMPLAINTS)
  const [form, setForm] = useState({ title: '', category: '', description: '' })
  const [errors, setErrors] = useState({})

  const filtered = list.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toString().includes(search) || c.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.category) errs.category = 'Select a category'
    if (!form.description.trim()) errs.description = 'Description is required'
    else if (form.description.trim().length < 20) errs.description = 'At least 20 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setList(prev => [{
      id: Math.max(...prev.map(c => c.id), 1000) + 1,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    }, ...prev])
    setForm({ title: '', category: '', description: '' })
    setShowForm(false)
  }

  const counts = {
    pending: list.filter(c => c.status === 'pending').length,
    inProgress: list.filter(c => c.status === 'in-progress').length,
    resolved: list.filter(c => c.status === 'resolved').length,
    total: list.length,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900">Complaint Management</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full">
          {/* ── Header + New Complaint ── */}
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Complaints</h1>
              <p className="text-sm text-gray-500 mt-1">Submit and track your campus complaints.</p>
            </div>
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-sm font-semibold bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer"><Plus size={17} /> New Complaint</button>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Pending', value: counts.pending, color: '#F59E0B' },
              { label: 'In Progress', value: counts.inProgress, color: '#3B82F6' },
              { label: 'Resolved', value: counts.resolved, color: '#10B981' },
              { label: 'Total', value: counts.total, color: '#6B7280' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{s.label}</span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                </div>
                <span className="text-2xl font-bold text-gray-900 mt-1 block">{s.value}</span>
              </div>
            ))}
          </div>

          {/* ── Toolbar ── */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 flex-1 min-w-0 max-w-xs">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input type="text" placeholder="Search complaints..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-900 placeholder:text-gray-400 min-w-0" />
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl flex-wrap">
              {['all', 'pending', 'in-progress', 'resolved'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {STATUS_MAP[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Complaints Table ── */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <AlertCircle size={48} className="mb-3" />
              <p className="text-sm font-medium">No complaints found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left text-xs font-semibold text-gray-500 py-3.5 px-5">ID</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3.5 px-5">Title</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3.5 px-5">Category</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3.5 px-5">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3.5 px-5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const status = STATUS_MAP[c.status]
                    return (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                        <td className="py-3.5 px-5 text-sm font-medium text-gray-900">#{c.id}</td>
                        <td className="py-3.5 px-5">
                          <span className="text-sm font-semibold text-gray-900 block">{c.title}</span>
                          <span className="text-xs text-gray-400 block mt-0.5">{c.description.slice(0, 80)}...</span>
                        </td>
                        <td className="py-3.5 px-5"><span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{c.category}</span></td>
                        <td className="py-3.5 px-5 text-sm text-gray-500">{new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="py-3.5 px-5">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ color: status.color, backgroundColor: status.bg }}>
                            {c.status === 'resolved' ? <CheckCircle2 size={12} /> : c.status === 'in-progress' ? <Clock size={12} /> : <AlertCircle size={12} />}
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* ── New Complaint Modal ── */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Submit a Complaint</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={form.title} onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })) }} placeholder="Brief title of your complaint" className={`w-full border ${errors.title ? 'border-red-400' : 'border-gray-200'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 transition-all placeholder:text-gray-400`} />
                  {errors.title && <span className="text-xs text-red-500 mt-1 block">{errors.title}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={form.category} onChange={e => { setForm(p => ({ ...p, category: e.target.value })); setErrors(p => ({ ...p, category: '' })) }} className={`w-full border ${errors.category ? 'border-red-400' : 'border-gray-200'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 transition-all`}>
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                  {errors.category && <span className="text-xs text-red-500 mt-1 block">{errors.category}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
                  <textarea name="description" value={form.description} onChange={e => { setForm(p => ({ ...p, description: e.target.value })); setErrors(p => ({ ...p, description: '' })) }} placeholder="Describe your complaint in detail..." rows={4} className={`w-full border ${errors.description ? 'border-red-400' : 'border-gray-200'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none`} />
                  {errors.description && <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>}
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all cursor-pointer"><CheckCircle2 size={17} /> Submit Complaint</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Search, Plus, Menu, X, AlertCircle, CheckCircle2, Clock, Sun, Moon, MessageSquare, Eye, Edit3, Trash2, ChevronRight, ShieldAlert, Loader2, Hourglass, Ban } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'
import { STATUS_MAP, NOTIFICATION_TYPES } from './complaintData'

const CATEGORIES = ['Infrastructure', 'Food Services', 'Hostel', 'Academic', 'Cleanliness', 'Security', 'Transport', 'Other']

let nextId = 1006
let nextHistoryId = 6
let nextNotifId = 6

const INITIAL_COMPLAINTS = [
  { id: 1001, userId: 2, userName: 'Rahul Sharma', title: 'Wi-Fi not working in library', category: 'Infrastructure', description: 'The Wi-Fi connection in the library has been down for the past 3 days, causing inconvenience for students preparing for exams.', status: 'in-progress', createdAt: '2026-06-20T10:30:00', updatedAt: '2026-06-21T14:00:00' },
  { id: 1002, userId: 2, userName: 'Rahul Sharma', title: 'Canteen food quality issue', category: 'Food Services', description: 'The food quality in the main canteen has deteriorated significantly. Several students have reported stomach issues after eating.', status: 'pending', createdAt: '2026-06-22T09:00:00', updatedAt: '2026-06-22T09:00:00' },
  { id: 1003, userId: 2, userName: 'Rahul Sharma', title: 'Broken projector in room 301', category: 'Infrastructure', description: 'The projector in classroom 301 has been broken for a week. Requesting immediate repair for ongoing presentations.', status: 'resolved', createdAt: '2026-06-18T08:00:00', updatedAt: '2026-06-19T16:00:00' },
  { id: 1004, userId: 2, userName: 'Rahul Sharma', title: 'Hostel water supply issue', category: 'Hostel', description: 'No hot water supply in Boys Hostel Block B since morning. Need immediate attention.', status: 'in-progress', createdAt: '2026-06-23T07:00:00', updatedAt: '2026-06-23T11:00:00' },
  { id: 1005, userId: 2, userName: 'Rahul Sharma', title: 'Library book not available', category: 'Academic', description: 'The textbook "Data Structures and Algorithms" is not available in the library. Requesting to purchase new copies.', status: 'pending', createdAt: '2026-06-21T15:00:00', updatedAt: '2026-06-21T15:00:00' },
]

const INITIAL_HISTORY = [
  { id: 1, complaintId: 1001, fromStatus: null, toStatus: 'pending', changedBy: 'Rahul Sharma', changedAt: '2026-06-20T10:30:00' },
  { id: 2, complaintId: 1001, fromStatus: 'pending', toStatus: 'in-progress', changedBy: 'Admin', changedAt: '2026-06-21T14:00:00' },
  { id: 3, complaintId: 1003, fromStatus: null, toStatus: 'pending', changedBy: 'Rahul Sharma', changedAt: '2026-06-18T08:00:00' },
  { id: 4, complaintId: 1003, fromStatus: 'pending', toStatus: 'in-progress', changedBy: 'Admin', changedAt: '2026-06-19T10:00:00' },
  { id: 5, complaintId: 1003, fromStatus: 'in-progress', toStatus: 'resolved', changedBy: 'Admin', changedAt: '2026-06-19T16:00:00' },
  { id: 6, complaintId: 1004, fromStatus: null, toStatus: 'pending', changedBy: 'Rahul Sharma', changedAt: '2026-06-23T07:00:00' },
  { id: 7, complaintId: 1004, fromStatus: 'pending', toStatus: 'in-progress', changedBy: 'Admin', changedAt: '2026-06-23T11:00:00' },
]

const INITIAL_REVIEWS = {
  1003: { id: 1, complaintId: 1003, title: 'Issue Resolved', message: 'The projector bulb has been replaced and the system is fully functional. Room 301 is now operational for all presentations.', resolutionNotes: 'Replaced with a new Epson projector. Maintenance team verified the setup.', adminName: 'Admin', createdAt: '2026-06-19T16:00:00' },
}

const INITIAL_NOTIFICATIONS = []

export default function Complaints() {
  const { dark, toggle } = useTheme()
  const { state } = useLocation()
  const user = state?.user || { id: 2, name: 'Rahul Sharma', role: 'Student' }
  const isAdmin = user.role === 'Admin'

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [list, setList] = useState(INITIAL_COMPLAINTS)
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [form, setForm] = useState({ title: '', category: '', description: '' })
  const [errors, setErrors] = useState({})
  const [showConfirm, setShowConfirm] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [showReviewModal, setShowReviewModal] = useState(null)
  const [reviewForm, setReviewForm] = useState({ title: '', message: '', resolutionNotes: '' })
  const [confirmReview, setConfirmReview] = useState(null)

  function addNotification(userId, complaintId, message, type) {
    nextNotifId++
    setNotifications(prev => [{
      id: nextNotifId, userId, complaintId, message, type, read: false, createdAt: new Date().toISOString()
    }, ...prev])
  }

  function openStatusConfirm(c, status) {
    setShowConfirm(c.id)
    setNewStatus(status)
  }

  function confirmStatusChange() {
    const c = list.find(x => x.id === showConfirm)
    if (!c) return
    const ts = new Date().toISOString()
    nextHistoryId++
    setList(prev => prev.map(x => x.id === showConfirm ? { ...x, status: newStatus, updatedAt: ts } : x))
    setHistory(prev => [{
      id: nextHistoryId, complaintId: showConfirm, fromStatus: c.status, toStatus: newStatus,
      changedBy: user.name, changedAt: ts
    }, ...prev])

    setShowConfirm(null)
    setNewStatus('')

    addNotification(c.userId, c.id, `Your complaint "${c.title.slice(0, 50)}..." status changed to ${STATUS_MAP[newStatus].label}`, 'status_change')

    if ((newStatus === 'resolved' || newStatus === 'rejected') && showReviewModal !== showConfirm) {
      setShowReviewModal(showConfirm)
      setReviewForm(prev => ({ ...prev, title: '', message: '', resolutionNotes: '' }))
    }
  }

  function submitReview() {
    if (!reviewForm.title.trim() || !reviewForm.message.trim()) return
    const cId = showReviewModal
    const c = list.find(x => x.id === cId)
    if (!c) return
    const ts = new Date().toISOString()
    const isNew = !reviews[cId]
    setReviews(prev => ({
      ...prev,
      [cId]: {
        id: Date.now(), complaintId: cId, title: reviewForm.title.trim(), message: reviewForm.message.trim(),
        resolutionNotes: reviewForm.resolutionNotes.trim(), adminName: user.name, createdAt: ts
      }
    }))
    setShowReviewModal(null)
    setReviewForm({ title: '', message: '', resolutionNotes: '' })
    addNotification(c.userId, c.id,
      `Admin ${isNew ? 'added' : 'updated'} a review on your complaint "${c.title.slice(0, 50)}..."`,
      isNew ? 'review_added' : 'review_updated'
    )
  }

  function deleteReview(cId) {
    const c = list.find(x => x.id === cId)
    setReviews(prev => { const r = { ...prev }; delete r[cId]; return r })
    setConfirmReview(null)
    if (c) addNotification(c.userId, cId, `Admin removed the review from complaint "${c.title.slice(0, 50)}..."`, 'review_removed')
  }

  function openReviewForExisting(c) {
    const r = reviews[c.id]
    setShowReviewModal(c.id)
    setReviewForm({
      title: r?.title || '',
      message: r?.message || '',
      resolutionNotes: r?.resolutionNotes || ''
    })
  }

  const myList = isAdmin ? list : list.filter(c => c.userId === user.id)
  const filtered = myList.filter(c => {
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
    const ts = new Date().toISOString()
    const id = nextId++
    nextHistoryId++
    setList(prev => [{
      id, userId: user.id, userName: user.name, title: form.title.trim(), category: form.category,
      description: form.description.trim(), status: 'pending', createdAt: ts, updatedAt: ts
    }, ...prev])
    setHistory(prev => [{
      id: nextHistoryId, complaintId: id, fromStatus: null, toStatus: 'pending', changedBy: user.name, changedAt: ts
    }, ...prev])
    setForm({ title: '', category: '', description: '' })
    setShowForm(false)
  }

  const counts = {
    pending: myList.filter(c => c.status === 'pending').length,
    inProgress: myList.filter(c => c.status === 'in-progress').length,
    resolved: myList.filter(c => c.status === 'resolved').length,
    total: myList.length,
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-x-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 h-16 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Complaint Management</h1>
          <button onClick={toggle} className="ml-auto p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer" aria-label="Toggle theme">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Complaints</h1>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8] mt-1">{isAdmin ? 'Manage all campus complaints.' : 'Submit and track your complaints.'}</p>
            </div>
            {!isAdmin && (
              <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-sm font-semibold bg-[#6C5CE7] text-white px-5 py-2.5 rounded-xl hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all cursor-pointer"><Plus size={17} /> New Complaint</button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Pending', value: counts.pending, dotClass: 'bg-gray-500' },
              { label: 'In Progress', value: counts.inProgress, dotClass: 'bg-blue-500' },
              { label: 'Resolved', value: counts.resolved, dotClass: 'bg-emerald-500' },
              { label: 'Total', value: counts.total, dotClass: 'bg-gray-500' },
            ].map(s => (
              <div key={s.label} className="bg-white dark:bg-[#1E293B] rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-[#94A3B8]">{s.label}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${s.dotClass}`} />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white mt-1 block">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl px-3.5 flex-1 min-w-0 max-w-xs">
              <Search size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <input type="text" placeholder="Search complaints..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-0" />
            </div>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex-wrap">
              {['all', 'pending', 'in-progress', 'under-review', 'resolved', 'rejected'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === s ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'}`}>
                  {STATUS_MAP[s].label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
              <AlertCircle size={48} className="mb-3" />
              <p className="text-sm font-medium">No complaints found.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-800/50">
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-[#94A3B8] py-3.5 px-5">ID</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-[#94A3B8] py-3.5 px-5">Title</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-[#94A3B8] py-3.5 px-5">Category</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-[#94A3B8] py-3.5 px-5">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 dark:text-[#94A3B8] py-3.5 px-5">Status</th>
                    <th className="text-right text-xs font-semibold text-gray-500 dark:text-[#94A3B8] py-3.5 px-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const s = STATUS_MAP[c.status]
                    const review = reviews[c.id]
                    const StatusIcon = c.status === 'resolved' ? CheckCircle2 : c.status === 'rejected' ? Ban : c.status === 'in-progress' ? Clock : c.status === 'under-review' ? Eye : AlertCircle
                    return (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0 dark:border-gray-800 dark:hover:bg-gray-800/50">
                        <td className="py-3.5 px-5">
                          <Link to={`/dashboard/complaints/${c.id}`} state={{ complaint: { ...c, review: reviews[c.id] || null }, history: history.filter(h => h.complaintId === c.id), user }} className="text-sm font-medium text-[#6C5CE7] dark:text-[#7C5CFF] hover:underline">{c.id}</Link>
                        </td>
                        <td className="py-3.5 px-5">
                          <Link to={`/dashboard/complaints/${c.id}`} state={{ complaint: { ...c, review: reviews[c.id] || null }, history: history.filter(h => h.complaintId === c.id), user }} className="text-sm font-semibold text-gray-900 dark:text-white block hover:text-[#6C5CE7] dark:hover:text-[#7C5CFF] transition-colors">{c.title}</Link>
                          <span className="text-xs text-gray-400 dark:text-gray-500 block mt-0.5">{c.description.slice(0, 80)}...</span>
                          {review && (
                            <span className="text-xs text-[#6C5CE7] dark:text-[#7C5CFF] block mt-1.5 italic">Review: {review.title}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-5"><span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded dark:text-gray-300 dark:bg-gray-800">{c.category}</span></td>
                        <td className="py-3.5 px-5 text-sm text-gray-500 dark:text-[#94A3B8]">{new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${s.badgeClass}`}>
                            <StatusIcon size={12} />
                            {s.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link to={`/dashboard/complaints/${c.id}`} state={{ complaint: { ...c, review: reviews[c.id] || null }, history: history.filter(h => h.complaintId === c.id), user }} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"><Eye size={13} className="inline mr-0.5" /> View</Link>
                            {isAdmin && (
                              <>
                                <div className="relative group">
                                  <button className="text-xs font-semibold text-[#6C5CE7] dark:text-[#7C5CFF] hover:bg-[#EDE9FE] dark:hover:bg-[rgba(124,92,255,0.15)] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"><Clock size={13} className="inline mr-0.5" /> Status</button>
                                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    {['pending', 'in-progress', 'under-review', 'resolved', 'rejected'].filter(st => st !== c.status).map(st => (
                                      <button key={st} onClick={() => openStatusConfirm(c, st)} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                                        <span className={`w-2 h-2 rounded-full ${STATUS_MAP[st].dotClass}`} />
                                        {STATUS_MAP[st].label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <button onClick={() => openReviewForExisting(c)} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
                                  <MessageSquare size={13} className="inline mr-0.5" /> {reviews[c.id] ? 'Edit Review' : 'Add Review'}
                                </button>
                                {reviews[c.id] && (
                                  <>
                                    <button onClick={() => { setConfirmReview(c.id) }} className="text-xs font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"><Trash2 size={13} className="inline mr-0.5" /></button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={() => { setShowConfirm(null); setNewStatus('') }}>
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl w-full max-w-sm mx-4 p-6 shadow-2xl border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500"><ShieldAlert size={22} /></div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Change Status</h2>
                  <p className="text-xs text-gray-500 dark:text-[#94A3B8]">#{showConfirm}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Are you sure you want to change status to <strong className="text-gray-900 dark:text-white">{STATUS_MAP[newStatus]?.label}</strong>?</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => { setShowConfirm(null); setNewStatus('') }} className="flex-1 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer">Cancel</button>
                <button onClick={confirmStatusChange} className="flex-1 text-sm font-semibold bg-[#6C5CE7] text-white py-2.5 rounded-xl hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all cursor-pointer">Confirm</button>
              </div>
            </div>
          </div>
        )}

        {isAdmin && showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={() => { setShowReviewModal(null); setReviewForm({ title: '', message: '', resolutionNotes: '' }) }}>
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{reviews[showReviewModal] ? 'Edit' : 'Add'} Review</h2>
                <button onClick={() => { setShowReviewModal(null); setReviewForm({ title: '', message: '', resolutionNotes: '' }) }} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800 cursor-pointer"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Review Title <span className="text-red-500">*</span></label>
                  <input type="text" value={reviewForm.title} onChange={e => setReviewForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Issue Resolved" className="w-full border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1E293B]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Review Message <span className="text-red-500">*</span></label>
                  <textarea value={reviewForm.message} onChange={e => setReviewForm(p => ({ ...p, message: e.target.value }))} placeholder="Detailed review of the resolution..." rows={3} className="w-full border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none dark:bg-[#1E293B]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Resolution Notes <span className="text-xs text-gray-400 dark:text-gray-500">(optional)</span></label>
                  <textarea value={reviewForm.resolutionNotes} onChange={e => setReviewForm(p => ({ ...p, resolutionNotes: e.target.value }))} placeholder="Internal notes about the resolution..." rows={2} className="w-full border border-gray-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none dark:bg-[#1E293B]" />
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => { setShowReviewModal(null); setReviewForm({ title: '', message: '', resolutionNotes: '' }) }} className="flex-1 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer">Cancel</button>
                  <button onClick={submitReview} className="flex-1 text-sm font-semibold bg-[#6C5CE7] text-white py-2.5 rounded-xl hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all cursor-pointer">
                    {reviews[showReviewModal] ? 'Update Review' : 'Add Review'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {confirmReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={() => setConfirmReview(null)}>
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl w-full max-w-sm mx-4 p-6 shadow-2xl border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500"><Trash2 size={22} /></div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Delete Review</h2>
                  <p className="text-xs text-gray-500 dark:text-[#94A3B8]">#{confirmReview}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Are you sure you want to delete this review? This action cannot be undone.</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setConfirmReview(null)} className="flex-1 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer">Cancel</button>
                <button onClick={() => deleteReview(confirmReview)} className="flex-1 text-sm font-semibold bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600 transition-all cursor-pointer">Delete</button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={() => setShowForm(false)}>
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Submit a Complaint</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800 cursor-pointer"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Title <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={form.title} onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })) }} placeholder="Brief title of your complaint" className={`w-full border ${errors.title ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1E293B]`} />
                  {errors.title && <span className="text-xs text-red-500 mt-1 block">{errors.title}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={form.category} onChange={e => { setForm(p => ({ ...p, category: e.target.value })); setErrors(p => ({ ...p, category: '' })) }} className={`w-full border ${errors.category ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all dark:bg-[#1E293B]`}>
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                  {errors.category && <span className="text-xs text-red-500 mt-1 block">{errors.category}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description <span className="text-red-500">*</span></label>
                  <textarea name="description" value={form.description} onChange={e => { setForm(p => ({ ...p, description: e.target.value })); setErrors(p => ({ ...p, description: '' })) }} placeholder="Describe your complaint in detail..." rows={4} className={`w-full border ${errors.description ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none dark:bg-[#1E293B]`} />
                  {errors.description && <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>}
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-[#6C5CE7] text-white py-3 rounded-xl hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all cursor-pointer"><CheckCircle2 size={17} /> Submit Complaint</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

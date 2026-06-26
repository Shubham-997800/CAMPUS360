import { useLocation, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Eye, Ban, ShieldAlert, MessageSquare, Calendar } from 'lucide-react'
import { STATUS_MAP } from './complaintData'

const SAMPLE_HISTORY = [
  { id: 1, fromStatus: null, toStatus: 'pending', changedBy: 'Rahul Sharma', changedAt: '2026-06-22T09:00:00' },
  { id: 2, fromStatus: 'pending', toStatus: 'in-progress', changedBy: 'Admin', changedAt: '2026-06-23T11:00:00' },
]

export default function ComplaintDetail() {
  const { id } = useParams()
  const { state } = useLocation()
  const user = state?.user || { id: 2, name: 'Rahul Sharma', role: 'Student' }
  const complaint = state?.complaint

  if (!complaint) {
    return (
      <div className="flex min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-x-hidden items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium text-gray-500">Complaint not found.</p>
          <Link to="/dashboard/complaints" className="text-[#6C5CE7] text-sm mt-2 inline-block hover:underline">Back to Complaints</Link>
        </div>
      </div>
    )
  }

  const s = STATUS_MAP[complaint.status]
  const StatusIcon = complaint.status === 'resolved' ? CheckCircle2 : complaint.status === 'rejected' ? Ban : complaint.status === 'in-progress' ? Clock : complaint.status === 'under-review' ? Eye : AlertCircle
  const review = complaint.review

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-x-hidden">
      <div className="flex-1 max-w-4xl mx-auto p-6 md:p-8 w-full animate-fadeIn">
        <div className="mb-6">
          <Link to="/dashboard/complaints" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-[#94A3B8] hover:text-gray-700 dark:hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Complaints
          </Link>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500">#{complaint.id}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${s?.badgeClass}`}>
                  <StatusIcon size={11} />
                  {s?.label}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{complaint.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500">Category</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{complaint.category}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500">Submitted By</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{complaint.userName || user.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500">Submitted On</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{new Date(complaint.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500">Last Updated</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{new Date(complaint.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{complaint.description}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Clock size={17} className="text-gray-400" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Status History</h2>
          </div>
          <div className="space-y-0">
            {(state?.history || SAMPLE_HISTORY).map((h, i) => (
              <div key={h.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border-2 ${STATUS_MAP[h.toStatus]?.dotClass || 'bg-gray-500'} border-white dark:border-gray-800 z-10`} />
                  {i < (state?.history || SAMPLE_HISTORY).length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700" />}
                </div>
                <div className="pb-6 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Status changed to <span className={`${STATUS_MAP[h.toStatus]?.badgeClass?.split(' ')[0]} dark:${STATUS_MAP[h.toStatus]?.badgeClass?.split(' ')[1]} font-semibold`}>{STATUS_MAP[h.toStatus]?.label}</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    by <span className="font-medium text-gray-600 dark:text-gray-300">{h.changedBy}</span> &middot; {new Date(h.changedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {review && (
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={17} className="text-emerald-500" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Admin Review</h2>
            </div>
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{review.title}</h3>
                <span className="text-xs text-gray-400 dark:text-gray-500">by {review.adminName} &middot; {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{review.message}</p>
              {review.resolutionNotes && (
                <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-900/30">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Resolution Notes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{review.resolutionNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

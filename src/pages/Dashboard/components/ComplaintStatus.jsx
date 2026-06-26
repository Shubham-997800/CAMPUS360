// ============================================
// ComplaintStatus - Horizontal progress bar showing the distribution of complaints by status
// Includes a color-coded legend with counts for Pending, In Progress, and Resolved
// ============================================

import { complaintStats } from '../data'

export default function ComplaintStatus() {
  // ── Calculate total complaints for percentage-based bar widths ──
  const total = complaintStats.pending + complaintStats.inProgress + complaintStats.resolved

  // ── Segments: Each has a label, count, and color for both bar segment and legend dot ──
  const items = [
    { label: 'Pending', value: complaintStats.pending, color: '#F59E0B' },
    { label: 'In Progress', value: complaintStats.inProgress, color: '#3B82F6' },
    { label: 'Resolved', value: complaintStats.resolved, color: '#10B981' },
  ]

  return (
    <div className="dashboard-card complaints-card">
      {/* ── Card Header: Section title + "View All" action button ── */}
      <div className="card-header">
        <h3 className="card-title">Complaint Status</h3>
        <button className="card-action">View All</button>
      </div>

      <div className="complaints-progress">
        {/* ── Segmented Progress Bar: Width of each segment is proportional to its count ── */}
        <div className="complaints-bar">
          {items.map((item) => (
            <div
              key={item.label}
              className="complaints-bar-segment"
              style={{
                width: `${(item.value / total) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>

        {/* ── Legend: Colored dot, label, and count for each status category ── */}
        <div className="complaints-legend">
          {items.map((item) => (
            <div key={item.label} className="complaints-legend-item">
              <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

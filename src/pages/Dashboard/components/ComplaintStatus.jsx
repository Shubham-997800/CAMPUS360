import { complaintStats } from '../data'

export default function ComplaintStatus() {
  const total = complaintStats.pending + complaintStats.inProgress + complaintStats.resolved

  const items = [
    { label: 'Pending', value: complaintStats.pending, color: '#F59E0B' },
    { label: 'In Progress', value: complaintStats.inProgress, color: '#3B82F6' },
    { label: 'Resolved', value: complaintStats.resolved, color: '#10B981' },
  ]

  return (
    <div className="dashboard-card complaints-card">
      <div className="card-header">
        <h3 className="card-title">Complaint Status</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="complaints-progress">
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

// ============================================
// RecentActivity - Vertical timeline of recent user actions
// Each item has a colored dot (type-specific icon + color), connector line, action text, and timestamp
// ============================================

import { recentActivity } from '../data'

// ── SVG icon paths mapped by activity type (complaint, study, event, notice, lost, profile) ──
const typeIcons = {
  complaint: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  study: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  event: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  notice: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  lost: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  profile: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
}

// ── Background colors mapped by activity type for the timeline dot ──
const typeColors = {
  complaint: '#EF4444',
  study: '#10B981',
  event: '#8B5CF6',
  notice: '#2563EB',
  lost: '#F59E0B',
  profile: '#6B7280',
}

export default function RecentActivity() {
  return (
    <div className="dashboard-card activity-card">
      {/* ── Card Header: Section title + "View All" action button ── */}
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <button className="card-action">View All</button>
      </div>

      {/* ── Timeline: Iterates over recentActivity entries to build a vertical timeline ── */}
      <div className="activity-timeline">
        {recentActivity.map((item, index) => (
          <div key={item.id} className="activity-item">
            {/* ── Timeline Line: Dot (colored circle with icon) + connector line to next item ── */}
            <div className="activity-line">
              {/* Dot: Background color determined by activity type; renders the matching SVG icon */}
              <div className="activity-dot" style={{ backgroundColor: typeColors[item.type] }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={typeIcons[item.type]} />
                </svg>
              </div>
              {/* Connector: vertical gray line; hidden on the last item */}
              {index < recentActivity.length - 1 && <div className="activity-connector"></div>}
            </div>

            {/* ── Activity Content: Action description text + relative timestamp ── */}
            <div className="activity-content">
              <p className="activity-action">{item.action}</p>
              <span className="activity-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

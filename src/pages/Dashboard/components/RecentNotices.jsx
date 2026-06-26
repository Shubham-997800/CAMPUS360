// ============================================
// RecentNotices - Displays a list of recent campus notices with dot indicator, title, date, and category badge
// ============================================

import { notices } from '../data'

export default function RecentNotices() {
  return (
    <div className="dashboard-card notices-card">
      {/* ── Card Header: Section title + "View All" action button ── */}
      <div className="card-header">
        <h3 className="card-title">Recent Notices</h3>
        <button className="card-action">View All</button>
      </div>

      {/* ── Notice List: Maps over notices array to render each notice item ── */}
      <div className="notices-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            {/* Colored dot indicator for visual hierarchy */}
            <div className="notice-dot"></div>
            <div className="notice-content">
              {/* Notice title (clickable/truncatable) */}
              <span className="notice-title">{notice.title}</span>
              {/* Meta row: formatted date + category badge with color coding */}
              <div className="notice-meta">
                <span className="notice-date">
                  {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {/* Dynamic class based on category (e.g. "academic", "library") for color styling */}
                <span className={`notice-category ${notice.category.toLowerCase()}`}>{notice.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

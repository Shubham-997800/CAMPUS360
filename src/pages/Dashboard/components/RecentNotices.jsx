import { notices } from '../data'

export default function RecentNotices() {
  return (
    <div className="dashboard-card notices-card">
      <div className="card-header">
        <h3 className="card-title">Recent Notices</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="notices-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-dot"></div>
            <div className="notice-content">
              <span className="notice-title">{notice.title}</span>
              <div className="notice-meta">
                <span className="notice-date">{new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className={`notice-category ${notice.category.toLowerCase()}`}>{notice.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TopNavbar({ onMenuToggle }) {
  return (
    <header className="dashboard-topbar">
      <button className="sidebar-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="topbar-greeting">
        <h1 className="greeting-text">Good Morning, Shubham <span className="greeting-wave">👋</span></h1>
        <p className="greeting-sub">Here's what's happening at campus today.</p>
      </div>

      <div className="topbar-search">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Search notices, events, files..." className="search-input" />
      </div>

      <div className="topbar-actions">
        <button className="topbar-icon-btn notification-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="notification-badge">3</span>
        </button>

        <div className="topbar-profile">
          <div className="profile-avatar">
            <span>S</span>
          </div>
          <div className="profile-info">
            <span className="profile-name">Shubham</span>
            <span className="profile-role">Student</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// ============================================
// StatsCards - Displays four key metric cards in a responsive grid
// Each card has a colored gradient accent, SVG icon, numeric value, label, and change indicator
// ============================================

import { stats } from '../data'

// ── SVG path data mapped to each stat key for rendering inline icons ──
const icons = {
  totalNotices: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  upcomingEvents: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  pendingComplaints: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  studyMaterials: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
}

// ── Gradient presets: Each stat card gets a unique left-accent color gradient ──
const gradients = {
  totalNotices: 'linear-gradient(135deg, #2563EB, #3B82F6)',
  upcomingEvents: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
  pendingComplaints: 'linear-gradient(135deg, #DC2626, #EF4444)',
  studyMaterials: 'linear-gradient(135deg, #059669, #10B981)',
}

export default function StatsCards() {
  return (
    <div className="stats-grid">
      {/* Iterate over stats entries and render a card for each metric */}
      {Object.entries(stats).map(([key, data]) => (
        <div key={key} className="stat-card" style={{ '--stat-gradient': gradients[key] }}>
          {/* Icon with colored gradient background */}
          <div className="stat-icon-wrapper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={icons[key]} />
            </svg>
          </div>
          {/* Value (large number) + label (description) stacked vertically */}
          <div className="stat-content">
            <span className="stat-value">{data.value}</span>
            <span className="stat-label">{data.label}</span>
          </div>
          {/* Change/delta badge (e.g. "+3 this week") */}
          <span className="stat-change">{data.change}</span>
        </div>
      ))}
    </div>
  )
}

// ============================================
// QuickActions - Row of shortcut buttons for frequent campus tasks
// Each button displays an emoji icon, a label, and applies a dynamic accent color on hover
// ============================================

import { quickActions } from '../data'

export default function QuickActions() {
  return (
    <div className="quick-actions">
      <h2 className="section-title">Quick Actions</h2>
      {/* ── Action Grid: Iterates over quickActions data to render clickable cards ── */}
      <div className="quick-actions-grid">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="quick-action-btn"
            // Dynamic CSS variable used for hover/focus accent color
            style={{ '--action-color': action.color }}
          >
            <span className="quick-action-icon">{action.icon}</span>
            <span className="quick-action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

import { quickActions } from '../data'

export default function QuickActions() {
  return (
    <div className="quick-actions">
      <h2 className="section-title">Quick Actions</h2>
      <div className="quick-actions-grid">
        {quickActions.map((action) => (
          <button key={action.id} className="quick-action-btn" style={{ '--action-color': action.color }}>
            <span className="quick-action-icon">{action.icon}</span>
            <span className="quick-action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

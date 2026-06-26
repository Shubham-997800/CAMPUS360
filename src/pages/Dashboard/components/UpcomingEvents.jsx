// ============================================
// UpcomingEvents - Displays a list of upcoming campus events with date badge, name, venue, and details button
// ============================================

import { events } from '../data'

export default function UpcomingEvents() {
  return (
    <div className="dashboard-card events-card">
      {/* ── Card Header: Section title + "View All" action button ── */}
      <div className="card-header">
        <h3 className="card-title">Upcoming Events</h3>
        <button className="card-action">View All</button>
      </div>

      {/* ── Events List: Maps over events array to render each event item ── */}
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            {/* Date badge: stacked month abbreviation + day number */}
            <div className="event-date-badge">
              <span className="event-date-month">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
              <span className="event-date-day">
                {new Date(event.date).getDate()}
              </span>
            </div>
            {/* Event name + venue and time text */}
            <div className="event-content">
              <span className="event-name">{event.name}</span>
              <span className="event-venue">{event.venue} · {event.time}</span>
            </div>
            {/* Action button to view event details */}
            <button className="event-details-btn">Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}

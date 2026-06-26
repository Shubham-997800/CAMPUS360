import { events } from '../data'

export default function UpcomingEvents() {
  return (
    <div className="dashboard-card events-card">
      <div className="card-header">
        <h3 className="card-title">Upcoming Events</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-date-badge">
              <span className="event-date-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
              <span className="event-date-day">{new Date(event.date).getDate()}</span>
            </div>
            <div className="event-content">
              <span className="event-name">{event.name}</span>
              <span className="event-venue">{event.venue} · {event.time}</span>
            </div>
            <button className="event-details-btn">Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}

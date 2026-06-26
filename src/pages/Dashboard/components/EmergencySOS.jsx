import { useState } from 'react'

export default function EmergencySOS() {
  const [activated, setActivated] = useState(false)

  function handleSOS() {
    setActivated(true)
    setTimeout(() => setActivated(false), 3000)
  }

  return (
    <div className={`emergency-sos ${activated ? 'sos-active' : ''}`}>
      <div className="sos-content">
        <h3 className="sos-title">Emergency SOS</h3>
        <p className="sos-desc">Immediate assistance available 24/7</p>
        <button
          className={`sos-button ${activated ? 'pulsing' : ''}`}
          onClick={handleSOS}
          disabled={activated}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {activated ? 'HELP EN ROUTE' : 'SOS'}
        </button>
        {activated && <span className="sos-status">Emergency alert sent to campus security</span>}
      </div>
    </div>
  )
}

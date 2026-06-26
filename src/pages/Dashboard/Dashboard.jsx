// ============================================
// Dashboard - Main layout for the Campus360 dashboard page
// Structure: fixed sidebar (left) + main area (sticky topbar + scrollable content grid)
// ============================================

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import StatsCards from './components/StatsCards'
import QuickActions from './components/QuickActions'
import RecentNotices from './components/RecentNotices'
import UpcomingEvents from './components/UpcomingEvents'
import ComplaintStatus from './components/ComplaintStatus'
import RecentActivity from './components/RecentActivity'
import './Dashboard.css'

export default function Dashboard() {
  // ── Tracks sidebar open/close state for mobile responsive overlay ──
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay: clicking closes the sidebar drawer */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Fixed left sidebar with navigation links and logout */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main">
        {/* Sticky top navbar: hamburger toggle, greeting, search bar, notification bell, user profile */}
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

        <div className="dashboard-content">
          {/* Row 1: Four stat cards showing key metrics (notices, events, complaints, materials) */}
          <StatsCards />

          {/* Row 2: Quick action buttons for common tasks (report, view, explore, etc.) */}
          <QuickActions />

          {/* Row 3: Two-column grid — left column stacks notices, complaints, activity; right column shows events */}
          <div className="dashboard-grid">
            <div className="dashboard-grid-left">
              <RecentNotices />
              <ComplaintStatus />
              <RecentActivity />
            </div>
            <div className="dashboard-grid-right">
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

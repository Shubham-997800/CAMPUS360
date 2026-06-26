import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import StatsCards from './components/StatsCards'
import QuickActions from './components/QuickActions'
import RecentNotices from './components/RecentNotices'
import UpcomingEvents from './components/UpcomingEvents'
import ComplaintStatus from './components/ComplaintStatus'
import EmergencySOS from './components/EmergencySOS'
import RecentActivity from './components/RecentActivity'
import './Dashboard.css'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar onClose={() => setSidebarOpen(false)} />
      <div className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="dashboard-content">
          <StatsCards />
          <QuickActions />
          <div className="dashboard-grid">
            <div className="dashboard-grid-left">
              <RecentNotices />
              <ComplaintStatus />
              <RecentActivity />
            </div>
            <div className="dashboard-grid-right">
              <UpcomingEvents />
              <EmergencySOS />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

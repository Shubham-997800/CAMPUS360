import { useState } from 'react'
import Sidebar from '../Dashboard/components/Sidebar'
import TopNavbar from '../Dashboard/components/TopNavbar'
import { profile, academicInfo, contactInfo, recentActivity } from './data'
import './Profile.css'

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="profile-page">
          <div className="profile-header">
            <div className="profile-header-top">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-large">
                  <span>{profile.avatarInitials}</span>
                </div>
                <button className="profile-avatar-edit" aria-label="Change photo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
              </div>
              <div className="profile-header-info">
                <h1 className="profile-name">{profile.name}</h1>
                <p className="profile-enrollment">{profile.enrollment} · {profile.course}</p>
                <div className="profile-meta">
                  <span className="profile-tag">{profile.semester} Semester</span>
                  <span className="profile-tag">{profile.email}</span>
                  <span className="profile-tag">{profile.phone}</span>
                </div>
              </div>
              <div className="profile-header-actions">
                <button className="profile-btn profile-btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Profile
                </button>
                <button className="profile-btn profile-btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <div className="profile-cards">
            <div className="profile-card">
              <div className="profile-card-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <h2 className="profile-card-title">Academic Information</h2>
              </div>
              <div className="profile-card-body">
                {academicInfo.map((item) => (
                  <div key={item.label} className="profile-info-row">
                    <span className="profile-info-label">{item.label}</span>
                    <span className="profile-info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <h2 className="profile-card-title">Contact Information</h2>
              </div>
              <div className="profile-card-body">
                {contactInfo.map((item) => (
                  <div key={item.label} className="profile-info-row">
                    <span className="profile-info-label">{item.label}</span>
                    {item.type === 'email' ? (
                      <a href={`mailto:${item.value}`} className="profile-info-value profile-info-link">{item.value}</a>
                    ) : item.type === 'phone' ? (
                      <a href={`tel:${item.value.replace(/\s/g, '')}`} className="profile-info-value profile-info-link">{item.value}</a>
                    ) : (
                      <span className="profile-info-value">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <h2 className="profile-card-title">Recent Activity</h2>
              </div>
              <div className="profile-card-body">
                <div className="profile-activity">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="profile-activity-item">
                      <span className="profile-activity-icon">{item.icon}</span>
                      <div className="profile-activity-content">
                        <span className="profile-activity-action">{item.action}</span>
                        <span className="profile-activity-time">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

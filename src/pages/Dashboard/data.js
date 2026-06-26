export const stats = {
  totalNotices: { value: 12, label: 'Total Notices', change: '+3 this week' },
  upcomingEvents: { value: 5, label: 'Upcoming Events', change: 'Next: Tomorrow' },
  pendingComplaints: { value: 3, label: 'Pending Complaints', change: '2 in progress' },
  studyMaterials: { value: 24, label: 'Study Materials', change: '4 new this week' },
}

export const quickActions = [
  { id: 1, label: 'Report Complaint', icon: '📋', color: '#EF4444' },
  { id: 2, label: 'View Notices', icon: '📢', color: '#2563EB' },
  { id: 3, label: 'Explore Events', icon: '🎉', color: '#8B5CF6' },
  { id: 4, label: 'Lost & Found', icon: '🔍', color: '#F59E0B' },
  { id: 5, label: 'Study Hub', icon: '📚', color: '#10B981' },
]

export const notices = [
  { id: 1, title: 'Final Exam Schedule Released', date: '2026-06-25', category: 'Academic' },
  { id: 2, title: 'Library Hours Extended for Exams', date: '2026-06-24', category: 'Library' },
  { id: 3, title: 'Campus Maintenance - Water Shutdown', date: '2026-06-23', category: 'Facility' },
  { id: 4, title: 'Hackathon 2026 Registrations Open', date: '2026-06-22', category: 'Events' },
  { id: 5, title: 'Hostel Fee Payment Deadline Extended', date: '2026-06-21', category: 'Finance' },
]

export const events = [
  { id: 1, name: 'Tech Symposium 2026', date: '2026-07-15', venue: 'Auditorium A', time: '10:00 AM' },
  { id: 2, name: 'Cultural Fest', date: '2026-07-20', venue: 'Open Air Theatre', time: '9:00 AM' },
  { id: 3, name: 'Workshop: AI & ML Basics', date: '2026-07-25', venue: 'CS Lab 3', time: '2:00 PM' },
  { id: 4, name: 'Sports Meet 2026', date: '2026-08-01', venue: 'Sports Complex', time: '7:00 AM' },
]

export const complaintStats = {
  pending: 3,
  inProgress: 2,
  resolved: 15,
}

export const recentActivity = [
  { id: 1, action: 'Submitted complaint about Wi-Fi connectivity', time: '2 hours ago', type: 'complaint' },
  { id: 2, action: 'Downloaded "Data Structures" study material', time: '4 hours ago', type: 'study' },
  { id: 3, action: 'Registered for Tech Symposium 2026', time: '1 day ago', type: 'event' },
  { id: 4, action: 'Viewed notice: Final Exam Schedule Released', time: '1 day ago', type: 'notice' },
  { id: 5, action: 'Reported lost item: Blue Hoodie', time: '2 days ago', type: 'lost' },
  { id: 6, action: 'Updated profile information', time: '3 days ago', type: 'profile' },
  { id: 7, action: 'Complaint #1042 marked as resolved', time: '3 days ago', type: 'complaint' },
]

// ============================================
// Profile data - Mock data for the user profile page
// profile: basic user info (name, enrollment, course, semester, contact, avatar)
// academicInfo: array of label-value pairs for the Academic Information card
// contactInfo: array of label-value-type entries for the Contact Information card
//              (type: 'email' | 'phone' | 'text' controls link rendering)
// recentActivity: timeline entries with action text, relative time, and emoji icon
// ============================================

export const profile = {
  name: 'Shubham Verma',
  enrollment: '2024CS056',
  course: 'B.Tech Computer Science & Engineering',
  semester: '4th',
  email: 'shubham@campus360.edu',
  phone: '+91 98765 43210',
  avatar: null,
  avatarInitials: 'SV',
}

export const academicInfo = [
  { label: 'Program', value: 'Bachelor of Technology (B.Tech)' },
  { label: 'Branch', value: 'Computer Science & Engineering' },
  { label: 'Current Semester', value: '4th Semester' },
  { label: 'Batch', value: '2024 - 2028' },
  { label: 'Roll Number', value: '2024CS056' },
  { label: 'Section', value: 'A' },
  { label: 'CGPA', value: '8.76 / 10' },
  { label: 'Attendance', value: '92%' },
]

export const contactInfo = [
  { label: 'Email Address', value: 'shubham@campus360.edu', type: 'email' },
  { label: 'Phone Number', value: '+91 98765 43210', type: 'phone' },
  { label: 'Alternate Email', value: 'shubham.verma@gmail.com', type: 'email' },
  { label: 'Address', value: 'Room 204, Block C, University Hostel, Campus Area', type: 'text' },
  { label: 'Guardian Name', value: 'Mr. Rajesh Verma' },
  { label: 'Guardian Phone', value: '+91 98765 12345', type: 'phone' },
]

export const recentActivity = [
  { id: 1, action: 'Downloaded "Data Structures" notes', time: '2 hours ago', icon: '📖' },
  { id: 2, action: 'Registered for Tech Symposium 2026', time: '5 hours ago', icon: '🎉' },
  { id: 3, action: 'Submitted complaint about Wi-Fi connectivity', time: '1 day ago', icon: '📋' },
  { id: 4, action: 'Updated profile picture', time: '3 days ago', icon: '🖼️' },
  { id: 5, action: 'Viewed exam schedule for 4th semester', time: '4 days ago', icon: '📅' },
  { id: 6, action: 'Changed hostel room to Block C, Room 204', time: '1 week ago', icon: '🏠' },
]

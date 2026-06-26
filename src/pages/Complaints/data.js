// ============================================
// Complaints data - Mock data for complaint management
// complaintCategories: options for the new complaint form dropdown
// complaints: list of submitted complaints with id, title, category, description,
//             status (pending / in-progress / resolved), date, attachments
// statusFilters: button labels for the segmented filter control
// statusConfig: maps status key to display label, color, and background color
// ============================================

export const complaintCategories = [
  'Academic',
  'Facility',
  'Hostel',
  'Library',
  'Transport',
  'Food & Mess',
  'IT Services',
  'Other',
]

export const complaints = [
  {
    id: 1001,
    title: 'Wi-Fi connectivity issue in CS Block',
    category: 'IT Services',
    description: 'The Wi-Fi network in the Computer Science block has been extremely slow for the past week. Students are unable to access online resources for their projects.',
    status: 'in-progress',
    date: '2026-07-22',
    attachments: [],
  },
  {
    id: 1002,
    title: 'Broken bench in Classroom 203',
    category: 'Facility',
    description: 'The wooden bench near the window in Classroom 203 is broken and needs immediate repair. It has been in this condition for over 10 days.',
    status: 'pending',
    date: '2026-07-24',
    attachments: [],
  },
  {
    id: 1003,
    title: 'Hostel water supply issue',
    category: 'Hostel',
    description: 'Block C of the men\'s hostel has irregular water supply between 8 PM and 10 PM. Residents are facing difficulties during study hours.',
    status: 'resolved',
    date: '2026-07-18',
    attachments: [],
  },
  {
    id: 1004,
    title: 'Library fine incorrectly charged',
    category: 'Library',
    description: 'I returned "Introduction to Algorithms" on June 30 but a fine of Rs. 50 has been charged for late return. Please review and reverse the charge.',
    status: 'in-progress',
    date: '2026-07-20',
    attachments: [],
  },
  {
    id: 1005,
    title: 'Bus route change request',
    category: 'Transport',
    description: 'Requesting an additional stop near the city railway station for the 5:30 PM shuttle. Many students miss the connection and have to wait for an hour.',
    status: 'pending',
    date: '2026-07-25',
    attachments: [],
  },
  {
    id: 1006,
    title: 'Poor quality of food in Mess B',
    category: 'Food & Mess',
    description: 'The quality of food served in Mess B has deteriorated significantly. Several students have reported stomach issues after meals over the past week.',
    status: 'in-progress',
    date: '2026-07-21',
    attachments: [],
  },
  {
    id: 1007,
    title: 'Exam timetable clash',
    category: 'Academic',
    description: 'Two of my exams are scheduled at the same time on August 15 - Computer Networks and Digital Electronics. Kindly reschedule one of them.',
    status: 'resolved',
    date: '2026-07-15',
    attachments: [],
  },
  {
    id: 1008,
    title: 'AC not working in Seminar Hall',
    category: 'Facility',
    description: 'The air conditioning in Seminar Hall B has not been working for three days. Several workshops are scheduled and the hall becomes unbearable.',
    status: 'pending',
    date: '2026-07-26',
    attachments: [],
  },
  {
    id: 1009,
    title: 'Attendance portal down',
    category: 'IT Services',
    description: 'The student attendance portal has been inaccessible since yesterday. Unable to mark attendance for today\'s lectures. Faculty have been notified.',
    status: 'resolved',
    date: '2026-07-19',
    attachments: [],
  },
  {
    id: 1010,
    title: 'Request for course drop',
    category: 'Academic',
    description: 'I wish to drop the elective course "Advanced Database Systems" as I am unable to manage the workload this semester. Please guide on the procedure.',
    status: 'in-progress',
    date: '2026-07-23',
    attachments: [],
  },
]

export const statusFilters = ['All', 'Pending', 'In Progress', 'Resolved']

export const statusConfig = {
  pending: { label: 'Pending', color: '#F59E0B', bg: '#FFFBEB' },
  'in-progress': { label: 'In Progress', color: '#3B82F6', bg: '#EFF6FF' },
  resolved: { label: 'Resolved', color: '#10B981', bg: '#F0FDF4' },
}

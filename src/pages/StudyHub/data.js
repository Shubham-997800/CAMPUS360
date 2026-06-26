// ============================================
// StudyHub data - Mock data for study resources
// semesters: dropdown filter options (1st through 8th + All)
// sections: tab definitions (key, label, SVG icon path)
// resources: array of study materials with id, subject, semester, type, downloads
// typeGradients: maps resource type to CSS gradient for card accent bar
// typeIcons: maps resource type to emoji icon
// typeLabels: maps resource type to human-readable label
// ============================================

export const semesters = ['All', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']

export const sections = [
  { key: 'notes', label: 'Notes', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { key: 'papers', label: 'Prev Year Papers', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key: 'assignments', label: 'Assignments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { key: 'syllabus', label: 'Syllabus', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2M7 10h2m-2 4h6m-6 4h6' },
]

export const resources = [
  // --- Notes ---
  { id: 1, subject: 'Data Structures & Algorithms', semester: '3rd', type: 'notes', downloads: 342 },
  { id: 2, subject: 'Operating Systems', semester: '3rd', type: 'notes', downloads: 287 },
  { id: 3, subject: 'Database Management Systems', semester: '4th', type: 'notes', downloads: 415 },
  { id: 4, subject: 'Computer Networks', semester: '5th', type: 'notes', downloads: 298 },
  { id: 5, subject: 'Software Engineering', semester: '5th', type: 'notes', downloads: 256 },
  { id: 6, subject: 'Machine Learning', semester: '6th', type: 'notes', downloads: 523 },
  { id: 7, subject: 'Compiler Design', semester: '6th', type: 'notes', downloads: 189 },
  { id: 8, subject: 'Artificial Intelligence', semester: '7th', type: 'notes', downloads: 378 },
  { id: 9, subject: 'Discrete Mathematics', semester: '2nd', type: 'notes', downloads: 301 },
  { id: 10, subject: 'Engineering Mathematics I', semester: '1st', type: 'notes', downloads: 445 },

  // --- Previous Year Papers ---
  { id: 11, subject: 'Data Structures & Algorithms', semester: '3rd', type: 'papers', downloads: 512 },
  { id: 12, subject: 'Operating Systems', semester: '3rd', type: 'papers', downloads: 423 },
  { id: 13, subject: 'Database Management Systems', semester: '4th', type: 'papers', downloads: 389 },
  { id: 14, subject: 'Computer Networks', semester: '5th', type: 'papers', downloads: 356 },
  { id: 15, subject: 'Software Engineering', semester: '5th', type: 'papers', downloads: 278 },
  { id: 16, subject: 'Machine Learning', semester: '6th', type: 'papers', downloads: 198 },
  { id: 17, subject: 'Engineering Mathematics I', semester: '1st', type: 'papers', downloads: 467 },
  { id: 18, subject: 'Discrete Mathematics', semester: '2nd', type: 'papers', downloads: 334 },

  // --- Assignments ---
  { id: 19, subject: 'Data Structures & Algorithms', semester: '3rd', type: 'assignments', downloads: 234 },
  { id: 20, subject: 'Operating Systems', semester: '3rd', type: 'assignments', downloads: 198 },
  { id: 21, subject: 'Database Management Systems', semester: '4th', type: 'assignments', downloads: 267 },
  { id: 22, subject: 'Computer Networks', semester: '5th', type: 'assignments', downloads: 189 },
  { id: 23, subject: 'Machine Learning', semester: '6th', type: 'assignments', downloads: 312 },
  { id: 24, subject: 'Artificial Intelligence', semester: '7th', type: 'assignments', downloads: 245 },
  { id: 25, subject: 'Engineering Mathematics I', semester: '1st', type: 'assignments', downloads: 356 },

  // --- Syllabus ---
  { id: 26, subject: 'Computer Science (CSE)', semester: 'All', type: 'syllabus', downloads: 891 },
  { id: 27, subject: 'Information Technology', semester: 'All', type: 'syllabus', downloads: 654 },
  { id: 28, subject: 'Electronics & Communication', semester: 'All', type: 'syllabus', downloads: 523 },
  { id: 29, subject: 'Mechanical Engineering', semester: 'All', type: 'syllabus', downloads: 478 },
  { id: 30, subject: 'Civil Engineering', semester: 'All', type: 'syllabus', downloads: 412 },
]

export const typeGradients = {
  notes: 'linear-gradient(135deg, #2563EB, #3B82F6)',
  papers: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
  assignments: 'linear-gradient(135deg, #059669, #10B981)',
  syllabus: 'linear-gradient(135deg, #D97706, #F59E0B)',
}

export const typeIcons = {
  notes: '📖',
  papers: '📝',
  assignments: '📋',
  syllabus: '📄',
}

export const typeLabels = {
  notes: 'Notes',
  papers: 'Prev Year Paper',
  assignments: 'Assignment',
  syllabus: 'Syllabus',
}

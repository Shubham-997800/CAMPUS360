import { useState } from 'react'
import { Search, Menu, BookOpen, FileText, ClipboardList, Library, Download, ChevronDown } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'

const RESOURCES = [
  { id: 1, type: 'notes', subject: 'Data Structures', semester: '3rd', downloads: 156 },
  { id: 2, type: 'notes', subject: 'Database Management Systems', semester: '4th', downloads: 98 },
  { id: 3, type: 'notes', subject: 'Computer Networks', semester: '5th', downloads: 142 },
  { id: 4, type: 'notes', subject: 'Operating Systems', semester: '4th', downloads: 87 },
  { id: 5, type: 'papers', subject: 'Data Structures', semester: '3rd', downloads: 234 },
  { id: 6, type: 'papers', subject: 'DBMS', semester: '4th', downloads: 189 },
  { id: 7, type: 'papers', subject: 'Computer Networks', semester: '5th', downloads: 167 },
  { id: 8, type: 'papers', subject: 'Software Engineering', semester: '6th', downloads: 145 },
  { id: 9, type: 'assignments', subject: 'Web Development', semester: '5th', downloads: 78 },
  { id: 10, type: 'assignments', subject: 'Python Programming', semester: '3rd', downloads: 112 },
  { id: 11, type: 'assignments', subject: 'Machine Learning', semester: '6th', downloads: 65 },
  { id: 12, type: 'assignments', subject: 'Compiler Design', semester: '6th', downloads: 43 },
  { id: 13, type: 'syllabus', subject: 'Computer Science (All Semesters)', semester: 'All', downloads: 412 },
  { id: 14, type: 'syllabus', subject: 'Information Technology (All Semesters)', semester: 'All', downloads: 298 },
]

const SECTIONS = [
  { key: 'notes', label: 'Notes', icon: BookOpen, color: '#2563EB', bg: '#DBEAFE' },
  { key: 'papers', label: 'Prev Year Papers', icon: FileText, color: '#7C3AED', bg: '#EDE9FE' },
  { key: 'assignments', label: 'Assignments', icon: ClipboardList, color: '#059669', bg: '#D1FAE5' },
  { key: 'syllabus', label: 'Syllabus', icon: Library, color: '#DC2626', bg: '#FEE2E2' },
]

const SEMESTERS = ['All', '3rd', '4th', '5th', '6th']

export default function StudyHub() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('notes')
  const [search, setSearch] = useState('')
  const [semester, setSemester] = useState('All')

  const filtered = RESOURCES.filter(r => {
    const matchTab = r.type === tab
    const matchSem = semester === 'All' || r.semester === semester
    const matchSearch = r.subject.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSem && matchSearch
  })

  const currentSection = SECTIONS.find(s => s.key === tab)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 py-4 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Study Hub</h1>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">
          {/* ── Header ── */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Study Hub</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Access notes, previous year papers, assignments, and syllabus.</p>
          </div>

          {/* ── Section Tabs ── */}
          <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex-wrap">
            {SECTIONS.map(s => {
              const Icon = s.icon
              const count = RESOURCES.filter(r => r.type === s.key).length
              return (
                <button key={s.key} onClick={() => { setTab(s.key); setSearch(''); setSemester('All') }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${tab === s.key ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}>
                  <Icon size={16} />
                  {s.label}
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full font-bold dark:bg-gray-700 dark:text-gray-300">{count}</span>
                </button>
              )
            })}
          </div>

          {/* ── Toolbar ── */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 flex-1 min-w-0 max-w-xs dark:bg-gray-900 dark:border-gray-700/50">
              <Search size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <input type="text" placeholder={`Search ${currentSection?.label.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-0" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 dark:bg-gray-900 dark:border-gray-700/50">
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <select value={semester} onChange={e => setSemester(e.target.value)} className="bg-transparent border-none outline-none py-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
                {SEMESTERS.map(s => <option key={s}>{s === 'All' ? 'All Semesters' : `${s} Semester`}</option>)}
              </select>
            </div>
          </div>

          {/* ── Resource Grid ── */}
          {filtered.length === 0 ? (
            <EmptyState message="No resources found." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(r => (
                <div key={r.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all dark:bg-gray-900 dark:border-gray-700/50 dark:shadow-sm dark:shadow-black/5">
                  <div className="h-1.5" style={{ backgroundColor: currentSection?.color }} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color: currentSection?.color, backgroundColor: currentSection?.bg }}>{currentSection?.label}</span>
                      {r.semester !== 'All' && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded dark:text-gray-400 dark:bg-gray-800">{r.semester} Sem</span>}
                      {r.semester === 'All' && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded dark:text-gray-400 dark:bg-gray-800">All Semesters</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{r.subject}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <Download size={13} />
                      <span>{r.downloads} downloads</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer"><Download size={15} /> Download</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

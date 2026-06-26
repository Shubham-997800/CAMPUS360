import { useState } from 'react'
import { Search, Menu, BookOpen, FileText, ClipboardList, Library, Download, ChevronDown, Sun, Moon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'
import { useTheme } from '../context/ThemeContext'

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
  { key: 'notes', label: 'Notes', icon: BookOpen, barClass: 'bg-[#6C5CE7]', badgeClass: 'text-[#6C5CE7] bg-[#EDE9FE] dark:text-[#7C5CFF] dark:bg-[rgba(124,92,255,0.15)]' },
  { key: 'papers', label: 'Prev Year Papers', icon: FileText, barClass: 'bg-[#7C3AED]', badgeClass: 'text-[#7C3AED] bg-[#EDE9FE] dark:text-[#7C5CFF] dark:bg-[rgba(124,92,255,0.15)]' },
  { key: 'assignments', label: 'Assignments', icon: ClipboardList, barClass: 'bg-[#059669]', badgeClass: 'text-[#059669] bg-[#D1FAE5] dark:text-green-400 dark:bg-green-950/40' },
  { key: 'syllabus', label: 'Syllabus', icon: Library, barClass: 'bg-[#DC2626]', badgeClass: 'text-[#DC2626] bg-[#FEE2E2] dark:text-red-400 dark:bg-red-950/40' },
]

const SEMESTERS = ['All', '3rd', '4th', '5th', '6th']

export default function StudyHub() {
  const { dark, toggle } = useTheme()
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
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 h-16 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Study Hub</h1>
          <button onClick={toggle} className="ml-auto p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer" aria-label="Toggle theme">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Study Hub</h1>
            <p className="text-sm text-gray-500 dark:text-[#94A3B8] mt-1">Access notes, previous year papers, assignments, and syllabus.</p>
          </div>

          <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex-wrap">
            {SECTIONS.map(s => {
              const Icon = s.icon
              const count = RESOURCES.filter(r => r.type === s.key).length
              return (
                <button key={s.key} onClick={() => { setTab(s.key); setSearch(''); setSemester('All') }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${tab === s.key ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'}`}>
                  <Icon size={16} />
                  {s.label}
                  <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full font-bold dark:bg-gray-700 dark:text-gray-300">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl px-3.5 flex-1 min-w-0 max-w-xs">
              <Search size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <input type="text" placeholder={`Search ${currentSection?.label.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-0" />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl px-3.5">
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <select value={semester} onChange={e => setSemester(e.target.value)} className="bg-transparent border-none outline-none py-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
                {SEMESTERS.map(s => <option key={s}>{s === 'All' ? 'All Semesters' : `${s} Semester`}</option>)}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState message="No resources found." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(r => (
                <div key={r.id} className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:bg-gray-50/50 dark:hover:bg-white/[0.03] transition-all">
                  <div className={`h-1.5 ${currentSection?.barClass}`} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${currentSection?.badgeClass}`}>{currentSection?.label}</span>
                      {r.semester !== 'All' && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded dark:text-gray-400 dark:bg-gray-800">{r.semester} Sem</span>}
                      {r.semester === 'All' && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded dark:text-gray-400 dark:bg-gray-800">All Semesters</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{r.subject}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#94A3B8] mb-4">
                      <Download size={13} />
                      <span>{r.downloads} downloads</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white py-2.5 rounded-xl hover:from-violet-700 hover:to-cyan-600 dark:from-violet-500 dark:to-cyan-400 dark:hover:from-violet-600 dark:hover:to-cyan-500 transition-all cursor-pointer"><Download size={15} /> Download</button>
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

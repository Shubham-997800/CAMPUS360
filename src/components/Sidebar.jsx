import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Bell, CalendarDays, MessageSquareWarning, PackageSearch, BookOpen, UserRound, LogOut, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/notices-events', label: 'Notices & Events', icon: CalendarDays },
  { to: '/dashboard/complaints', label: 'Complaints', icon: MessageSquareWarning },
  { to: '/dashboard/lost-found', label: 'Lost & Found', icon: PackageSearch },
  { to: '/dashboard/study-hub', label: 'Study Hub', icon: BookOpen },
  { to: '/dashboard/profile', label: 'Profile', icon: UserRound },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2.5 px-6 py-[22px] border-b border-gray-200 dark:border-gray-800">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path d="M8 22V12L16 6L24 12V22H20V16L16 20L12 16V22H8Z" fill="white" />
          </svg>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Campus<span className="text-blue-600">360</span></span>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.exact} onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`
              }>
              <item.icon size={20} strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 space-y-1 border-t border-gray-200 dark:border-gray-800">
          <button onClick={toggle} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all cursor-pointer">
            {dark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />} {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={() => { navigate('/'); onClose() }} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer">
            <LogOut size={20} strokeWidth={2} /> Logout
          </button>
        </div>
      </aside>
    </>
  )
}

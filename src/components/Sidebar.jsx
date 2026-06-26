import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Bell, CalendarDays, MessageSquareWarning, PackageSearch, BookOpen, UserRound, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'

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
  useTheme()
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-white/10 z-50 flex flex-col transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-200 dark:border-white/10">
          <Logo size={32} />
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Nex<span className="text-[#6C5CE7] dark:text-[#7C5CFF]">Campus</span></span>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.exact} onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-[#EDE9FE] dark:bg-[rgba(124,92,255,0.15)] text-[#6C5CE7] dark:text-[#7C5CFF] font-semibold' : 'text-gray-500 dark:text-[#94A3B8] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`
              }>
              <item.icon size={20} strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 space-y-1 border-t border-gray-200 dark:border-white/10">
          <button onClick={() => { navigate('/'); onClose() }} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all cursor-pointer">
            <LogOut size={20} strokeWidth={2} /> Logout
          </button>
        </div>
      </aside>
    </>
  )
}

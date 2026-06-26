import { useState } from 'react'
import { Search, Plus, Menu, X, MapPin, CalendarDays, ChevronDown, Sun, Moon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const LOST_ITEMS = [
  { id: 1, name: 'Black Water Bottle', category: 'Bottles', date: '2026-06-24', location: 'Library, 2nd Floor', description: 'Black Milton water bottle with a white stripe. Left near the reading area.', bgClass: 'bg-[#6C5CE7]', icon: '🧴' },
  { id: 2, name: 'Blue Umbrella', category: 'Accessories', date: '2026-06-23', location: 'Canteen', description: 'Blue foldable umbrella with a wooden handle. Forgot near the counter.', bgClass: 'bg-[#EC4899]', icon: '☂️' },
  { id: 3, name: 'Scientific Calculator', category: 'Electronics', date: '2026-06-22', location: 'Room 204', description: 'Casio fx-991ES Plus calculator in a black case. Lost during lecture.', bgClass: 'bg-[#3B82F6]', icon: '🔢' },
  { id: 4, name: 'ID Card', category: 'Documents', date: '2026-06-21', location: 'Sports Complex', description: 'Student ID card with name Shubham. Lost near basketball court.', bgClass: 'bg-[#10B981]', icon: '🪪' },
]

const FOUND_ITEMS = [
  { id: 5, name: 'Red Notebook', category: 'Stationery', date: '2026-06-25', location: 'Auditorium', description: 'Red spiral notebook with Calculus notes. Found under seat A12.', bgClass: 'bg-[#F59E0B]', icon: '📓' },
  { id: 6, name: 'Wireless Mouse', category: 'Electronics', date: '2026-06-24', location: 'CS Lab 1', description: 'Logitech wireless mouse, white color. Found near computer 8.', bgClass: 'bg-[#8B5CF6]', icon: '🖱️' },
  { id: 7, name: 'Keys', category: 'Accessories', date: '2026-06-23', location: 'Main Gate', description: 'Set of 3 keys with a blue keychain. Found near the security booth.', bgClass: 'bg-[#F97316]', icon: '🔑' },
]

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Bottles', 'Documents', 'Stationery', 'Clothing', 'Other']

export default function LostFound() {
  const { dark, toggle } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('lost')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [lostList, setLostList] = useState(LOST_ITEMS)
  const [form, setForm] = useState({ name: '', category: '', location: '', description: '' })
  const [errors, setErrors] = useState({})

  const currentList = tab === 'lost' ? lostList : FOUND_ITEMS
  const filtered = currentList.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || item.category === filter
    return matchSearch && matchFilter
  })

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Item name is required'
    if (!form.category) errs.category = 'Select a category'
    if (!form.location.trim()) errs.location = 'Location is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    else if (form.description.trim().length < 20) errs.description = 'At least 20 characters'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLostList(prev => [{
      id: Math.max(...prev.map(i => i.id), 0) + 1,
      name: form.name.trim(),
      category: form.category,
      date: new Date().toISOString().split('T')[0],
      location: form.location.trim(),
      description: form.description.trim(),
      bgClass: 'bg-[#6C5CE7]',
      icon: '🔍',
    }, ...prev])
    setForm({ name: '', category: '', location: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-x-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 md:px-8 h-16 bg-white/85 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/85 dark:border-gray-700/50">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"><Menu size={22} /></button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Lost & Found</h1>
          <button onClick={toggle} className="ml-auto p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer" aria-label="Toggle theme">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full animate-fadeIn">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Lost & Found</h1>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8] mt-1">Report lost items or help others find theirs.</p>
            </div>
            <button onClick={() => { setShowForm(true); setTab('lost') }} className="flex items-center gap-2 text-sm font-semibold bg-[#6C5CE7] text-white px-5 py-2.5 rounded-xl hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all cursor-pointer"><Plus size={17} /> Report Lost Item</button>
          </div>

          <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
            {[
              { key: 'lost', label: 'Lost Items', count: lostList.length },
              { key: 'found', label: 'Found Items', count: FOUND_ITEMS.length },
            ].map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); setSearch(''); setFilter('All') }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${tab === t.key ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'}`}>
                {t.label}
                <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full font-bold dark:bg-gray-700 dark:text-gray-300">{t.count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl px-3.5 flex-1 min-w-0 max-w-xs">
              <Search size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-0" />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 rounded-xl px-3.5">
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent border-none outline-none py-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
              <Search size={48} className="mb-3" />
              <p className="text-sm font-medium">No items found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(item => (
                <div key={item.id} className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:bg-gray-50/50 dark:hover:bg-white/[0.03] transition-all">
                  <div className={`h-28 relative flex items-center justify-center p-4 ${item.bgClass}`}>
                    <span className="text-5xl">{item.icon}</span>
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${tab === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{tab === 'lost' ? 'Lost' : 'Found'}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{item.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#94A3B8] mb-1.5">
                      <span className="flex items-center gap-1"><CalendarDays size={12} /> {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      {item.category !== 'All' && <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium dark:bg-gray-800 dark:text-gray-300">{item.category}</span>}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-[#94A3B8] mb-2"><MapPin size={12} /> {item.location}</div>
                    <p className="text-xs text-gray-500 dark:text-[#94A3B8] leading-relaxed mb-4">{item.description}</p>
                    <button className="w-full text-xs font-semibold bg-[#6C5CE7] text-white hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] py-2 rounded-xl transition-all cursor-pointer">Contact Admin</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={() => setShowForm(false)}>
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Report a Lost Item</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800 cursor-pointer"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Item Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })) }} placeholder="e.g. Black Water Bottle" className={`w-full border ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1E293B]`} />
                  {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select value={form.category} onChange={e => { setForm(p => ({ ...p, category: e.target.value })); setErrors(p => ({ ...p, category: '' })) }} className={`w-full border ${errors.category ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all dark:bg-[#1E293B]`}>
                    <option value="">Select a category</option>
                    {CATEGORIES.filter(c => c !== 'All').map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                  {errors.category && <span className="text-xs text-red-500 mt-1 block">{errors.category}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Last Seen Location <span className="text-red-500">*</span></label>
                  <input type="text" value={form.location} onChange={e => { setForm(p => ({ ...p, location: e.target.value })); setErrors(p => ({ ...p, location: '' })) }} placeholder="e.g. Library, 2nd Floor" className={`w-full border ${errors.location ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1E293B]`} />
                  {errors.location && <span className="text-xs text-red-500 mt-1 block">{errors.location}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description <span className="text-red-500">*</span></label>
                  <textarea value={form.description} onChange={e => { setForm(p => ({ ...p, description: e.target.value })); setErrors(p => ({ ...p, description: '' })) }} placeholder="Describe the item in detail (color, brand, distinguishing features)..." rows={3} className={`w-full border ${errors.description ? 'border-red-400' : 'border-gray-200 dark:border-white/10'} rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C5CE7] dark:focus:border-[#7C5CFF] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none dark:bg-[#1E293B]`} />
                  {errors.description && <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>}
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-[#6C5CE7] text-white py-3 rounded-xl hover:bg-[#5B4BD6] dark:bg-[#7C5CFF] dark:hover:bg-[#6B4BEE] transition-all cursor-pointer">Submit Report</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function StatCard({ icon: Icon, value, label, change, color = '#2563EB' }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="absolute top-0 left-0 w-1 h-full rounded-r" style={{ background: color }} />
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: color }}>
        {Icon && <Icon size={22} strokeWidth={2.5} />}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none">{value}</span>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      {change && <span className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full whitespace-nowrap">{change}</span>}
    </div>
  )
}

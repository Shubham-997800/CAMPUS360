import { SearchX } from 'lucide-react'

export default function EmptyState({ message = 'No data found.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <SearchX size={48} strokeWidth={1.5} />
      <p className="mt-4 text-sm font-medium">{message}</p>
    </div>
  )
}

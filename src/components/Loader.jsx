import { Loader2 } from 'lucide-react'

export default function Loader({ size = 32 }) {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 size={size} className="text-blue-600 animate-spin" strokeWidth={2} />
    </div>
  )
}

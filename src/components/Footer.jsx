import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-gray-900 dark:text-white">
            <Logo size={28} />
            <span>Nex<span className="text-[#6C5CE7] dark:text-[#7C5CFF]">Campus</span></span>
          </Link>
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with <Heart size={13} className="text-red-400 fill-red-400" /> by the NexCampus Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

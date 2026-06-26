import { useTheme } from '../context/ThemeContext'
import whiteLogo from '../assets/WHITE.jpeg'
import darkLogo from '../assets/DARK.jpeg'

export default function Logo({ className = 'h-8 w-auto' }) {
  const { dark } = useTheme()
  return (
    <img
      src={dark ? darkLogo : whiteLogo}
      alt="NexCampus"
      className={`object-contain ${className}`}
    />
  )
}

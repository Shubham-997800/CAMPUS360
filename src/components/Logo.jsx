import { useTheme } from '../context/ThemeContext'

export default function Logo({ size = 32, inverted = false }) {
  const { dark } = useTheme()

  if (inverted) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="white" />
        <path d="M9 23V9H12.5L18.5 18.5V9H22V23H18.5L12.5 13.5V23H9Z" fill="#6C5CE7" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" className="fill-[#6C5CE7] dark:fill-[#7C5CFF]" />
      <path d="M9 23V9H12.5L18.5 18.5V9H22V23H18.5L12.5 13.5V23H9Z" className="fill-white" />
    </svg>
  )
}

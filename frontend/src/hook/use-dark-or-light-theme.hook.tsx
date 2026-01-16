import { useEffect, useState } from 'react'

const getDeviceTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches

export const useDarkOrLightTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return getDeviceTheme()
  })

  /* Apply theme */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  /* Listen to OS theme changes */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  /* Optional manual override (session-only) */
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return {
    darkMode,
    toggleDarkMode,
  }
}

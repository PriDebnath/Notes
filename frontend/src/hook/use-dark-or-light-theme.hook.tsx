import { useEffect, useState } from "react"

type ThemeMode = "system" | "light" | "dark"

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>("system")
  const [isDark, setIsDark] = useState(false)

  /* Resolve actual theme */
  useEffect(() => {
    if (typeof window === "undefined") return

    const resolvedDark =
      theme === "dark"
        ? true
        : theme === "light"
        ? false
        : getSystemTheme()

    setIsDark(resolvedDark)
    document.documentElement.classList.toggle("dark", resolvedDark)
  }, [theme])

  /* Listen to OS changes (only when system mode) */
  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const handler = () => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", media.matches)
        setIsDark(media.matches)
      }
    }

    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme])

  return {
    theme,        // "system" | "light" | "dark"
    setTheme,
    isDark,       // resolved boolean (useful)
  }
}

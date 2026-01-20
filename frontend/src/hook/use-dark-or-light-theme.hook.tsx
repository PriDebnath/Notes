
export type ThemeMode = "system" | "light" | "dark"

export const themeModes = ["system" , "light" , "dark"]

import { useEffect } from "react"
import { useThemeStore } from "@/store/use-theme.store"

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches

export const useApplyTheme = () => {
  const { theme, setIsDark } = useThemeStore()

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

  /* Listen to OS changes (system mode only) */
  useEffect(() => {
    if (typeof window === "undefined") return

    if (theme !== "system") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const handler = () => {
      setIsDark(media.matches)
      document.documentElement.classList.toggle("dark", media.matches)
    }

    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme])
}

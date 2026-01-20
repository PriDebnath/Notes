import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ThemeMode = "system" | "light" | "dark"

type ThemeStore = {
  theme: ThemeMode
  isDark: boolean
  setTheme: (theme: ThemeMode) => void
  setIsDark: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      isDark: false,
      setTheme: (theme) => set({ theme }),
      setIsDark: (isDark) => set({ isDark }),
    }),
    {
      name: "app_appearance",
    }
  )
)

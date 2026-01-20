import { create } from "zustand"
import { persist } from "zustand/middleware"
import { colorThemes, type ColorTheme } from "@/hook/use-color-theme.hook";


type ColorThemeStore = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

export const useColorThemeStore = create<ColorThemeStore>()(
  persist(
    (set) => ({
      colorTheme: "theme-rose",
      setColorTheme: (colorTheme) => set({ colorTheme }),
    }),
    {
      name: "app_theme", // localStorage key
    }
  )
)

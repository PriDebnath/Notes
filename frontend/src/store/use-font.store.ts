import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Font =
  | "font-normal" // system / default font
  | "font-merienda"
  | "font-gabriela"
  | "font-playwrite-de-grund"

export const fonts: Font[] = [
  "font-normal",
  "font-merienda",
  "font-gabriela",
  "font-playwrite-de-grund",
]

type Store = {
  font: Font;
  setFont: (font: Font) => void
}

export const useFontStore = create<Store>()(
  persist(
    (set) => ({
      // default to system / app default font
      font: "font-normal",
      setFont: (font) => set({ font })
    }),
    {
      name: "app_font"
    }
  )
)
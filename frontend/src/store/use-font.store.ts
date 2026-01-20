import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Font = "font-merienda" | "font-gabriela" | "font-playwrite-de-grund"

export const fonts: Font[] = ["font-merienda", "font-gabriela", "font-playwrite-de-grund"]

type Store = {
  font: Font;
  setFont: (font: Font) => void
}

export const useFontStore = create<Store>()(
  persist(
    (set) => ({
      font: "font-playwrite-de-grund",
      setFont: (font) => set({ font })
    }),
    {
      name: "app_font"
    }
  )
)
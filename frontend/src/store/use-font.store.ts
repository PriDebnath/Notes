import { create } from "zustand"
import { persist} from "zustand/middleware"

type Font = "font-merienda" | "font-gabriela" | "font-playwrite-de-grund" 

export const fonts: Font[] = ["font-merienda", "font-gabriela", "font-playwrite-de-grund" ]

type Store = {
  font: Font;
  setFont: (font: Font) => void
}

export const useFontStore = create<Store>()(
  persist(
    (set)=>({
      font: "font-playwrite-de-grund",
      setFont: (font)=>({font})
    }),
       {
      name: "app_font"
    }
  )
)
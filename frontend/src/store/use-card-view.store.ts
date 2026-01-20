import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CardView } from "@/model/index.model"

export interface CardViewOption {
  key: CardView
  label: string
}

export const cardViewOptions: CardViewOption[] = [
  {
    key: "grid",
    label: "Grid",
  },
  {
    key: "list",
    label: "List",
  },
]

type CardViewStore = {
  view: CardView
  setView: (view: CardView) => void
}

export const useCardViewStore = create<CardViewStore>()(
  persist(
    (set) => ({
      view: "grid",
      setView: (view) => set({ view }),
    }),
    {
      name: "quote_card_view",
    }
  )
)


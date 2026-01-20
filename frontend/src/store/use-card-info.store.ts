import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ShowInfo = "tags" | "created_at" | "updated_at"

export const showInfo: ShowInfo[] = ["tags", "created_at", "updated_at"]

type ShowCardInfoStore = {
  info: ShowInfo
  setInfo: (info: ShowInfo) => void
}

export const useShowCardInfo = create<ShowCardInfoStore>()(
  persist(
    (set) => ({
      info: "updated_at",
      setInfo: (info) => set({ info }),
    }),
    {
      name: "card_info", // localStorage key
    }
  )
)

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { SortOption } from "@/model/index.model"

type SortStore = {
  sortBy: SortOption
  setSortBy: (sortBy: SortOption) => void
}

export const useSortStore = create<SortStore>()(
  persist(
    (set) => ({
      sortBy: "created_at",
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: "quote_sort_by",
    }
  )
)


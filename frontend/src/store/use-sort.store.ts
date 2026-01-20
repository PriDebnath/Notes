import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { SortOption } from "@/model/index.model"

export interface SortOptions { key: SortOption, label: string }

export const sortOptions: SortOptions[] = [
  {
    key: "created_at",
    label: "Created at",
  },
  {
    key: "updated_at",
    label: "Updated at",
  },
  {
    key: "tags",
    label: "Tags",
  }
]

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


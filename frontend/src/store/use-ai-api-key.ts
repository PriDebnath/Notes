import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  key: string;
  setKey: (key: string) => void
}

export const useAiApiKeyStore = create<Store>()(
  persist(
    (set) => ({
      key: "key-to-pritam's-heart",
      setKey: (key) => set({ key }),
    }),
    {
      name: "ai-api-key",
    }
  )
)

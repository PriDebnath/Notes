import { useEffect, useState } from "react"
import { useLocalStorage } from "@/hook/use-localstroage.hook"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useFontStore, fonts } from "@/store/use-font.store"


export const useApplyFont = () => {
  const font = useFontStore((s) => s.font)

  useEffect(() => {
    const root = document.body
    for (const f of fonts) {
      root.classList.remove(f)
    }
    root.classList.add(font)
  }, [font])
}



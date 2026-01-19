import { useEffect, useState } from "react"
import { useLocalStorage } from "@/hook/use-localstroage.hook"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useColorThemeStore } from "@/store/use-color-theme.store"

export type ColorTheme = "theme-neutral"
    | "theme-rose"
    | "theme-green"
    | "theme-default"
    | "theme-blue"
    | "theme-orange"
    | "theme-red"
    | "theme-violet"
    | "theme-yellow"

export const colorThemes: ColorTheme[] = [
    "theme-neutral",
    "theme-rose",
    "theme-green",
    "theme-default",
    "theme-blue",
    "theme-orange",
    "theme-red",
    "theme-violet",
    "theme-yellow",
]

export const useApplyColorTheme = () => {
  const colorTheme = useColorThemeStore((s) => s.colorTheme)

  useEffect(() => {
    const root = document.documentElement
    for (const t of colorThemes) {
      root.classList.remove(t)
    }
    root.classList.add(colorTheme)
  }, [colorTheme])
}



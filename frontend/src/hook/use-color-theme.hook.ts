import { useEffect, useState } from "react"
import { useLocalStorage } from "@/hook/use-localstroage.hook"

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

export const useColorTheme = () => {
    const [stroredColorTheme, setStroredColorTheme] = useLocalStorage<ColorTheme>("app_theme", "theme-rose")
    const [colorTheme, setColorTheme] = useState<ColorTheme>(stroredColorTheme as ColorTheme)

    useEffect(() => {
        let root = document.documentElement
        for (let t of colorThemes) {
            root.classList.remove(t)
        }
        root.classList.add(colorTheme)
        setStroredColorTheme(colorTheme)
    }, [colorTheme])
    return { colorTheme, setColorTheme }
}
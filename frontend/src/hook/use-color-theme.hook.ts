import { useEffect, useState } from "react"

export type ColorTheme = "theme-neutral" | "theme-rose"

export const colorThemes: ColorTheme[] = ["theme-neutral", "theme-rose"]

export const useColorTheme = () => {
    const [colorTheme, setColorTheme] = useState<ColorTheme>("theme-rose")
    useEffect(() => {
        let root = document.documentElement
        for (let t of colorThemes) {
            root.classList.remove(t)
        }
        root.classList.add(colorTheme)
    }, [colorTheme])
    return { colorTheme, setColorTheme }
}
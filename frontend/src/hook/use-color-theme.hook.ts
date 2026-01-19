import { useEffect, useState } from "react"
import  { useLocalStorage } from "@/hook/use-localstroage.hook"

export type ColorTheme = "theme-neutral" | "theme-rose"

export const colorThemes: ColorTheme[] = ["theme-neutral", "theme-rose"]

export const useColorTheme = () => {
    const  [ stroredColorTheme, setStroredColorTheme ]= useLocalStorage( "app_theme", "theme-rose")
    const [colorTheme, setColorTheme] = useState<ColorTheme>(stroredColorTheme as  ColorTheme)

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
import { useEffect, useState } from "react"
import { useLocalStorage } from "@/hook/use-localstroage.hook"

export type ShowInfo = "tags" | "created_at" | "updated_at"

export const showInfo: ShowInfo[] = ["tags", "created_at", "updated_at"]

export const useShowCardInfo = () => {
    const [stroredCardInfoTyle, setStroredCardInfoTyle] = useLocalStorage<ShowInfo>("card_info", "updated_at")
    const [info, setInfo] = useState<ShowInfo>(stroredCardInfoTyle)
    useEffect(() => {
        setStroredCardInfoTyle(info)
    }, [info])
    return { info, setInfo }
} 
import { Share } from "@capacitor/share"
import { Capacitor } from "@capacitor/core"
import { Button } from "@/components/ui/button"
import type { Status } from "@/model/index.model"
import React, { useState, type RefObject } from "react"
import { Filesystem, Directory } from "@capacitor/filesystem"
import { ShareIcon, LoaderCircle, CircleCheckBig } from "lucide-react"
import { exportAsImage, exportAndShare } from "@/helper/html-to-image"

interface Option {
    backgroundColor: string
}

interface Props {
    elementRef: RefObject<HTMLDivElement | null>;
    option: Option
}

export const ShareButton = (props: Props) => {
    const { elementRef, option } = props
    const [shareStatus, setShareStatus] = useState<Status>("idle")

    const shareImageAndroid = async (dataUrl: string) => {
        try {
            setShareStatus("pending")

            const base64 = dataUrl.split(",")[1]
            if (!base64) throw new Error("Invalid data URL")

            const fileName = `note-by-pri-${Date.now()}.png`

            const saved = await Filesystem.writeFile({
                path: fileName,
                data: base64,
                directory: Directory.Cache,
            })

            const result = await Share.share({
                title: "Note 💙",
                text: "Sharing a note 💙",
                url: saved.uri,
                dialogTitle: "Share Note",
            })

            // only success if actually shared
            if (result?.activityType) {
                setShareStatus("success")
            } else {
                setShareStatus("idle")
            }
        } catch (err) {
            console.error(err)
            setShareStatus("idle")
        }
    }


    const handleShareOnWeb = async (dataUrl: string) => {
        setShareStatus("pending")
        await exportAndShare(dataUrl)
        setShareStatus("success")
        setTimeout(() => {
            setShareStatus("idle")
        }, 3000)
    }


    const handleShare = async () => {
        const dataUrl = await exportAsImage(elementRef.current, { backgroundColor: option.backgroundColor! })
        if (!dataUrl) return

        if (Capacitor.isNativePlatform()) {
            await shareImageAndroid(dataUrl)
        } else {
            await handleShareOnWeb(dataUrl)
        }
    }

    return (
        <React.Fragment>
            <Button
                variant="outline"
                size="lg"
                onClick={async (e) => {
                    e.preventDefault()
                    handleShare()
                }}
            >
                {shareStatus == "idle" && <ShareIcon />}
                {shareStatus == "pending" && <LoaderCircle className="animate-spin" />}
                {shareStatus == "success" && <CircleCheckBig className="text-green-500" />}
            </Button>
            <p className="text-xs text-center">
                {shareStatus == "idle" && "Share"}
                {shareStatus == "pending" && "Sharing..."}
                {shareStatus == "success" && "Shareable"}
            </p>
        </React.Fragment>)
}
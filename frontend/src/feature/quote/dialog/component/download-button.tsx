import { Button } from "@/components/ui/button"
import type { Status } from "@/model/index.model"
import React, { useState, type RefObject } from "react"
import { exportAsImage, exportAndShare } from "@/helper/html-to-image"
import { ShareIcon, LoaderCircle, CircleCheckBig, CircleArrowDown } from "lucide-react"
import { Capacitor } from "@capacitor/core"
import { Directory, Filesystem } from "@capacitor/filesystem"
import { Share } from "@capacitor/share"


interface Option {
    backgroundColor: string
}

interface Props {
    elementRef: RefObject<HTMLDivElement | null>;
    option: Option
}

export const DownloadButton = (props: Props) => {
    const { elementRef, option } = props
    const [downloadStatus, setDownloadStatus] = useState<Status>("idle")

    const handleDownload = async () => {
        if (!elementRef.current) return

        try {
            setDownloadStatus("pending")

            const dataUrl = await exportAsImage(elementRef.current, {
                backgroundColor: option.backgroundColor,
            })

            if (!dataUrl) throw new Error("No image generated")

            const fileName = `note-by-pri-${Date.now()}.png`

            // 🟢 WEB
            if (!Capacitor.isNativePlatform()) {
                const link = document.createElement("a")
                link.href = dataUrl
                link.download = fileName
                link.click()
            }
            // 🟢 ANDROID / NATIVE
            else {
                const base64 = dataUrl.split(",")[1]
                if (!base64) throw new Error("Invalid base64")

                const saved = await Filesystem.writeFile({
                    path: fileName,
                    data: base64,
                    directory: Directory.Cache,
                })

                await Share.share({
                    title: "Note 💙",
                    text: "Sharing a note 💙",
                    url: saved.uri,
                    dialogTitle: "Share Note",
                })
            }

            setDownloadStatus("success")
        } catch (err) {
            console.error("Download failed", err)
            setDownloadStatus("idle")
        }

        setTimeout(() => setDownloadStatus("idle"), 3000)
    }

    return (
        <React.Fragment>
            <Button
                className=""
                variant={"outline"}
                onClick={async (e) => {
                    e.preventDefault()
                    handleDownload()
                }}
                aria-label="Download quote"
                size={"lg"}
            >
                {downloadStatus == "idle" && <CircleArrowDown />}
                {downloadStatus == "pending" && <LoaderCircle className="animate-spin" />}
                {downloadStatus == "success" && <CircleCheckBig className="text-green-500" />}
            </Button>
            <p className="text-xs text-center">
                {downloadStatus == "idle" && "Download"}
                {downloadStatus == "pending" && "Downloading"}
                {downloadStatus == "success" && "Downloaded"}
            </p>
        </React.Fragment>)
}

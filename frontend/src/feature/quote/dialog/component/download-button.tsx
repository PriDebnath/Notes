import { Button } from "@/components/ui/button"
import type { Status } from "@/model/index.model"
import React, { useState, type RefObject } from "react"
import { exportAsImage, exportAndShare } from "@/helper/html-to-image"
import { Share, LoaderCircle, CircleCheckBig, CircleArrowDown } from "lucide-react"


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
            if (!dataUrl) {
                console.warn('No dataUrl found')
                return
            }
            const link = document.createElement("a")
            const fileName = "note-by-pri-" + new Date().getTime() + "-.png"
            link.download = fileName
            link.href = dataUrl
            link.click()
            setDownloadStatus("success")
        } catch (err) {
            console.error("Download failed", err)
            setDownloadStatus("idle")
        }

        setTimeout(() => {
            setDownloadStatus("idle")
        }, 3000)
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

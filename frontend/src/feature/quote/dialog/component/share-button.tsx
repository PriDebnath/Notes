import { Button } from "@/components/ui/button"
import type { Status } from "@/model/index.model"
import React, { useState, type RefObject } from "react"
import { Share, LoaderCircle, CircleCheckBig } from "lucide-react"
import { exportAsImage, exportAndShare } from "@/helper/html-to-image"


interface Option {
    backgroundColor: string
}

interface Props {
    elementRef: RefObject <HTMLDivElement | null>;
    option: Option
}

export const ShareButton = (props: Props) => {
    const { elementRef, option } = props
    const [shareStatus, setShareStatus] = useState<Status>("idle")


    const handleShare = async () => {
        setShareStatus("pending")
        const dataUrl = await exportAsImage(elementRef.current, { backgroundColor: option.backgroundColor! })        
        if (!dataUrl) {
            console.warn('No dataUrl found')
            return
        }
        exportAndShare(dataUrl)

        setShareStatus("success")

        setTimeout(() => {
            setShareStatus("idle")
        }, 3000)
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
                {shareStatus == "idle" && <Share />}
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
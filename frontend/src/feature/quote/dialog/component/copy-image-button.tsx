import { Button } from "@/components/ui/button"
import type { Status } from "@/model/index.model"
import React, { useState, type RefObject } from "react"
import { exportAsImage, exportAndShare } from "@/helper/html-to-image"
import { Share, LoaderCircle, CircleCheckBig, CircleArrowDown, Images } from "lucide-react"


interface Option {
    backgroundColor: string
}

interface Props {
    elementRef: RefObject<HTMLDivElement | null>;
    option: Option
}

export const CopyImageButton = (props: Props) => {
    const { elementRef, option } = props
    const [imageCopyStatus, setImageCopyStatus] = useState<Status>("idle")


    const handleImageCopy = async () => {
        setImageCopyStatus("pending")
        const dataUrl = await exportAsImage(elementRef.current, { backgroundColor: option.backgroundColor! })
        if (!dataUrl) return
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
        ])
        setImageCopyStatus("success")

        setTimeout(() => {
            setImageCopyStatus("idle")
        }, 3000)
    }

    return (
        <React.Fragment>
            <Button
                variant="outline"
                size="lg"
                onClick={async (e) => {
                    e.preventDefault()
                    handleImageCopy()
                }}
            >
                {imageCopyStatus == "idle" && <Images />}
                {imageCopyStatus == "pending" && <LoaderCircle className="animate-spin" />}
                {imageCopyStatus == "success" && <CircleCheckBig className="text-green-500" />}
            </Button>
            <p className="text-xs text-center">
                {imageCopyStatus == "idle" && "Copy Image"}
                {imageCopyStatus == "pending" && "Copying..."}
                {imageCopyStatus == "success" && "Copied Image"}
            </p>
        </React.Fragment>)
}
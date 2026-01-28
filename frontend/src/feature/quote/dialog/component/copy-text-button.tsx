import { Button } from "@/components/ui/button"
import type { Status } from "@/model/index.model"
import React, { useState, type RefObject } from "react"
import { htmlToPlainText } from "@/helper/html-to-text"
import { exportAsImage, exportAndShare } from "@/helper/html-to-image"
import { Share, LoaderCircle, CircleCheckBig, CircleArrowDown, Copy } from "lucide-react"

interface Props {
  text: string
}

export const CopyTextButton = (props: Props) => {
  const { text } = props
  const [textCopyStatus, setTextCopyStatus] = useState<Status>("idle")

  const handleTextCopy = async () => {
    setTextCopyStatus("pending")
    const plaintext = htmlToPlainText(text!)
    await window.navigator.clipboard.writeText(plaintext!)
    setTextCopyStatus("success")

    setTimeout(() => {
      setTextCopyStatus("idle")
    }, 3000)
  }

  return (
    <React.Fragment>
      <Button
        variant="outline"
        size="lg"
        onClick={(e) => {
          e.preventDefault()
          handleTextCopy()
        }}
      >
        {textCopyStatus == "idle" && <Copy />}
        {textCopyStatus == "pending" && <LoaderCircle className="animate-spin" />}
        {textCopyStatus == "success" && <CircleCheckBig className="text-green-500" />}
      </Button>

      <p className="text-xs text-center">
        {textCopyStatus == "idle" && "Copy Text"}
        {textCopyStatus == "pending" && "Copying..."}
        {textCopyStatus == "success" && "Copied Text"}
      </p>

    </React.Fragment>)
}
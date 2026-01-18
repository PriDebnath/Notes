
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuoteFormData } from "@/model/quote.model";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy,Images, LoaderCircle, Save, Share } from "lucide-react";
import useBackground, { type Pri_set, type TextureKey } from "@/hook/use-background.hook";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { htmlToPlainText } from "@/helper/html-to-text";
import { cn } from "@/lib/utils";
import { ListTags } from "@/feature/quote/list.tags";
import { toPng } from "html-to-image"
import { ResizableBox } from "react-resizable";
import { Separator } from "@/components/ui/separator";

interface Props {
  quoteFormData: QuoteFormData
}

type Status = "idle" | "pending" | "success"

export function ShareBackground(props: Props) {
  const { quoteFormData } = props
  const { buildStyle } = useBackground()
  const noteRef = useRef<HTMLDivElement>(null)
  
  const [ shareStatus, setShareStatus] = useState<Status>("idle")
  const [ downloadStatus, setDownloadStatus] = useState<Status>("idle")
  const [ textCopyStatus, setTextCopyStatus] = useState<Status>("idle")
  const [ imageCopyStatus, setImageCopyStatus] = useState<Status>("idle")
  
  const [dimensions, setDimensions] = useState({ width: 320, height: 240 })
  const cardStyle = buildStyle(quoteFormData.texture!, quoteFormData.pri_set!)

  const aspectRatios = [
    { label: "1:1", ratio: 1, width: 300, height: 300 },
    { label: "4:3", ratio: 4 / 3, width: 320, height: 240 },
    { label: "16:9", ratio: 16 / 9, width: 400, height: 225 },
    { label: "3:2", ratio: 3 / 2, width: 360, height: 240 },
    { label: "9:16", ratio: 9 / 16, width: 225, height: 400 },
    { label: "21:9", ratio: 21 / 9, width: 420, height: 180 },
    { label: "2:1", ratio: 2 / 1, width: 400, height: 200 },
    { label: "5:4", ratio: 5 / 4, width: 375, height: 300 },
    { label: "4:5", ratio: 4 / 5, width: 300, height: 375 },
    { label: "2:3", ratio: 2 / 3, width: 240, height: 360 },
    { label: "1:2", ratio: 1 / 2, width: 200, height: 400 },
    { label: "5:7", ratio: 5 / 7, width: 250, height: 350 },
  ]

  const applyRatio = (ratio: typeof aspectRatios[0]) => {
    setDimensions({ width: ratio.width, height: ratio.height })
  }

  const exportAsImage = async () => {
    if (!noteRef.current) return
    const dataUrl = await toPng(noteRef.current, {
      pixelRatio: 2,        // crisp image
      //backgroundColor: "#fff"
      cacheBust: true,
      backgroundColor: cardStyle.backgroundColor
    })

    const link = document.createElement("a")
    const fileName = "note-by-pri-" + new Date().getTime() + "-.png"
    link.download = fileName
    link.href = dataUrl
    link.click()

    return dataUrl
  }

  const exportAndShare = async (dataUrl: string) => {
    // dataUrl is base64 
    // convert base64 → Blob → File
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    const fileName = "note-by-pri-" + new Date().getTime() + "-.png"
    const file = new File([blob], fileName, { type: "image/png" })

    // mobile share
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Note 💙",
        text: "Sharing a quote 💙",
      })
    } else {
      // fallback download
      const link = document.createElement("a")
      const fileName = "note-by-pri-" + new Date().getTime() + "-.png"
      link.download = fileName
      link.href = dataUrl
      link.click()
    }
  }
  
  const handleDownload = async ()=>{
    setDownloadStatus("pending")
    await exportAsImage()
    setDownloadStatus("success")
    
    setTimeout(()=>{
     setDownloadStatus("idle") 
    }, 3000)
  }
  
  const handleTextCopy = async () => {
        setTextCopyStatus("pending")
        const text =  htmlToPlainText(quoteFormData.text)
        await window.navigator.clipboard.writeText(text!)
        setTextCopyStatus("success")
    
        setTimeout(()=>{
         setTextCopyStatus("idle") 
        }, 3000)
    }
    
  const handleImageCopy = async () => {
    setImageCopyStatus("pending")
    const dataUrl = await exportAsImage()
    if (!dataUrl) return
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob })
    ])
    setImageCopyStatus("success")

    setTimeout(()=>{
     setImageCopyStatus("idle") 
    }, 3000)
  }
  
  const handleShare = async ()=>{
    setShareStatus("pending")
    const dataUrl = await exportAsImage()
    if (!dataUrl) return
    exportAndShare(dataUrl)
  
    setShareStatus("success")

    setTimeout(()=>{
     setShareStatus("idle") 
    }, 3000)
  }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-4 max-h-[90vh] overflow-y-auto" aria-describedby="Choose Background">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share it with your close one.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">

          {/* Live preview */}
          <div className="relative w-full flex justify-center overflow-auto max-h-[50vh]">
            <ResizableBox
              width={dimensions.width}
              height={dimensions.height}
              minConstraints={[200, 200]}
              maxConstraints={[550, 550]}
              resizeHandles={["se"]}
              onResize={(_e, data) => {
                setDimensions({ width: data.size.width, height: data.size.height })
              }}
            >
              <div
                className="w-full h-full rounded-lg bg-transparent overflow-hidden"
                ref={noteRef}
                style={{ width: '100%', height: '100%' }}
              >
                <div
                  style={cardStyle}
                  className={
                    cn(
                      "border p-2  bg-card rounded-xl h-full",
                      "flex flex-col justify-between items-start gap-2",
                    )

                  }>
                  <div className="
                            tiptap
                            prose-sm 
                            removed-prose
                            removed-sm:prose-base 
                            removed-lg:prose-lg
                            removed-xl:prose-2xl
                            removed-prose-foreground
                        ">   {/* IMPORTANT */}
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(quoteFormData.text!) }}></div>
                  </div>
                  <div className="flex w-full items-end justify-between gap-2">
                    <ListTags tags={quoteFormData?.tags?.map((tag, i) => { return { id: i, name: tag } }) || []} />

                  </div>
                </div>
              </div>
            </ResizableBox>
          </div>

          {/* Aspect Ratio Options */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Aspect Ratio</p>
            <div className="flex flex-wrap gap-2">
              {aspectRatios.map((ratio) => (
                <Button
                  key={ratio.label}
                  variant={dimensions.width === ratio.width && dimensions.height === ratio.height ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyRatio(ratio)}
                  className="text-xs"
                >
                  {ratio.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />
          {/* Action */}

          <div className="flex items-center   gap-6 ">
            <div className="flex flex-col gap-4 items-center">
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
                {downloadStatus == "idle" && <CircleArrowDown /> }
                {downloadStatus == "pending" && <LoaderCircle className="animate-spin" /> }
                {downloadStatus == "success" && <CircleCheckBig className="text-green-500" /> }
              </Button>
              <p className="text-xs text-center">
                {downloadStatus == "idle" && "Download" }
                {downloadStatus == "pending" && "Downloading"}
                {downloadStatus == "success" &&  "Downloaded"}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={(e) => {
                  e.preventDefault()
                  handleTextCopy()
                }}
              >
                {textCopyStatus == "idle" && <Copy /> }
                {textCopyStatus == "pending" && <LoaderCircle className="animate-spin" /> }
                {textCopyStatus == "success" && <CircleCheckBig className="text-green-500" /> }
              </Button>
              
              <p className="text-xs text-center">
                {textCopyStatus == "idle" && "Copy Text" }
                {textCopyStatus == "pending" && "Copying..."}
                {textCopyStatus == "success" &&  "Copied Text"}
              </p>
           
            </div>

            <div className="flex flex-col gap-4  items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={async (e) => {
                  e.preventDefault()
                  handleImageCopy()
                }}
              >
                {imageCopyStatus == "idle" && <Images /> }
                {imageCopyStatus == "pending" && <LoaderCircle className="animate-spin" /> }
                {imageCopyStatus == "success" && <CircleCheckBig className="text-green-500" /> }
              </Button>
              <p className="text-xs text-center">
                {imageCopyStatus == "idle" && "Copy Image" }
                {imageCopyStatus == "pending" && "Copying..."}
                {imageCopyStatus == "success" &&  "Copied Image"}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={async (e) => {
                  e.preventDefault()
                  handleShare()
                }}
              >
                {shareStatus == "idle" && <Share /> }
                {shareStatus == "pending" && <LoaderCircle className="animate-spin" /> }
                {shareStatus == "success" && <CircleCheckBig className="text-green-500" /> }
              </Button>
              <p className="text-xs text-center">
                {shareStatus == "idle" && "Share" }
                {shareStatus == "pending" && "Sharing..."}
                {shareStatus == "success" &&  "Shareable"}
              </p>
            </div>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image"
import { useRef, useState } from "react";
import { ResizableBox } from "react-resizable";
import { Button } from "@/components/ui/button";
import { ListTags } from "@/feature/quote/list.tags";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { Separator } from "@/components/ui/separator";
import { htmlToPlainText } from "@/helper/html-to-text";
import type { QuoteFormData, Status } from "@/model/index.model";
import useBackground, { type Pri_set, type TextureKey } from "@/hook/use-background.hook";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share } from "lucide-react";
import { exportAsImage } from "@/helper/html-to-image";
import { ShareButton } from "@/feature/quote/dialog/component/share-button";
import { DownloadButton } from "@/feature/quote/dialog/component/download-button";
import { CopyTextButton } from "@/feature/quote/dialog/component/copy-text-button";
import { CopyImageButton } from "@/feature/quote/dialog/component/copy-image-button";

interface Props {
  quoteFormData: QuoteFormData
}


export function ShareBackground(props: Props) {
  const { quoteFormData } = props
  const { buildStyle } = useBackground()
  const noteRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)


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








  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

        <Button variant="outline" size="icon"
          className={
            cn(
              open ? "text-primary" : ""
            )} >
          <Share />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-4 max-h-[90vh] overflow-auto" aria-describedby="Choose Background">
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

          <section className="flex items-center   gap-6 ">
            <div className="flex flex-col gap-4 items-center">
              <DownloadButton
                elementRef={noteRef}
                option={{ backgroundColor: cardStyle.backgroundColor! }}
                key={'DownloadButton'}
              />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <CopyTextButton text={quoteFormData.text!} />
            </div>

            <div className="flex flex-col gap-4  items-center">
              <CopyImageButton
                elementRef={noteRef}
                option={{ backgroundColor: cardStyle.backgroundColor! }}
                key={'CopyImageButton'}
              />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <ShareButton
                elementRef={noteRef}
                option={{ backgroundColor: cardStyle.backgroundColor! }}
                key={'ShareButton'}
              />
            </div>

          </section>
        </div>

      </DialogContent>
    </Dialog>
  );
}


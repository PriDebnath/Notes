import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuoteFormData } from "@/model/quote.model";
import { ArrowLeftIcon, Save, Share } from "lucide-react";
import useBackground, { type Pri_set, type TextureKey } from "@/hook/use-background.hook";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { cn } from "@/lib/utils";
import { ListTags } from "@/feature/quote/list.tags";

interface Props {
  quoteFormData: QuoteFormData
}

export default function ShareBackground(props: Props) {
  const { quoteFormData } = props
  const { buildStyle } = useBackground()
  const noteRef = useRef<HTMLDivElement>(null)
  const cardStyle = buildStyle(quoteFormData.texture!, quoteFormData.pri_set!)

  return (
    <Drawer
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Share />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4" aria-describedby="Choose Background">
        <DrawerHeader>
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>
            Share it with your close one.
          </DrawerDescription>
        </DrawerHeader>
        {/* Top bar */}
        <div className="flex items-center justify-between ">

        </div>

        {/* Live preview */}
        <div className="w-full border  rounded-lg   overflow-hidden shadow">
          <div
            ref={noteRef}
            style={cardStyle}
            className={
              cn(
                "border p-2  bg-card rounded-xl ",
                "flex flex-col justify-between items-start gap-2",
                "",
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
              <ListTags tags={quoteFormData?.tags?.map((tag, i)=>{return {id: i, name: tag}}) || []} />

            </div>
          </div>
        </div>



      </DrawerContent>
    </Drawer>
  );
}

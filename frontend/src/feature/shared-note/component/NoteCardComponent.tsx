import { cn } from "@/lib/utils";
import { toPng } from "html-to-image"
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ListTagsComponent } from "@/feature/quote/component/ListTagsComponent";
import { sanitizeHTML } from "@/helper/sanitize-html";
import useBackground from "@/hooks/use-background.hook";
import { htmlToPlainText } from "@/helper/html-to-text";
import { useShowCardInfo } from "@/store/use-card-info.store";
import type { Quote, QuoteDetails } from "@/model/index.model";
import { Check, Copy, Maximize2, PenIcon, Trash, Save, CircleArrowDown, LoaderCircle, Pin, PinOff } from "lucide-react";

interface Props {
    quote: Quote;
}

const NoteCardComponent = (props: Props) => {
    const { quote, } = props
    const { buildStyle } = useBackground()
    const cardStyle = buildStyle(quote.texture!, quote.pri_set!)
    const formatDate = (date: Date | string) => {
        const formatedDate = typeof date == 'string' ? new Date(date) : date
        return formatedDate?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const created_at = quote?.createdAt ? quote?.createdAt : quote?.created_at ? quote?.created_at : null
    const updated_at = quote?.updatedAt ? quote?.updatedAt : quote?.updated_at ? quote?.updated_at : null

    return (
            <div
                style={cardStyle}
                className={cn(
                    "border p-2  bg-card rounded-xl ",
                    "flex flex-col justify-between items-start gap-2",
                    "overflow-hidden",
                )}>

                <div className={cn(
                    "tiptap",
                    "prose-sm",
                    "removed-prose",
                    "removed-sm:prose-base ",
                    "removed-lg:prose-lg",
                    "removed-xl:prose-2xl",
                    "removed-prose-foreground",
                    "line-clamp-3",
                )}>   {/* IMPORTANT */}
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(quote.text) }}></div>
                </div>
                <div className="flex w-full  gap-2">
                    {/* {infoType == "tags" && <ListTagsComponent tags={quote.tags!} />} */}
                    <p className="p-0 text-[0.615rem] text-muted-foreground">
                        Created at: {formatDate(created_at!)},</p>
                    <p className="p-0 text-[0.615rem] text-muted-foreground">
                        Updated at: {formatDate(updated_at!)}</p>
                </div>
            </div>
    )
}

export default NoteCardComponent
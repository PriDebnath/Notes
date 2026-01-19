import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { htmlToPlainText } from "@/helper/html-to-text";
import useBackground from "@/hook/use-background.hook";
import { cn } from "@/lib/utils";
import type { Quote, QuoteDetails } from "@/model/quote.model";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Maximize2, PenIcon, Trash, Save, CircleArrowDown, LoaderCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toPng } from "html-to-image"
import { ListTags } from "@/feature/quote/list.tags";
import { useShowCardInfo } from "@/hook/use-show-card-info.hook";

interface Props {
    quote: QuoteDetails;
    onEdit: (quote: Quote) => void
    onDelete: (quote: Quote) => void
}

const QuoteCard = (props: Props) => {
    const { quote, onEdit, onDelete, } = props
    const [copying, setCopying] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const { buildStyle } = useBackground()
    const { info: infoType, setInfo } = useShowCardInfo()

    const noteRef = useRef<HTMLDivElement>(null)

    const cardStyle = buildStyle(quote.texture!, quote.pri_set!)
    const exportAsImage = async () => {
        if (!noteRef.current) return
        setDownloading(true)
        const dataUrl = await toPng(noteRef.current, {
            pixelRatio: 2,        // crisp image
            //backgroundColor: "#fff"
            cacheBust: true,
            backgroundColor: cardStyle.backgroundColor
        })

        const link = document.createElement("a")
        link.download = new Date().getTime() + "-note.png"
        link.href = dataUrl
        link.click()

        setDownloading(false)

    }


    const onCopy = async (text: string) => {
        setCopying(true)
        await window.navigator.clipboard.writeText(text)

        setTimeout(() => {
            setCopying(false)
        }, 3000)
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <Link
            className=""
            to={"/$quoteId"}
            params={
                { quoteId: quote.id?.toString()! }
            }>

            <div
                ref={noteRef}
                style={cardStyle}
                className={cn(
                    "border p-2  bg-card rounded-xl ",
                    "flex flex-col justify-between items-start gap-2",
                    "",
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
                {/*
                <p className="text-base w-full text-card-foreground text-right">-- Pritam</p>
                            */}

                <div className="flex w-full items-end justify-between gap-2">
                    {infoType == "tags" && <ListTags tags={quote.tags!} />}
                    {infoType == "created_at" && (
                        <p className="p-0 text-xs text-muted-foreground">  {
                            formatDate(quote.created_at!)
                        }</p>
                    )}
                    {infoType == "updated_at" && (
                        <p className="p-0 text-xs text-muted-foreground">  {
                            formatDate(quote.updated_at!)
                        }</p>
                    )}
                    <div className="flex items-center gap-2 ">
                        <Button
                            className="hover:text-green-600 "
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                const text = htmlToPlainText(quote.text)
                                onCopy(text)
                            }}
                            aria-label="Copy quote"
                            size={"sm"}
                        >
                            {copying ? <Check className="text-green-500" /> : <Copy />}
                        </Button>


                        {/*
                        <Button
                            className="hover:text-yellow-600 "
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                onEdit(quote)
                            }} 
                            aria-label="Edit quote"
                            size={"sm"}>
                            <PenIcon />
                        </Button>
                        */}
                        <Button
                            className=" hover:text-destructive "
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                onDelete(quote)
                            }}
                            aria-label="Delete quote"
                            size={"sm"}
                        >
                            {<Trash />}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default QuoteCard
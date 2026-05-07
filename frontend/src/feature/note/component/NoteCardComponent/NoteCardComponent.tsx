import { cn } from "@/lib/utils";
import { toPng } from "html-to-image"
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ListTagsComponent } from "@/feature/note/component/ListTagsComponent";
import { sanitizeHTML } from "@/helper/sanitize-html";
import useBackground from "@/hooks/use-background.hook";
import { htmlToPlainText } from "@/helper/html-to-text";
import { useShowCardInfo } from "@/store/use-card-info.store";
import type { Note, NoteDetails } from "@/model/index.model";
import { Check, Copy, Maximize2, PenIcon, Trash, Save, CircleArrowDown, LoaderCircle, Pin, PinOff } from "lucide-react";

interface Props {
    note: NoteDetails;
    onEdit: (note: Note) => void
    onDelete: (note: Note) => void
    onTogglePin: (note: NoteDetails) => void
}

const NoteCardComponent = (props: Props) => {
    const { note, onEdit, onDelete, onTogglePin } = props
    const [copying, setCopying] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const { buildStyle } = useBackground()
    const { info: infoType } = useShowCardInfo()

    const noteRef = useRef<HTMLDivElement>(null)

    const cardStyle = buildStyle(note.texture!, note.pri_set!)

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
        return date?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <Link
            className=""
            to={"/$noteId"}
            params={
                { noteId: note.id?.toString()! }
            }>

            <div
                ref={noteRef}
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
                    "tiptap",
                    "prose",
                    //   "prose-foreground",
                    //   "removed-prose-sm ",
                    //   "removed-sm:prose-base ",
                    //   "  removed-lg:prose-lg",
                    //   "  removed-xl:prose-2xl",
                    //   "transition-transform duration-300 ease-out",
                )}>   {/* IMPORTANT */}
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(note.text) }}></div>
                </div>
                {/*
                <p className="text-base w-full text-card-foreground text-right">-- Pritam</p>    */}
                <div className="flex w-full items-end justify-between gap-2">
                    {infoType == "tags" && <ListTagsComponent tags={note.tags!} />}
                    {infoType == "created_at" && (
                        <p className="p-0 text-[0.615rem] text-muted-foreground">  {
                            formatDate(note.created_at!)
                        }</p>
                    )}
                    {infoType == "updated_at" && (
                        <p className="p-0 text-[0.615rem] text-muted-foreground">  {
                            formatDate(note.updated_at!)
                        }</p>
                    )}
                    <div className="flex items-center gap-2 ">

                        {/* <Button
                            className="hover:text-green-600 "
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                const text = htmlToPlainText(note.text)
                                onCopy(text)
                            }}
                            aria-label="Copy note"
                            size={"sm"}
                        >
                            {copying ? <Check className="text-green-500" /> : <Copy />}
                        </Button> */}

                        <Button
                            className={cn(
                                "hover:text-primary focus:text-primary active:text-primary",
                                note.pinned && "text-primary")
                            }
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                onTogglePin(note)
                            }}
                            aria-label={note.pinned ? "Unpin note" : "Pin note"}
                            size={"sm"}
                        >
                            {note.pinned ? <PinOff /> : <Pin />}
                        </Button>

                        {/*
                        <Button
                            className="hover:text-yellow-600 "
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                onEdit(note)
                            }} 
                            aria-label="Edit note"
                            size={"sm"}>
                            <PenIcon />
                        </Button>
                        */}
                        <Button
                            className=" hover:text-destructive  focus:text-destructive   active:text-destructive  "
                            variant={"outline"}
                            onClick={(e) => {
                                e.preventDefault()
                                onDelete(note)
                            }}
                            aria-label={"delete-" + note.id}
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

export default NoteCardComponent
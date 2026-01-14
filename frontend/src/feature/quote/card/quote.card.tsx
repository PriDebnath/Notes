import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { cn } from "@/lib/utils";
import type { Quote, QuoteDetails } from "@/model/quote.model";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Maximize2, PenIcon, Trash } from "lucide-react";
import { useState } from "react";

interface Props {
    quote: QuoteDetails;
    onEdit: (quote: Quote) => void
    onDelete: (quote: Quote) => void
}

const QuoteCard = (props: Props) => {
    const { quote, onEdit, onDelete, } = props
    const [copying, setCopying] = useState(false)

    const onCopy = async (text: string) => {
        setCopying(true)
        await window.navigator.clipboard.writeText(text)
        setTimeout(() => {
            setCopying(false)
        }, 500);
    }

    return (
        <Link to={"/$quoteId"}
            params={
                { quoteId: quote.id?.toString()! }
            }>

            <div className={
                cn(
                    "bg-rose-50 rounded-xl p-4 flex flex-col justify-between items-start gap-2",
                    "shadow-[0_2px_12px_rgba(0,0,0,0.1)]",
                    "hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
                    "transition-shadow duration-200",
                    "border-primary/30 relative"
                )
            }>
                <div className="
                tiptap
                prose
                prose-sm 
                sm:prose-base 
                lg:prose-lg
                xl:prose-2xl
                m-5 
                focus:outline-none
            ">   {/* IMPORTANT */}
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(quote.text) }}></div>
                </div>
                <p className="text-base w-full text-right">-- Pritam</p>

                <div className="flex w-full items-end justify-between gap-2">
                    {quote.tags && quote.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {quote.tags.map((tag, index) => (
                                <Badge
                                    variant={'outline'}
                                    className=" bg-primary/10 border-primary/30 text-primary/90"
                                    key={tag.id}
                                >
                                    #{tag.name}
                                </Badge>
                            ))}
                        </div>
                    ) : (<span></span>)}

                    <div className="flex items-center gap-2 ">
                        <Button
                            className="hover:text-green-600 border-primary/30"
                            variant={"outline"}
                            onClick={() => onCopy(quote.text)}
                            aria-label="Copy quote"
                            size={"sm"}
                        >
                            {copying ? <Check className="text-green-500" /> : <Copy />}
                        </Button>
                        <Button
                            className="hover:text-yellow-600 border-primary/30"
                            variant={"outline"}
                            onClick={() => onEdit(quote)}
                            aria-label="Edit quote"
                            size={"sm"}
                        >
                            <PenIcon />
                        </Button>

                        <Button
                            className=" hover:text-destructive border-primary/30"
                            variant={"outline"}
                            onClick={() => onDelete(quote)}
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
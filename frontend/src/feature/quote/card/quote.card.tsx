import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Quote } from "@/model/quote.model";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { Check, Copy, PenIcon, Trash } from "lucide-react";

interface Props {
    quote: Quote;
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

    return (<div className={
        cn(
            "bg-white rounded-xl p-5 flex flex-col justify-between items-start gap-4",
            "shadow-[0_2px_12px_rgba(0,0,0,0.1)]",
            "hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
            "transition-shadow duration-200"
        )
    }>

        <div className="text-xl font-bold text-purple-700">
            <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(quote.text) }}></div>
        </div>
        <p className="text-base w-full text-right">-- Pritam</p>

        <div className="flex w-full items-end justify-between">
            <div className="">
                {/* {q.tags && q.tags.length > 0 && (
                <div className="quote-tags">
                  {q.tags.map((tag, index) => (
                    <span key={index} className="quote-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )} */}
                <span className="text-purple-400">  #tag</span>
                <span className="text-purple-400">  #tag</span>
                <span className="text-purple-400">  #tag</span>
                <span className="text-purple-400">  #tag</span>
                <span className="text-purple-400">  #tag</span>
                <span className="text-purple-400">  #tag</span>
                <span className="text-purple-400">  #tag</span>
            </div>
            <div className="flex items-center gap-2 ">
                <Button
                    className=" border !border-gray-300" size={"icon"}
                    variant={"ghost"}
                    onClick={() => onCopy(quote.text)}
                    aria-label="Copy quote"
                >
                    {copying ? <Check className="text-green-500" /> : <Copy />}
                </Button>
                <Button
                    className="text-foreground hover:bg-accent"
                    variant={"outline"}
                    onClick={() => onEdit(quote)}
                    aria-label="Edit quote"
                >
                    <PenIcon />
                </Button>

                <Button
                    className=" border !border-gray-300"
                    variant={"secondary"}
                    onClick={() => onDelete(quote)}
                    aria-label="Delete quote"
                >
                    {<Trash />}
                </Button>
            </div>
        </div>
    </div>
    )
}

export default QuoteCard
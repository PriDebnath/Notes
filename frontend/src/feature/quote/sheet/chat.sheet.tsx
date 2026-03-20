import { useStreamSummarize } from "@/api-hook/ai-content-stream-summarize.hook"
import { useGetSummarize } from "@/api-hook/ai-content-summarize.hook"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sanitizeHTML } from "@/helper/sanitize-html"
import { cn } from "@/lib/utils"
import { BotMessageSquare, Send } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { toast } from "sonner"
import { CopyTextButton } from "@/feature/quote/dialog/component/copy-text-button"
import { MarkdownRenderer } from "@/components/common/markdown-renderer"

type Message = {
    role: "user" | "assistant";
    content: string;
}

interface Props {
    query?: string;
    text: string;
}

export function ChatSheet(props: Props) {
    const { text, query } = props
    const [userQuery, setUserQuery] = useState(query ? query : "")
    const bottomRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    const [messages, setMessages] = useState<Message[]>([
        {
            content: "ppd0",
            role: 'assistant'
        },
        {
            content: "ppd0",
            role: 'user'
        },
        {
            content: `
            # Heading
**bold**
- lists
 

---

  `,

            role: 'assistant'
        },
    ]);
    const { startStream, loading } = useStreamSummarize();

    const clearUserQuery = async () => {
        setUserQuery("")
    }

    const handleSummrise = async () => {
        if (!userQuery) return;
        if (!text) return;
        const data = { userQuery, content: text }
        console.log({ data, messages });

        // 1️⃣ Add user message (right side)
        setMessages((prev) => {
            return [
                ...prev,
                { role: "user", content: userQuery },
            ]
        });

        // 2️⃣ Add empty assistant message (left side)
        setMessages((prev) => {
            return [
                ...prev,
                { role: "assistant", content: "" },
            ]
        });

        clearUserQuery()

        //// 3️⃣ Stream into last assistant message
        // await startStream(data, (chunk) => {
        //     setMessages((prev) => {
        //         const updated = [...prev];
        //         const lastIndex = updated.length - 1;

        //         updated[lastIndex] = {
        //             ...updated[lastIndex],
        //             content: updated[lastIndex].content + chunk,
        //         };

        //         return updated;
        //     });
        // });
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-wrap gap-2">
            <Sheet key={'right'} open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className={
                            cn("border-primary/10",
                                open ? "text-primary" : ""
                            )}
                    >
                        <BotMessageSquare />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side={'right'}
                    className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
                >
                    <SheetHeader>
                        <SheetTitle className="flex items-center">
                            <BotMessageSquare
                                className={
                                    cn(
                                        open ? "text-primary" : ""
                                    )} />
                            <span className="px-4">Chat</span>
                        </SheetTitle>
                        <SheetDescription>
                            <div className="flex gap-1  flex-row">
                                <div>
                                    Content:
                                </div>
                                <div className="line-clamp-1 text-ellipsis"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(text!) }}></div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                    <div>

                        <div className="flex flex-col gap-3 p-4 max-h-[70vh] overflow-y-auto">
                            {messages?.length > 0 && messages.map((msg, i) => {

                                return (

                                    <div key={i}
                                        className={
                                            cn(
                                                "max-w-[75%] ",
                                                msg.role === "user"
                                                    ? "ml-auto  "
                                                    : "mr-auto  "
                                            )
                                        } >

                                        <div
                                            className={cn(
                                                " rounded-2xl px-4 py-2 text-sm relative",
                                                msg.role === "user" ? "  bg-primary text-white" : " bg-muted"
                                            )}
                                        >

                                            {
                                                msg?.role == 'assistant' && (
                                                    <BotMessageSquare className="absolute -top-5 left-2 text-primary bg-muted rounded-2xl p-1" />
                                                )
                                            }
                                            {
                                            (
                                                msg.content && <MarkdownRenderer  content={msg.content}/>)
                                             || (msg.role === "assistant" && loading && (
                                                <div className="animate-pulse  bg-gray-300 w-4 h-4 rounded-full">           </div>
                                            )
                                        )
                                            }

                                        </div>
                                        <div className="flex justify-end  m-1">
                                            <CopyTextButton
                                                text={msg.content}
                                                isLoaderText={false}
                                                buttonClassName="scale-75" />
                                        </div>

                                    </div>

                                )
                            })}
                            <div ref={bottomRef} ></div>
                        </div>

                    </div>
                    <SheetFooter>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleSummrise()
                        }
                        } className="">
                            <Field orientation="horizontal">
                                <Input type="chat" placeholder="Summrize the conent..."
                                    value={userQuery}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setUserQuery(event.target.value)
                                    }}
                                />
                                <Button onClick={handleSummrise}>
                                    <Send />
                                </Button>
                            </Field>
                        </form>
                        {/* <Button type="submit" onClick={handleSummrise}>Send</Button> */}
                        <SheetClose asChild>
                            {/* <Button variant="outline">Cancel</Button> */}
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

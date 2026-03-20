
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
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { sanitizeHTML } from "@/helper/sanitize-html"
import { BotMessageSquare, Send, X } from "lucide-react"
import ChatMessage from "@/feature/quote/sheet/chat-message"
import type { ContentChatMessage } from "@/model/index.model"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useStreamSummarize } from "@/api-hook/ai-content-stream-summarize.hook"
import ChatSetting from "./chat-setting"

interface Props {
    query?: string;
    text: string;
}

export function ChatSheet(props: Props) {
    const { text, query } = props
    const [userQuery, setUserQuery] = useState(query ? query : "")
    const bottomRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<ContentChatMessage[]>([]);
    const { startStream, loading } = useStreamSummarize();

    const clearUserQuery = async () => {
        setUserQuery("")
    }

    const handleSummrise = async () => {
        if (!userQuery) return;
        if (!text) return;
        const data = { userQuery, content: text }

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
        await startStream(data, (chunk) => {
            setMessages((prev) => {
                const updated = [...prev];
                const lastIndex = updated.length - 1;

                updated[lastIndex] = {
                    ...updated[lastIndex],
                    content: updated[lastIndex].content + chunk,
                };

                return updated;
            });
        });
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-wrap gap-2">
            <Sheet key={'right'} open={open} onOpenChange={setOpen} >
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
                showCloseButton={false}
                    side={'right'}
                    className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
                >
                    <SheetHeader>
                        <SheetTitle className="flex  items-center">
                            <div className="flex justify-between items-center w-full ">
                                <div  className="flex items-center gap-2">   
                                      <BotMessageSquare
                                    className={
                                        cn(
                                            open ? "text-primary" : ""
                                        )} />
                                    <span className="">Chat</span>
                                </div>
                                <div className="flex items-center gap-2">
                                                                    <ChatSetting />
 <SheetClose asChild>
                             <Button variant="outline" size={'sm'}><X/></Button> 
                        </SheetClose> 
                                </div>

                            </div>

                        </SheetTitle>
                        <SheetDescription>
                            <div className="flex gap-1  flex-row">
                                <div>
                                    <span className="font-bold">Content:</span>
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
                                    <ChatMessage
                                        key={"message-" + i}
                                        message={msg}
                                        loadingContent={loading}
                                    />
                                )
                            })}
                            <div ref={bottomRef} ></div>
                        </div>

                    </div>
                    <SheetFooter>
                        <form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSummrise()
                        }
                        } 
                        className="" >
                            <Field orientation="horizontal">
                                <Input
                                autoFocus
                                 type="text" 
                                placeholder="Summrize the conent..."
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
                        {/* <SheetClose asChild>
                             <Button variant="outline">Cancel</Button> 
                        </SheetClose> */}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

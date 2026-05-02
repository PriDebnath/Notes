import React from "react";
import { cn } from "@/lib/utils";
import { BotMessageSquare } from "lucide-react";
import type { ContentChatMessage } from "@/model/index.model";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { CopyTextButton } from "@/feature/quote/component/ShareBackgroundComponent/component/copy-text-button"

interface Props {
    message: ContentChatMessage;
    loadingContent?: boolean;
}

const ChatMessageComponent = (props: Props) => {
    const { message, loadingContent } = props
    
    return (
        <div
            className={
                cn(
                    "max-w-[75%] ",
                    message.role === "user"
                        ? "ml-auto  "
                        : "mr-auto  "
                )
            } >

            <div
                className={cn(
                    " rounded-2xl px-4 py-2 text-sm relative",
                    message.role === "user" ? "  bg-primary text-white" : " bg-muted"
                )}
            >
                {
                    (
                        (loadingContent && message?.role == 'assistant') && (
                            <div className="animate-pulse  bg-gray-300 w-4 h-4 rounded-full"></div>
                        )
                    )
                }
                {
                    message?.role == 'assistant' && (
                        <>
                            <BotMessageSquare className="absolute -top-5 left-2 text-primary bg-muted rounded-2xl p-1" />
                        </>
                    )
                }
                {
                    (
                        message?.role == 'assistant'
                            ? <MarkdownRenderer content={message.content} />
                            : <>{message.content}</>
                    )
                }
            </div>
            <div className="flex justify-end  m-1">
                <CopyTextButton
                    text={message.content}
                    isLoaderText={false}
                    buttonClassName="scale-75" />
            </div>

        </div>)
}

export default React.memo(ChatMessageComponent)
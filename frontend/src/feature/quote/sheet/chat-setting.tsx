import React, { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { BotMessageSquare, CircleQuestionMarkIcon, Eye, EyeClosed, Settings } from "lucide-react";
import type { ContentChatMessage } from "@/model/index.model";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { CopyTextButton } from "@/feature/quote/dialog/component/copy-text-button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { useAiApiKeyStore } from "@/store/use-ai-api-key";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {

}

const ChatSetting = (props: Props) => {
    const { key, setKey } = useAiApiKeyStore()
    const { } = props
    const [isInputType, setIsInputType] = useState(false)

    return (
        <Dialog>
            <form aria-label="delete-note-form">

                <DialogTrigger asChild>
                    <Button variant="outline"
                        id="chat-setting-button"
                        title="chat-setting-button"
                        aria-label="chat-setting-button"
                        size={'sm'}>
                        <Settings />
                    </Button>
                </DialogTrigger>

                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>
                            Chat setting
                        </DialogTitle>
                        <DialogDescription>
                            Change chat setting
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <Label htmlFor="ai-api-key">
                            AI API key (groq) <ApiInfoTooltip />
                        </Label>
                        <Field orientation="horizontal" className="py-2">
                            <Input
                                id="ai-api-key"
                                type={isInputType ? "text" : "password"}
                                placeholder="Add your AI API key here..."
                                value={key}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setKey(event.target.value)
                                }}
                            />
                            <Button aria-label="show-hide-key" onClick={() => setIsInputType((pre) => !pre)}>
                                {isInputType ? <Eye /> : <EyeClosed />}
                            </Button>
                        </Field>
                    </div>
                    <DialogFooter>
                        {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}

                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

function ApiInfoTooltip() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <CircleQuestionMarkIcon className="h-4 w-4 cursor-help text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-2xs">
                <p>
                    Your API key is used only to make requests directly to the provider.
                    It is never stored or shared.
                </p>
            </TooltipContent>
        </Tooltip>
    )
}

export default React.memo(ChatSetting)
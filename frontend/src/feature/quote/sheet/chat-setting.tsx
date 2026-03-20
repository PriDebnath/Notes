import React, { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { BotMessageSquare, Eye, EyeClosed, Settings } from "lucide-react";
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
                    <Button variant="outline" size={'sm'}>
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
                            AI API key (groq)
                        </Label>
                            <Field orientation="horizontal" className="py-2">
                        <Input
                        id="ai-api-key"
                            type={isInputType?"text":"password"}
                            placeholder="Add your AI API key here..."
                            value={key}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setKey(event.target.value)
                            }}
                        />
                          <Button onClick={()=>setIsInputType((pre)=>!pre)}>
                                    {isInputType? <Eye />: <EyeClosed />}
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

export default React.memo(ChatSetting)
import React from "react";
import { cn } from "@/lib/utils";
import { BotMessageSquare, Settings } from "lucide-react";
import type { ContentChatMessage } from "@/model/index.model";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { CopyTextButton } from "@/feature/quote/dialog/component/copy-text-button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import  { Button } from "@/components/ui/button";
import { sanitizeHTML } from "@/helper/sanitize-html";

interface Props {
  
}

const ChatSetting = (props: Props) => {
    const { } = props
   return (
    <Dialog>
      <form   aria-label="delete-note-form">
       
          <DialogTrigger asChild>
            <Button variant="outline" size={'sm'}>
                <Settings/>
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
          <div className="grid gap-4 ">
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
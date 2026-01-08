import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Quote } from "@/model/quote.model"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, type Dispatch, type SetStateAction } from "react"
import Tiptap from "@/components/common/tiptap"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"

interface Props {
  open: boolean;
  mode: "add" | "edit";
  quote: Quote | null;
  handleSubmit: (quote: Quote)=> void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddEditQuoteDialog(props: Props) {

  const { quote, mode, open, setOpen, handleSubmit } = props
  const [quoteData, setQuoteData] = useState<Quote | null>(quote)
  // Sync quoteData when quote prop changes or when dialog opens in add mode
  useEffect(() => {
    if (open) {
      if (quote) {
        setQuoteData(quote)
      } else {
        setQuoteData({ text: "" })
      }
    }
  }, [quote, open, mode])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (quoteData && quoteData.text.trim()) {
      handleSubmit(quoteData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleFormSubmit}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Add Quote</Button>
        </DialogTrigger> */}
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle>
              {mode == "add" ? "Add " : "Edit "}
              Quote
            </DialogTitle>
            <DialogDescription>
              {
                mode == "add"
                  ? "Add a new quote to your collection."
                  : "Edit the quote details below."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Quote</Label>
              {/* <Textarea 
                id="name-1" 
                name="name" 
                value={quoteData?.text || ""}
                onChange={(e)=>{
                  const textValue = e.target.value
                  setQuoteData({
                    ...quoteData,
                    id: quoteData?.id, // Preserve id when editing
                    text: textValue
                  })
                }} 
              /> */}
              {/* <Tiptap  /> */}
              <SimpleEditor />
            </div>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}
            <Button type="submit" onClick={handleFormSubmit}>
              {mode == "add" ? "Add Quote" : "Update Quote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Quote, QuoteFormData } from "@/model/quote.model"
import { useState, useEffect, type Dispatch, type SetStateAction } from "react"
import Tiptap from "@/components/common/tiptap-customized"
import TagField from "@/feature/quote/form-field/tag"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Props {
  open: boolean;
  mode: "add" | "edit";
  quote: Quote | null;
  handleSubmit: (quote: QuoteFormData) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddEditQuoteDialog(props: Props) {

  const { quote, mode, open, setOpen, handleSubmit } = props
  const [quoteData, setQuoteData] = useState<QuoteFormData>(() => ({
    text: quote?.text || "",
    tags: [],
  }))

  // Reset form when quote changes or dialog opens
  useEffect(() => {
    if (open) {
      setQuoteData({
        ...quoteData,
        text: quote?.text || "",
        tags: [],
      })
    }
  }, [quote, open])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (quoteData && quoteData?.text?.trim()) {
      handleSubmit({
        ...quoteData,
        text: quoteData.text || "",
        tags: quoteData.tags || []
      })
    }
  }


  const onValueUpdate = (text: string) => {
    setQuoteData(prev => ({
      ...prev,
      text: text
    }))
  }

  const onTagChoose = (tag: string) => {
    setQuoteData(prev => {
      const currentTags = prev?.tags || []
      const updatedTags = [...currentTags, tag]
      const uniqueTags = [...new Set(updatedTags)]
      return {
        ...prev,
        tags: uniqueTags
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleFormSubmit}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Add Quote</Button>
        </DialogTrigger> */}
        <DialogContent className="">
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
              <Tiptap value={quote?.text} onValueUpdate={onValueUpdate} />
            </div>
          </div>
          <Separator className="my-4" />
          <TagField onChoose={onTagChoose} />
          <div className="flex flex-wrap gap-2">
            {
              quoteData?.tags && quoteData?.tags.length > 0 && (
                quoteData?.tags.map((tag) => {
                  return (
                    <Badge
                      variant={'outline'}
                      className=" bg-primary/10 border-primary/30 text-primary/90"
                      key={tag}
                    >
                      #{tag}
                    </Badge>
                  )
                }
                )
              )
            }
          </div>
          <Separator className="my-4" />

          <DialogFooter className="flex no-wrap ">
            {/* 
            */}
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit" onClick={handleFormSubmit}>
              {mode == "add" ? "Add Quote" : "Update Quote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

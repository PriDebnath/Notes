import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Quote } from "@/model/index.model"
import { sanitizeHTML } from "@/helper/sanitize-html";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react"

interface Props {
  open: boolean;
  quote: Quote | null;
  handleDelete: (quote: Quote) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteQuoteDialog(props: Props) {

  const { quote, open, setOpen, handleDelete } = props

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleDelete(quote!)
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
              Delete              Quote
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete ?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 ">
            <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: sanitizeHTML(quote?.text!) }}></div>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}
            <Button type="submit" onClick={handleFormSubmit} variant={'destructive'} className="">
              Delete Quote
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

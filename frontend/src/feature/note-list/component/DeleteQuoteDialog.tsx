import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Note } from "@/model/index.model"
import { sanitizeHTML } from "@/helper/sanitize-html";
import { useState, useEffect, type Dispatch, type SetStateAction, memo } from "react"

interface Props {
  open: boolean;
  note: Note | null;
  handleDelete: (note: Note) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default memo(DeleteQuoteDialog)

function DeleteQuoteDialog(props: Props) {

  const { note, open, setOpen, handleDelete } = props

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleDelete(note!)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleFormSubmit} aria-label="delete-note-form">
        {/* 
          <DialogTrigger asChild>
            <Button variant="outline">Add Note</Button>
          </DialogTrigger>
        */}
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              Delete  
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete ?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 ">
            <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: sanitizeHTML(note?.text!) }}></div>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}
            <Button
              type="submit"
              onClick={handleFormSubmit}
              aria-label="delete"
              variant={'destructive'}
              className="">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

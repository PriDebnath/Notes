
import { useState, memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { capitalize } from "@/helper/capitalize";
import { Separator } from "@/components/ui/separator";
import { useThemeStore } from "@/store/use-theme.store";
import { useLastDeployed } from "@/hooks/use-last-deployed";
import { sortOptions, useSortStore } from "@/store/use-sort.store";
import { useColorThemeStore } from "@/store/use-color-theme.store";
import { useFontStore, fonts, type Font } from "@/store/use-font.store";
import { colorThemes, type ColorTheme } from "@/hooks/use-color-theme.hook";
import type { CardView, Note, QuoteFormData, SortOption } from "@/model/index.model";
import { cardViewOptions, useCardViewStore } from "@/store/use-card-view.store";
import { themeModes, type ThemeMode } from '@/hooks/use-dark-or-light-theme.hook'
import { showInfo, useShowCardInfo, type ShowInfo } from "@/store/use-card-info.store";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share, Settings, Link2Icon, SquareArrowOutUpRight, ArrowUpRight, TrashIcon, CircleArrowLeft, RotateCcw, Trash2Icon, CloudDownloadIcon, EyeIcon, EyeOffIcon, LinkIcon, EarthIcon, EarthLockIcon } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useGetAllDeletedQuoteDetails } from "@/feature/note-list/hook/use-get-all-delete-note-details.hook";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { useUpdateQuoteDetails } from "@/feature/note-list/hook/use-update-note-details.hook";
import { useDeleteCloudQuote, } from "../hook/use-delete-cloud-note.hook";
import { useGetAllCloudQuote } from "../hook/use-get-all-cloud-note.hook";
import { useCreateQuoteDetails } from "@/feature/note/hook/use-create-note-details.hook"
import { toast } from "sonner";
import { toastConfig } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tiptap-ui-primitive/tooltip";
import { useUpdateCloudQuote } from "../hook/use-update-cloud-note.hook";
import { Route } from "@/routes/shared-note/$_id";

interface Props {

}

function OpenCloudContainerComponent(props: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data, isLoading, refetch } = useGetAllCloudQuote()
  const { deleteCloudQuote } = useDeleteCloudQuote()
  const { updateCloudQuote } = useUpdateCloudQuote()
  const { updateQuote } = useUpdateQuoteDetails()
  const { createQuote } = useCreateQuoteDetails()
  const handleCloudDownload = async (note: Note) => {
    await createQuote({
      ...note,
      text: note.text || "Empty",
      synced: true
    })
    toast.success("Stored in local", toastConfig)
  }

  const handleHardDelete = async (note: Note) => {
    if (!note._id) return
    await deleteCloudQuote({ _id: note._id })
    refetch()
  }

  const handleUpdate = async (note: Note) => {
    if (!note._id) return
    await updateCloudQuote({ _id: note._id, shared: !note?.shared })
    refetch()
  }

  const handleLinkCopy = async (note: Note) => {
    const location = router.buildLocation({
      to: "/shared-note/$_id",
      params: {
        _id: note._id!
      }
    })
    const origin = window.location.origin
    const fullLink = origin + location.href
    console.log({ fullLink });
    await navigator.clipboard.writeText(fullLink)
    toast.success("Link copy", toastConfig)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}

    >
      <DialogTrigger asChild
        aria-label="settings-button">
        <Button
          variant="outline"
          size="sm"
          className={cn(open ? "  text-primary" : "")}
        >
          Open
          {/* <TrashIcon /> */}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="p-4 gap-2  max-h-[90vh] overflow-auto"
        aria-describedby="recycle-bin"
        aria-label="settings">
        <DialogHeader>
          <DialogTitle>Cloud Container</DialogTitle>
          <DialogDescription>
            Find your top secrects here...
          </DialogDescription>
        </DialogHeader>

        <div
          className=" overflow-y-auto rounded-xl  h-40 min-h-0 flex flex-col gap-1 border-2  p-2">
          {data?.map((note, i) => (
            <div key={'bin' + note.id}
              className="flex justify-between border-2 rounded-lg p-2">
              <div
                className=" "
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(note?.text!)
                }}
              />
              <div className="flex items-center gap-2">
                {note.shared && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className={cn("hover:text-primary focus:text-primary active:text-primary",)}
                        variant={"outline"}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkCopy(note)
                        }}
                        aria-label={"Copy link"}
                        size={"sm"}
                      >
                        <Link2Icon />
                        {/* <LinkIcon /> */}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The link will be copied </p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={cn("hover:text-primary focus:text-primary active:text-primary",)}
                      variant={"outline"}
                      onClick={(e) => {
                        e.preventDefault()
                        handleUpdate(note)
                      }}
                      aria-label={"Shared by link"}
                      size={"sm"}
                    >
                      {note?.shared ? <EarthIcon /> : <EarthLockIcon />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {note?.shared ? "Shared by the link" : "Not shared"}
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={cn("hover:text-primary focus:text-primary active:text-primary",)}
                      variant={"outline"}
                      onClick={(e) => {
                        e.preventDefault()
                        handleCloudDownload(note)
                      }}
                      aria-label={"Cloud Download"}
                      size={"sm"}
                    >
                      <CloudDownloadIcon />
                    </Button>

                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A new copy will be downloaded</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={cn("hover:text-primary focus:text-primary active:text-primary",)}
                      variant={"outline"}
                      onClick={(e) => {
                        e.preventDefault()
                        handleHardDelete(note)
                      }}
                      aria-label={"Delete note"}
                      size={"sm"}
                    >
                      <Trash2Icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p> Cloud item will be deleted instantly</p>
                  </TooltipContent>
                </Tooltip>

              </div>
            </div>

          ))}
          {
            !data?.length && (
              <p className="w-full flex items-center justify-center h-48 text-muted-foreground">
                No secrets written. For now.
              </p>
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(OpenCloudContainerComponent)


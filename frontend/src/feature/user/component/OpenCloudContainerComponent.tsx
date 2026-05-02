
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
import { useLastDeployed } from "@/hook/use-last-deployed";
import { sortOptions, useSortStore } from "@/store/use-sort.store";
import { useColorThemeStore } from "@/store/use-color-theme.store";
import { useFontStore, fonts, type Font } from "@/store/use-font.store";
import { colorThemes, type ColorTheme } from "@/hook/use-color-theme.hook";
import type { CardView, Quote, QuoteFormData, SortOption } from "@/model/index.model";
import { cardViewOptions, useCardViewStore } from "@/store/use-card-view.store";
import { themeModes, type ThemeMode } from '@/hook/use-dark-or-light-theme.hook'
import { showInfo, useShowCardInfo, type ShowInfo } from "@/store/use-card-info.store";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share, Settings, Link2Icon, SquareArrowOutUpRight, ArrowUpRight, TrashIcon, CircleArrowLeft, RotateCcw, Trash2Icon, CloudDownloadIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useGetAllDeletedQuoteDetails } from "@/feature/quote-list/hook/use-get-all-delete-quote-details.hook";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { useUpdateQuoteDetails } from "@/feature/quote-list/hook/use-update-quote-details.hook";
import { deleteQuoteWithLinks } from "@/db/quote_tags.db";
import { useDeleteCloudQuote, } from "../hook/use-delete-cloud-quote.hook";
import { useGetCloudQuote } from "../hook/use-get-cloud-quote.hook";
import { useCreateQuoteDetails } from "@/feature/quote/hook/use-create-quote-details.hook"
import { toast } from "sonner";
import { toastConfig } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tiptap-ui-primitive/tooltip";

interface Props {

}

function OpenCloudContainerComponent(props: Props) {
  const [open, setOpen] = useState(false)
  const { data, isLoading, refetch } = useGetCloudQuote()
  const { deleteCloudQuote } = useDeleteCloudQuote()
  const { updateQuote } = useUpdateQuoteDetails()
  const { createQuote } = useCreateQuoteDetails()

  const handleCloudDownload = async (quote: Quote) => {
    await createQuote({
      ...quote,
      text: quote.text || "Empty",
      synced: true
    })
    toast.success("Stored in local", toastConfig)
  }

  const handleHardDelete = async (quote: Quote) => {
    if (!quote._id) return
    await await deleteCloudQuote({ _id: quote._id })
    refetch()
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
          {data?.map((quote, i) => (
            <div key={'bin' + quote.id}
              className="flex justify-between border-2 rounded-lg p-2">
              <div
                className=" "
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(quote?.text!)
                }}
              />
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={cn("hover:text-primary focus:text-primary active:text-primary",)}
                      variant={"outline"}
                      onClick={(e) => {
                        e.preventDefault()
                        handleCloudDownload(quote)
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
                        handleHardDelete(quote)
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


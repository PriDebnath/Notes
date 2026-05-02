
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
import type { CardView, Quote, QuoteFormData, SortOption } from "@/model/index.model";
import { cardViewOptions, useCardViewStore } from "@/store/use-card-view.store";
import { themeModes, type ThemeMode } from '@/hooks/use-dark-or-light-theme.hook'
import { showInfo, useShowCardInfo, type ShowInfo } from "@/store/use-card-info.store";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share, Settings, Link2Icon, SquareArrowOutUpRight, ArrowUpRight, TrashIcon, CircleArrowLeft, RotateCcw, Trash2Icon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useGetAllDeletedQuoteDetails } from "@/feature/quote-list/hook/use-get-all-delete-quote-details.hook";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { useUpdateQuoteDetails } from "@/feature/quote-list/hook/use-update-quote-details.hook";
import { deleteQuoteWithLinks } from "@/db/quote_tags.db";
import { TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";


interface Props {

}

function RecycleBinComponent(props: Props) {
  const [open, setOpen] = useState(false)
  const { data, isLoading, refetch } = useGetAllDeletedQuoteDetails()
  const { updateQuote } = useUpdateQuoteDetails()

  const handleRestore = async (quote: Quote) => {
    if (!quote.id) return
    await updateQuote({
      ...quote,
      text: quote.text || "Empty",
      deleted: false,
      synced: false,
    })
    refetch()
  }

  const handleHardDelete = async (quote: Quote) => {
    if (!quote.id) return
    await await deleteQuoteWithLinks(quote.id)
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
          className={cn("text-xs", "h-6!", open ? "  text-primary" : "")}
        >
          Open Bin
          {/* <TrashIcon /> */}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="p-4 gap-2  max-h-[90vh] overflow-auto"
        aria-describedby="recycle-bin"
        aria-label="settings">
        <DialogHeader>
          <DialogTitle>Recycle Bin</DialogTitle>
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
                        handleRestore(quote)
                      }}
                      aria-label={"Restore note"}
                      size={"sm"}
                    >
                      <RotateCcw />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p> Restore item  </p>
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
                    <p>  Item will be deleted instantly</p>
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

export default memo(RecycleBinComponent)



import { useState, memo, Suspense } from "react";
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
import type { CardView, QuoteFormData, SortOption } from "@/model/index.model";
import { cardViewOptions, useCardViewStore } from "@/store/use-card-view.store";
import { themeModes, type ThemeMode } from '@/hook/use-dark-or-light-theme.hook'
import { showInfo, useShowCardInfo, type ShowInfo } from "@/store/use-card-info.store";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share, Settings, Link2Icon, SquareArrowOutUpRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import RecycleBinDialog from "./recycle-bin.dialog";
import { ButtonLoader } from "@/components/ui/button-loader";
import { cn } from "@/lib/utils";

interface Props {

}

function SettingComponent(props: Props) {
  const { theme, setTheme, isDark } = useThemeStore()
  const [open, setOpen] = useState(false)
  const { colorTheme, setColorTheme } = useColorThemeStore()
  const { info, setInfo } = useShowCardInfo()
  const { font, setFont } = useFontStore()
  const { sortBy, setSortBy } = useSortStore()
  const { view, setView } = useCardViewStore()
  const lastDeployed = useLastDeployed()
  const controlHeightClass = " h-6!"
  const fontClassXxs = "text-[0.5rem]"

  return (
    <Dialog open={open} onOpenChange={setOpen}

    >
      <DialogTrigger asChild
        aria-label="settings-button">
        <Button
          variant="outline"
          size="icon"
          className={open ? "  text-primary" : ""}
        >
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="p-4 gap-2  max-h-[90vh] overflow-auto"
        aria-describedby="Settings"
        aria-label="settings">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Choose your setting
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-border" />
        <div className="flex flex-col gap-1 ">
          <p className={cn("text-muted-foreground ", fontClassXxs)}>App Style</p>
          <div className="flex justify-between items-center text-xs">
            Appearance
            <Select value={theme} onValueChange={(value: ThemeMode) => setTheme(value)}>
              <SelectTrigger className={cn("text-xs", controlHeightClass)}>
                <SelectValue placeholder="Appearance" />
              </SelectTrigger>
              <SelectContent className="">
                {
                  themeModes.map((pri) => {
                    const yo = capitalize(pri)
                    return (
                      <SelectItem key={pri} value={pri} className="text-capitalize capitalize">
                        {yo}
                      </SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between  items-center text-xs">
            Color Theme
            <Select
              value={colorTheme}
              onValueChange={(value: ColorTheme) => setColorTheme(value)}>
              <SelectTrigger className={cn("text-xs", controlHeightClass)}>
                <SelectValue placeholder="Color Theme" className="text-capitalize capitalize" />
              </SelectTrigger>
              <SelectContent className="">
                {
                  colorThemes.map((pri) => {
                    const yoyo = pri.replace("theme-", "")
                    const yo = capitalize(yoyo)
                    // console.log({ yo, yoyo })
                    return (
                      <SelectItem key={pri} value={pri} className="">
                        {yo}
                      </SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center text-xs">
            Font
            <Select value={font} onValueChange={(value: Font) => setFont(value)}>
              <SelectTrigger className={cn("text-xs", controlHeightClass)}>
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                {
                  fonts.map((pri) => {
                    let yoyoyo = pri.replace("font-", "")
                    let yoyo = yoyoyo.replaceAll("-", " ")
                    let yo = capitalize(yoyo)
                    return (
                      <SelectItem key={pri} value={pri} className="">
                        {yo}
                      </SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className={cn("flex flex-col gap-1",)}>
          <p className={cn("text-muted-foreground ", fontClassXxs)}>Card Style</p>
          <div className="flex justify-between items-center text-xs">
            Show Info
            <Select value={info} onValueChange={(value: ShowInfo) => setInfo(value)}>
              <SelectTrigger className={cn("text-xs", controlHeightClass)}>
                <SelectValue placeholder="Show Info" className="" />
              </SelectTrigger>
              <SelectContent >
                {
                  showInfo.map((pri) => {
                    let yo = pri.charAt(0).toUpperCase() + pri.slice(1)
                    return (
                      <SelectItem key={pri} value={pri} className=" ">
                        {yo.replaceAll('_', " ")}
                      </SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center text-xs">
            Sort by
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className={cn("text-xs", controlHeightClass)}>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {
                  sortOptions.map((pri) => {
                    let yo = capitalize(pri.key)
                    return (
                      <SelectItem key={pri.key} value={pri.key} className="">
                        {yo.replaceAll('_', " ")}
                      </SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center text-xs">
            View
            <Select value={view} onValueChange={(value: CardView) => setView(value)}>
              <SelectTrigger className={cn("text-xs", controlHeightClass)}>
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                {
                  cardViewOptions.map((pri) => {
                    const yo = capitalize(pri.key)
                    return (
                      <SelectItem key={pri.key} value={pri.key} className="">
                        {yo.replaceAll('_', " ")}
                      </SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>
        </div>


        <Separator className="bg-border" />

        <div className="flex flex-col gap-1">
          <p className={cn("text-muted-foreground ", fontClassXxs)}>My Profile</p>
          <div className="flex justify-between items-center text-xs ">
            Profile
            <Link to="/me" title='me' aria-label="me-link" className="text-primary">
              <span className="flex items-center">
                Visit
                <ArrowUpRight />
              </span>
            </Link>
          </div>
        </div>



        <Separator className="bg-border" />
        <div className="flex flex-col gap-2">
          <p className={cn("text-muted-foreground ", fontClassXxs)}>Other</p>
          <div className="flex justify-between items-center text-xs ">
            Recycle Bin
            <Suspense fallback={<ButtonLoader />}>
              <RecycleBinDialog />
            </Suspense>
          </div>
          <div className="flex justify-between text-center ">
            <p className="text-muted-foreground text-xs">
              Last updated
            </p>
            <p className="text-muted-foreground text-xs">
              {lastDeployed}
            </p>
          </div>
        </div>

        <Separator className="bg-border" />
        <div className=" w-full text-center  text-sm">
          <a href="https://pridebnath.github.io/portfolio-v2/" target="_blank"
           className="hover:underline focus:underline active:underline">
            Made with 💙 by Pritam Debnath
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(SettingComponent)


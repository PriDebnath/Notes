
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { QuoteFormData, SortOption } from "@/model/index.model";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select"
import { useState } from "react";
import { themeModes, type ThemeMode } from '@/hook/use-dark-or-light-theme.hook'
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share, Settings } from "lucide-react";
import { colorThemes, type ColorTheme } from "@/hook/use-color-theme.hook";
import { useColorThemeStore} from "@/store/use-color-theme.store";
import { useThemeStore} from "@/store/use-theme.store";
import { showInfo, useShowCardInfo, type ShowInfo } from "@/hook/use-show-card-info.hook";
import { capitalize } from "@/helper/capitalize";

interface SortOptions { key: SortOption, label: string }

const sortOptions: SortOptions[] = [
  {
    key: "created_at",
    label: "Created at",
  },
  {
    key: "updated_at",
    label: "Updated at",
  },
]
interface Props {

}

export function SettingComponent(props: Props) {
const { theme, setTheme, isDark } = useThemeStore()
const [open, setOpen] = useState(false)
const { colorTheme, setColorTheme } = useColorThemeStore()
  const { info, setInfo } = useShowCardInfo()

  const [sortBy, setSortBy] = useState<SortOptions["key"]>("created_at")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={open ? "  text-primary" : ""}
        >
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-4  overflow-y-auto" aria-describedby="Settings">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Choose your setting
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-border" />
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-muted-foreground text-xs">App Style</p>
          <div className="flex justify-between items-center ">
            Appearance
            <Select value={theme} onValueChange={(value) => setTheme(value as ThemeMode)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Appearance" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="flex justify-between  items-center ">
            Color Theme
            <Select
              value={colorTheme}
              onValueChange={(value) => setColorTheme(value as ColorTheme)}>
              <SelectTrigger className="">
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
          <div className="flex justify-between items-center ">
            Sort by
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="">
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
        </div>

        <Separator className="bg-border" />

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">Card Style</p>
          <div className="flex justify-between items-center ">
            Show Info
            <Select value={info} onValueChange={(value) => setInfo(value as ShowInfo)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Show Info" />
              </SelectTrigger>
              <SelectContent>
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
        </div>

        <Separator className="bg-border" />

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">Other</p>
          <div className="flex justify-between text-center ">
            Made with 💙 by Pritam
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

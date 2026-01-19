
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
import type { QuoteFormData } from "@/model/quote.model";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select"
import { useState } from "react";
import { useTheme, type ThemeMode } from '@/hook/use-dark-or-light-theme.hook'
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy, Images, LoaderCircle, Save, Share, Settings } from "lucide-react";
import { colorThemes, useColorTheme, type ColorTheme } from "@/hook/use-color-theme.hook";


interface Props {

}

export function SettingComponent(props: Props) {

  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()
  const [open, setOpen] = useState(false)


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
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            Appearance
            <Select value={theme} onValueChange={(value) => setTheme(value as ThemeMode)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>

                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>

                <SelectItem value="system" >System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator className="bg-border" />
          <div className="flex justify-between gap-4">
            Color Theme
            <Select value={colorTheme} onValueChange={(value) => setColorTheme(value as ColorTheme)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Color Theme" />
              </SelectTrigger>
              <SelectContent>
                {
                  colorThemes.map((pri) => {
                    return (
                      <SelectItem value={pri} className="text-capitalize capitalize">{pri}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          </div>



        </div>
      </DialogContent>
    </Dialog>
  );
}

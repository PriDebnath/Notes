
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuoteFormData } from "@/model/quote.model";
import { ArrowLeftIcon, CircleArrowDown, CircleCheckBig, Copy,Images, LoaderCircle, Save, Share , Settings} from "lucide-react";
import useBackground, { type Pri_set, type TextureKey } from "@/hook/use-background.hook";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { htmlToPlainText } from "@/helper/html-to-text";
import { cn } from "@/lib/utils";
import { ListTags } from "@/feature/quote/list.tags";
import { toPng } from "html-to-image"
import { ResizableBox } from "react-resizable";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

  import { useTheme } from '@/hook/use-dark-or-light-theme.hook'
  

interface Props {
  
}

type Status = "idle" | "pending" | "success"

export function SettingComponent(props: Props) {
  
  const [position, setPosition] = React.useState("bottom")
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  
  
  const [appearanceValue, setAppearanceValue] = useState("system")
  
  const { theme, setTheme } = useTheme()
  

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings/>
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
<Select value={theme} onValueChange={setTheme}>
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
     


        
        </div>
      </DialogContent>
    </Dialog>
  );
}

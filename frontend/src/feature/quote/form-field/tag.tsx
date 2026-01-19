import { Button } from "@/components/ui/button";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { cn } from "@/lib/utils";
import type { Quote } from "@/model/index.model";
import { Check, Copy, PenIcon, Trash, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { ChooseTagDropdown } from "@/feature/quote/dropdown/choose-tag"

interface Props {
  onChoose: (tag: string) => void
}

const TagField = (props: Props) => {
  const { onChoose } = props

  return (
      <div className="py-2 flex items-center justify-between ">
        <Label htmlFor="tag" className="text-foreground">Tag</Label>
        <ChooseTagDropdown onChoose={onChoose} />
      </div>

  )
}

export default TagField
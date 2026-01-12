import { Button } from "@/components/ui/button";
import { sanitizeHTML } from "@/helper/sanitize-html";
import { cn } from "@/lib/utils";
import type { Quote } from "@/model/quote.model";
import { Check, Copy, PenIcon, Trash, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label"

interface Props {

}

const TagField = () => {


    return (
    <div >
    <div className="flex items-center justify-between">
      <Label htmlFor="tag">Tag</Label>

        <Button
        variant={"outline"}
        size="icon"
          className="   ">
          <PlusIcon  />
        </Button>
    </div>
    </div>
    )
}

export default TagField
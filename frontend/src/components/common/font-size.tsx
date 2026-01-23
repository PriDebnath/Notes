import type { Editor } from "@tiptap/react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const SIZES = [
  { label: "8px", value: "8px" },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "18px", value: "18px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
]

export function FontSizeDropdown({ editor }: { editor: Editor }) {
  return (
    <Select
      onValueChange={(value) =>
        editor.chain().focus().setFontSize(value).run()
      }
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>

      <SelectContent>
        {SIZES.map(size => (
          <SelectItem key={size.value} value={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


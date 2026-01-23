import type { Editor } from "@tiptap/react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function HeadingDropdown({ editor }: { editor: Editor }) {
  const value =
    editor.isActive("heading", { level: 1 }) ? "h1" :
      editor.isActive("heading", { level: 2 }) ? "h2" :
        editor.isActive("heading", { level: 3 }) ? "h3" :
          "p"

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        const chain = editor.chain().focus()
        if (v === "p") chain.setParagraph().run()
        if (v === "h1") chain.setHeading({ level: 1 }).run()
        if (v === "h2") chain.setHeading({ level: 2 }).run()
        if (v === "h3") chain.setHeading({ level: 3 }).run()
      }}
    >
      <SelectTrigger className="">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="h1">H1</SelectItem>
        <SelectItem value="h2">H2</SelectItem>
        <SelectItem value="h3">H3</SelectItem>
        <SelectItem value="p">P</SelectItem>
      </SelectContent>
    </Select>
  )
}

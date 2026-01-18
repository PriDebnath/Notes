import { useMemo, useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface TagFilterProps {
  tags: string[]
  value: string[]
  onChange: (tags: string[]) => void
}

export function TagFilter({ tags, value, onChange }: TagFilterProps) {
  const [open, setOpen] = useState(false)

  const toggleTag = (tag: string) => {
    onChange(
      value.includes(tag)
        ? value.filter(t => t !== tag)
        : [...value, tag]
    )
  }

  const label = useMemo(() => {
    if (value.length === 0) return "Filter"
    if (value.length === 1) return value[0]
    return `${value.length} tags`
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter  />
          {value.length > 0 && (
            <span 
              className="flex items-center justify-center w-4 h-4 aspect-square  absolute -top-1 -right-1 text-sm rounded-full bg-primary ">
              {value.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-40">
       <div className="sticky top-0 z-10 backdrop-blur-sm">
                    <div className=" ">Filter by tags</div>
                    <Separator className="bg-border" />
                </div>
      
        <div className="flex flex-col overflow-auto h-64 gap-2">
          {tags.map(tag => (
            <Button
              key={tag}
              size="sm"
              variant={value.includes(tag) ? "default" : "outline"}
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </Button>
          ))}

          {tags.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No tags available
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

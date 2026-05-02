import { Label } from "@/components/ui/label"
import ChooseTagDropdownComponent from "@/feature/quote/component/ChooseTagDropdownComponent"

interface Props {
  onChoose: (tag: string) => void
}

const TagFieldComponent = (props: Props) => {
  const { onChoose } = props

  return (
      <div className="py-2 flex items-center justify-between " aria-label="tag-field">
        <Label htmlFor="tag" className="text-foreground">Tag</Label>
        <ChooseTagDropdownComponent onChoose={onChoose} />
      </div>
  )
}

export default TagFieldComponent
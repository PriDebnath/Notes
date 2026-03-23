
import { Loader2 } from "lucide-react"
import { Button } from "./button"

function ButtonLoader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Button
      variant="outline"
      aria-label='button-loader'
      title='button-loader'
      disabled
      className="gap-2 opacity-70"
    >
      <Loader2 className="h-4 w-4 animate-spin" />
    </Button>
  )
}

export { ButtonLoader }

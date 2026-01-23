
import { Button } from '@/components/tiptap-ui-primitive/button'


export function ToolbarButton({
  onClick,
  title,
  active,
  disabled,
  children,
}: {
  onClick: () => void
  title?: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      title={title}
      disabled={disabled}
      data-active-state={active ? 'on' : 'off'}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

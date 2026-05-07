import { NotePage } from '@/page/note/note/note.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotePage mode= "add"/>
}

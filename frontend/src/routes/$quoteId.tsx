import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$quoteId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$quoteId"!</div>
}

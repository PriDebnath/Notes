import { QuotePage } from '@/page/quote/quote.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QuotePage mode= "add"/>
}

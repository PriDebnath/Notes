import { createFileRoute } from '@tanstack/react-router'
import { QuotePage } from '@/page/quote/quote.page'

export const Route = createFileRoute('/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QuotePage mode= "add"/>
}

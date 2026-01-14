import { createFileRoute } from '@tanstack/react-router'
import { useGetQuoteDetails } from '@/hook/get-quote-details.hook'

export const Route = createFileRoute('/$quoteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {quoteId} = Route.useParams()

  const {data: quote, isLoading, error} = useGetQuoteDetails(Number(quoteId))
  
  return <div>
    {quote?.text}
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
  </div>
}

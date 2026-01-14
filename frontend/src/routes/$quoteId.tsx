import { createFileRoute } from '@tanstack/react-router'
import { useGetQuoteDetails } from '@/hook/get-quote-details.hook'
import Tiptap from '@/components/common/tiptap-customized'

export const Route = createFileRoute('/$quoteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {quoteId} = Route.useParams()

  const {data: quote, isLoading, error} = useGetQuoteDetails(Number(quoteId))
  
  return <div>
    {quote?.text}
    <Tiptap value={quote?.text} onValueUpdate={()=>{}} />
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
  </div>
}

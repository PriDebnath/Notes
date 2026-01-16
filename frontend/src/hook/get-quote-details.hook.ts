import { useQuery } from "@tanstack/react-query"
import { getQuoteDetails } from "@/db/quote_tags.db"

export const useGetQuoteDetails = (quoteId?: number) => {
    const { data, isLoading, error} = useQuery({
    queryKey: ['quote-details', quoteId],
    queryFn: () => getQuoteDetails(quoteId!),
    enabled: Boolean(quoteId)
  })
  const errorString = error?.message
  return { data, isLoading , error: errorString}
}
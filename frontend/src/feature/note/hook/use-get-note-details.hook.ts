import { useQuery } from "@tanstack/react-query"
import { getQuoteDetails } from "@/db/note_tags.db"

export const queryKeysGetQuote = 'quote-details'

export const useGetQuoteDetails = (quoteId?: number) => {
    const { data, isLoading, error} = useQuery({
    queryKey: [queryKeysGetQuote, quoteId],
    queryFn: () => getQuoteDetails(quoteId!),
    enabled: Boolean(quoteId)
  })
  const errorString = error?.message
  return { data, isLoading , error: errorString}
}
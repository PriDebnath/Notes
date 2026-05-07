import { useQuery } from "@tanstack/react-query"
import { getAllQuotesDetails } from "@/db/note_tags.db"
import { useSortStore } from "@/store/use-sort.store"

export const queryKeysGetAllQuote = 'all-note-details'

export const useGetAllQuoteDetails = () => {
  const { sortBy } = useSortStore()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKeysGetAllQuote, sortBy],
    queryFn: () => getAllQuotesDetails({sortBy: sortBy, include:"non-deleted"}),
  })

  // console.log({ data, error })
  const errorString = (typeof error == "string") ? error : error?.message

  return { data, isLoading, error: errorString, refetch }
}
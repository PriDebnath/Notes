import { useQuery } from "@tanstack/react-query"
import { getAllQuotesDetails } from "@/db/quote_tags.db"
import { useSortStore } from "@/store/use-sort.store"

export const useGetAllDeletedQuoteDetails = () => {
  const { sortBy } = useSortStore()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['all-quote-details', sortBy],
    queryFn: () => getAllQuotesDetails({sortBy: sortBy, include:"deleted"}),
  })

  // console.log({ data, error })
  const errorString = (typeof error == "string") ? error : error?.message

  return { data, isLoading, error: errorString, refetch }
}
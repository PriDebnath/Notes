import { useQuery } from "@tanstack/react-query"
import { getAllQuotesDetails, getQuoteDetails } from "@/db/quote_tags.db"

export const useGetAllQuoteDetails = () => {
    const { data, isLoading, error, refetch} = useQuery({
    queryKey: ['all-quote-dtails'],
    queryFn: () => getAllQuotesDetails(),
  })
  console.log({data, error})
  const errorString = (typeof error=="string") ?  error: error?.message
  return { data: data?.reverse(), isLoading , error: errorString, refetch}
}
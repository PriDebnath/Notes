import { addQuote, } from '@/db/quote.db'
import { queryKeysGetQuote } from "./use-get-quote-details.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateQuoteDetails = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeysGetQuote
      })
    }
  })
  return {
    ...mutation,
    createQuote: mutation.mutateAsync
  }
}
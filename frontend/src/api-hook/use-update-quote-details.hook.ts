import { addQuote, updateQuote } from '@/db/quote.db'
import { queryKeysGetQuote } from "./use-get-quote-details.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useUpdateQuoteDetails = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeysGetQuote
      })      
    }
  })
  return {
    ...mutation,
    updateQuote: mutation.mutateAsync
  }
}
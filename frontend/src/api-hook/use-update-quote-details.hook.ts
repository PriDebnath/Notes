import { addQuote, updateQuote } from '@/db/quote.db'
import { queryKeysGetQuote } from "./use-get-quote-details.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeysGetAllQuote } from './use-get-all-quote-details.hook'

export const useUpdateQuoteDetails = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateQuote,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeysGetQuote, variables.id],
      })

      queryClient.invalidateQueries({
        queryKey: [queryKeysGetAllQuote],
      })
    }
  })
  return {
    ...mutation,
    updateQuote: mutation.mutateAsync
  }
}
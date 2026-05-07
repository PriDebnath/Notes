import { addQuote, } from '@/db/note.db'
import { queryKeysGetQuote } from "./use-get-note-details.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateQuoteDetails = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeysGetQuote]
      })
    }
  })
  return {
    ...mutation,
    createQuote: mutation.mutateAsync
  }
}
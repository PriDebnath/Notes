import { addNote, } from '@/db/note.db'
import { queryKeysGetNote } from "./use-get-note-details.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateNoteDetails = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeysGetNote]
      })
    }
  })
  return {
    ...mutation,
    createNote: mutation.mutateAsync
  }
}
import { addNote, updateNote } from '@/db/note.db'
import { queryKeysGetNote } from "@/feature/note/hook/use-get-note-details.hook"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeysGetAllNote } from './use-get-all-note-details.hook'

export const useUpdateNoteDetails = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeysGetNote, variables.id],
      })

      queryClient.invalidateQueries({
        queryKey: [queryKeysGetAllNote],
      })
    }
  })
  return {
    ...mutation,
    updateNote: mutation.mutateAsync
  }
}
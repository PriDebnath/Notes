import { useQuery } from "@tanstack/react-query"
import { getNoteDetails } from "@/db/note_tags.db"

export const queryKeysGetNote = 'note-details'

export const useGetNoteDetails = (quoteId?: number) => {
    const { data, isLoading, error} = useQuery({
    queryKey: [queryKeysGetNote, quoteId],
    queryFn: () => getNoteDetails(quoteId!),
    enabled: Boolean(quoteId)
  })
  const errorString = error?.message
  return { data, isLoading , error: errorString}
}
import { useQuery } from "@tanstack/react-query"
import { getNoteDetails } from "@/db/note_tags.db"

export const queryKeysGetNote = 'note-details'

export const useGetNoteDetails = (noteId?: number) => {
    const { data, isLoading, error} = useQuery({
    queryKey: [queryKeysGetNote, noteId],
    queryFn: () => getNoteDetails(noteId!),
    enabled: Boolean(noteId)
  })
  const errorString = error?.message
  return { data, isLoading , error: errorString}
}
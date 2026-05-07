import { useQuery } from "@tanstack/react-query"
import { getAllNotesDetails } from "@/db/note_tags.db"
import { useSortStore } from "@/store/use-sort.store"

export const useGetAllDeletedNoteDetails = () => {
  const { sortBy } = useSortStore()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['all-deleted-note-details', sortBy],
    queryFn: () => getAllNotesDetails({sortBy: sortBy, include:"deleted"}),
  })

  // console.log({ data, error })
  const errorString = (typeof error == "string") ? error : error?.message

  return { data, isLoading, error: errorString, refetch }
}
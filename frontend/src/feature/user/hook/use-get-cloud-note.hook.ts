import { apiClient } from "@/lib/apiClient"
import type { Note } from "@/model/index.model"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export type Param = {
    _id: string
}

const getCloudNote = (param : Param) =>
    apiClient<Note>("/api/v1/notes/" + param?._id, {
        method: "GET",
    })

export const useGetCloudNoteKey = "get-cloud-note"

export const useGetCloudNote = (param : Param) => {
    const queryClient = useQueryClient()
    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: [useGetCloudNoteKey]
        })
    }
    const data = useQuery({
        queryFn: () => getCloudNote(param),
        queryKey: [useGetCloudNoteKey],
    })
    return { ...data, invalidateQueries }
}
import { apiClient } from "@/lib/apiClient"
import type { Note } from "@/model/index.model"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export type Param = {
}

const getAllCloudNote = () =>
    apiClient<Note[]>("/api/v1/notes/" , {
        method: "GET",
    })

export const useGetAllCloudNoteKey = "get-all-cloud-note"

export const useGetAllCloudNote = () => {
    const queryClient = useQueryClient()
    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: [useGetAllCloudNoteKey]
        })
    }
    const data = useQuery({
        queryFn: () => getAllCloudNote(),
        queryKey: [useGetAllCloudNoteKey],
    })
    return { ...data, invalidateQueries }
}
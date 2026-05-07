import { apiClient } from "@/lib/apiClient"
import type { Note } from "@/model/index.model"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export type Param = {
}

const getAllCloudQuote = () =>
    apiClient<Note[]>("/api/v1/notes/" , {
        method: "GET",
    })

export const useGetAllCloudQuoteKey = "get-all-cloud-note"

export const useGetAllCloudQuote = () => {
    const queryClient = useQueryClient()
    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: [useGetAllCloudQuoteKey]
        })
    }
    const data = useQuery({
        queryFn: () => getAllCloudQuote(),
        queryKey: [useGetAllCloudQuoteKey],
    })
    return { ...data, invalidateQueries }
}
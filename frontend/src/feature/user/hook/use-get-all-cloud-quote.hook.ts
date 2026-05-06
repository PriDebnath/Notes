import { apiClient } from "@/lib/apiClient"
import type { Quote } from "@/model/index.model"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export type Param = {
}

const getAllCloudQuote = () =>
    apiClient<Quote[]>("/api/v1/notes/" , {
        method: "GET",
    })

export const useGetAllCloudQuoteKey = "get-all-cloud-quote"

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
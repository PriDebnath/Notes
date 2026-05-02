import { apiClient } from "@/lib/apiClient"
import type { Quote } from "@/model/index.model"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export type Param = {
}

const getCloudQuote = () =>
    apiClient<Quote[]>("/api/v1/notes/" , {
        method: "GET",
    })

export const useGetCloudQuoteKey = "get-cloud-quote"

export const useGetCloudQuote = () => {
    const queryClient = useQueryClient()
    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: [useGetCloudQuoteKey]
        })
    }
    const data = useQuery({
        queryFn: () => getCloudQuote(),
        queryKey: [useGetCloudQuoteKey],
    })
    return { ...data, invalidateQueries }
}
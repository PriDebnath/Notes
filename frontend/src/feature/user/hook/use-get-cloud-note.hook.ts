import { apiClient } from "@/lib/apiClient"
import type { Quote } from "@/model/index.model"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export type Param = {
    _id: string
}

const getCloudQuote = (param : Param) =>
    apiClient<Quote>("/api/v1/notes/" + param?._id, {
        method: "GET",
    })

export const useGetCloudQuoteKey = "get-cloud-note"

export const useGetCloudQuote = (param : Param) => {
    const queryClient = useQueryClient()
    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: [useGetCloudQuoteKey]
        })
    }
    const data = useQuery({
        queryFn: () => getCloudQuote(param),
        queryKey: [useGetCloudQuoteKey],
    })
    return { ...data, invalidateQueries }
}
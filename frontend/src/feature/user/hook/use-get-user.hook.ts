import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

export type Param = {
        _id?: string;
}

export type User = {
    _id?: string;
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
}


const getUser = (data: Param) =>
    apiClient<User>("/api/v1/users/" + data._id, {
        method: "GET",
    })

export const useGetUserKey = "get-user"

export const useGetUser = (param: Param) => {
    const data = useQuery({
        queryFn:()=> getUser(param),
        queryKey: [useGetUserKey],
        enabled: Boolean(param._id)
    })
    return data
}
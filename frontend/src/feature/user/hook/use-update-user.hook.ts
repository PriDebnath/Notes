import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { useGetUserKey } from "./use-get-user.hook";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UserParam = { _id: string; name: string };

const updateUser = (data: UserParam) =>
  apiClient<{ token: string }>("/api/v1/users/" + data?._id, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: UserParam) => {
      const promise = updateUser(data);
      toast.promise(promise, {
        ...toastConfig,
        loading: "Updating...",
        success: "Update successful",
        error: (err: any) => err?.message || "Something went wrong",
      });
      const res = await promise;
      return res
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [useGetUserKey,],
      })
    },
    onError: (error) => {
      // toast.error(error?.message ? error?.message : error?.stack, {
      // position: toastConfig.position
      // })
    }
  });

  return {
    ...mutation,
    updateUser: mutation.mutateAsync,
  };
};
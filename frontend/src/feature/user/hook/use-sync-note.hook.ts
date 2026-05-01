import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type Param = {
  _id?: string, // cloud id
  text?: string,
  texture?: string,
  pri_set?: string,
  pinned?: boolean,
  synced?: boolean,
  user?: string,
};

const syncNote = (data: Param) =>
  apiClient<Param>("/api/v1/notes/sync", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const useSyncNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Param) => {
      const promise = syncNote(data);
      toast.promise(promise, {
        ...toastConfig,
        loading: "Syncing...",
        success: "Sync successful",
        error: (err: any) => err?.message || "Something went wrong",
      });
      const res = await promise;
      console.log({res});
      
      return res
    },
    onSuccess: (data) => {
      console.log({data});
      
      return data
      // queryClient.invalidateQueries({
      //   // queryKey: [useGetUserKey,],
      // })
    },
    onError: (error) => {
      // toast.error(error?.message ? error?.message : error?.stack, {
      // position: toastConfig.position
      // })
    }
  });

  return {
    ...mutation,
    syncNote: mutation.mutateAsync,
  };
};
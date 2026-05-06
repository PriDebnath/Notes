import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCloudQuoteKey } from "./use-get-cloud-quote.hook";

export type Param = {
  _id?: string, // cloud id
  id?: number, // local id
  text?: string,
  texture?: string,
  pri_set?: string,
  pinned?: boolean,
  synced?: boolean,
  shared?: boolean,
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
      return res
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [useGetCloudQuoteKey,],
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
    syncNote: mutation.mutateAsync,
  };
};
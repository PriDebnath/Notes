import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCloudQuoteKey } from "./use-get-cloud-quote.hook";
import { useGetAllCloudQuoteKey } from "./use-get-all-cloud-quote.hook";

export type Param = { _id: string;  };

const deleteCloudQuote = (data: Param) =>
  apiClient("/api/v1/notes/" + data?._id, {
    method: "DELETE",
  });

export const useDeleteCloudQuote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Param) => {
      const promise = deleteCloudQuote(data);
      toast.promise(promise, {
        ...toastConfig,
        loading: "Deleting...",
        success: "Deleted successful",
        error: (err: any) => err?.message || "Something went wrong",
      });
      const res = await promise;
      return res
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [useGetAllCloudQuoteKey,],
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
    deleteCloudQuote: mutation.mutateAsync,
  };
};
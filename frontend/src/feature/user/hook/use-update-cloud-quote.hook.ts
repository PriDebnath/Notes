import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCloudQuoteKey } from "./use-get-cloud-quote.hook";
import type { Quote } from "@/model/index.model";

export interface Param extends Omit<Quote, 'text'> { 
  text?: string;  
};

const updateCloudQuote = (data: Param) =>
  apiClient<{ token: string }>("/api/v1/notes/" + data?._id, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const useUpdateCloudQuote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Param) => {
      const promise = updateCloudQuote(data);
      toast.promise(promise, {
        ...toastConfig,
        loading: "Updating...",
        success: "Updated successful",
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
    updateCloudQuote: mutation.mutateAsync,
  };
};
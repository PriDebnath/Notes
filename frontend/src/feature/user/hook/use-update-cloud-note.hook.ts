import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCloudNoteKey } from "./use-get-cloud-note.hook";
import type { Note } from "@/model/index.model";
import { useGetAllCloudNoteKey } from "./use-get-all-cloud-note.hook";

export interface Param extends Omit<Note, 'text'> { 
  text?: string;  
};

const updateCloudNote = (data: Param) =>
  apiClient<{ token: string }>("/api/v1/notes/" + data?._id, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const useUpdateCloudNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Param) => {
      const promise = updateCloudNote(data);
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
        queryKey: [useGetAllCloudNoteKey,],
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
    updateCloudNote: mutation.mutateAsync,
  };
};
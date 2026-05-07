import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { toastConfig } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCloudNoteKey } from "./use-get-cloud-note.hook";
import { useGetAllCloudNoteKey } from "./use-get-all-cloud-note.hook";

export type Param = { _id: string;  };

const deleteCloudNote = (data: Param) =>
  apiClient("/api/v1/notes/" + data?._id, {
    method: "DELETE",
  });

export const useDeleteCloudNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Param) => {
      const promise = deleteCloudNote(data);
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
    deleteCloudNote: mutation.mutateAsync,
  };
};
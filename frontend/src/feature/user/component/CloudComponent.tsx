import React, { Suspense, useEffect, useMemo } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useUpdateUser } from "@/feature/user/hook/use-update-user.hook"
import { toast } from "sonner"
import { toastConfig } from "@/components/ui/sonner"
import { ArrowLeftIcon, ArrowUpCircleIcon, ArrowUpRightFromCircleIcon, CloudBackupIcon, LockIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileFormSchema } from "../schema";
import { Button } from "@/components/ui/button"
import type { User } from "../hook/use-get-user.hook";
import type z from "zod";
import { ButtonLoader } from "@/components/ui/button-loader";
import { useGetAllDeletedQuoteDetails } from "@/api-hook/use-get-all-delete-quote-details.hook";
import { useGetAllQuoteDetails } from "@/api-hook/use-get-all-quote-details.hook";
import OpenCloudContainer from "./open-cloud-container";
import { useSyncNote } from "../hook/use-sync-note.hook";
import { useUpdateQuoteDetails } from "@/api-hook/use-update-quote-details.hook";

type Props = {
  user: User;
}

const CloudComponent = (props: Props) => {
  const { user } = props
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetAllQuoteDetails()
  const { updateQuote } = useUpdateQuoteDetails()
  const { syncNote, isPending } = useSyncNote()

  const unsyncedItems = useMemo(() => {
    return data?.filter((item) => !item.synced)
  }, [data])
  console.log({ unsyncedItems });
  const onSync = async () => {
    console.log({ data });

    if (data) {
      for (const item of data) {
        console.log({ item });

        const newData = await syncNote({
          ...(item._id && ({ _id: item._id })),
          pinned: item.pinned,
          synced: item.synced,
          text: item.text,
          texture: item.texture,
          pri_set: item.pri_set,
          user: user._id
        })
        console.log(
          { newData }
        );

        await updateQuote({
          _id: newData._id,
          id: item.id,
          text: item.text,
          synced: true
        })
        await refetch()
      }
    }
  }
  return (
    <div className="flex flex-col gap-1">
      <p className=" text-muted-foreground text-xs">
        Cloud
      </p>
      <div className="flex justify-between items-center text-center ">
        <p className=" text-sm">
          Sync
        </p>
        <Button variant="outline" size="sm"
          aria-label='sync-button'
          onClick={onSync}
          disabled={!unsyncedItems?.length || isPending}
          title='sync-button'>
          <CloudBackupIcon />
          {isPending ? "Syncing" : "Sync"}
          {" "}
          {unsyncedItems?.length}
          {" "}
          item{(unsyncedItems?.length! > 1) ? "s" : ""}
          {" "}
          now
        </Button>
      </div>
      <div className="flex justify-between items-center text-sm ">
        Cloud Container
        <Suspense fallback={<ButtonLoader />}>
          <OpenCloudContainer />
        </Suspense>
      </div>
    </div>

  )
}

export default React.memo(CloudComponent)
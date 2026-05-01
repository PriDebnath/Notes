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

      const unsyncedItems = useMemo(()=>{
        return data?.filter((item)=>!item.synced)
      },[data])

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
                      disabled={!unsyncedItems?.length}
                      title='sync-button'>
                      <CloudBackupIcon />
                        Sync {unsyncedItems?.length} item{( unsyncedItems?.length! > 1) ? "s" : ""} now
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
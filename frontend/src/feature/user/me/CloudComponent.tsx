import React, { Suspense, useEffect } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useUpdateUser } from "@/feature/user/hook/use-update-user.hook"
import { toast } from "sonner"
import { toastConfig } from "@/components/ui/sonner"
import { ArrowLeftIcon, ArrowUpCircleIcon, ArrowUpRightFromCircleIcon, CloudBackupIcon, LockIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileFormSchema } from "./schema";
import { Button } from "@/components/ui/button"
import type { User } from "../hook/use-get-user.hook";
import type z from "zod";
import { ButtonLoader } from "@/components/ui/button-loader";

type Props = {
    user: User;
}

const CloudComponent = (props: Props) => {
    const { user } = props
    
    return (
           <div className="flex flex-col gap-1">
                  <p className=" text-muted-foreground text-xs">
                    Cloud
                  </p>
                  <div className="flex justify-between items-center text-center ">
                    <p className=" text-sm">
                      Sync
                    </p>
                    <Button variant="outline" size="icon"
                    disabled
                      aria-label='sync-button'
                      title='sync-button'>
                      <CloudBackupIcon />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center text-sm ">
                    Cloud Container
                    <Suspense fallback={<ButtonLoader />}>
                      {/* <RecycleBinDialog /> */}
                    </Suspense>
                  </div>
                </div>

    )
}

export default React.memo(CloudComponent)
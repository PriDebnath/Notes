import React, { useEffect } from "react";
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

type Props = {
    user: User;
    onLogout: () => void
}

const ProfileComponent = (props: Props) => {
    const { user, onLogout } = props
    const { updateUser } = useUpdateUser()

    const { control, reset, formState: { isDirty }, handleSubmit, getValues } = useForm({
        defaultValues: {
            name: '',
            email: ''
        },
        resolver: zodResolver(profileFormSchema)
    })

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        if (!user?._id) {
            toast.warning("No user found", toastConfig)
            return
        }
        await updateUser({
            _id: user?._id,
            name: values.name
        })
    }

    useEffect(() => {
        reset({
            name: user?.name || "",
            email: user?.email || "",
        })
    }, [user])
    
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-xs py-2">
                    Profile
                </p>

                <div>
                    <Button
                        variant="link"
                        size={'sm'}
                        className="text-xs px-2 py-0"
                        aria-label='logout-button'
                        title='logout-button'
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                    {
                        (isDirty) && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    onSubmit(getValues())
                                }
                                } size={'sm'}
                                className="text-xs px-2 py-0"
                                aria-label='save-profile-button'
                                title='save-profile-button'>
                                Save changes
                            </Button>
                        )
                    }
                </div>

            </div>

            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4">

                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="gap-1">
                            <FieldLabel htmlFor={field.name} className="capitalize text-sm">
                                {field.name}
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder={"Enter " + field.name + " here..."}
                                autoComplete="on"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    disabled={true}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="gap-1">
                            <FieldLabel htmlFor={field.name} className="capitalize text-sm">
                                {field.name}
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder={"Enter " + field.name + " here..."}
                                autoComplete="on"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

            </form>
        </div>
    )
}

export default React.memo(ProfileComponent)
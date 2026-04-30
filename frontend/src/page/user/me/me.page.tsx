import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, ArrowUpCircleIcon, ArrowUpRightFromCircleIcon, CloudBackupIcon, LockIcon } from "lucide-react"
import { Link, useNavigate } from "@tanstack/react-router"
import React, { Suspense, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z, } from "zod"
import { useJwt } from "react-jwt";
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/feature/auth/store/auth.store"
import { useGetUser, type User } from "@/feature/user/hook/use-get-user.hook"
import { cn } from "@/lib/utils"
import { ButtonLoader } from "@/components/ui/button-loader"
import RecycleBinDialog from "@/feature/quote/dialog/recycle-bin.dialog"
import NavigationComponent from "@/feature/user/component/navigation"
import { useUpdateUser } from "@/feature/user/hook/use-update-user.hook"
import { toast } from "sonner"
import { toastConfig } from "@/components/ui/sonner"

const profileFormSchema = z.object({
  name: z.string().min(1, "name should not be empty"),
  email: z.email().min(1, "email should not be empty"),
})

const Me = () => {

  const navigate = useNavigate()
  const { token, setToken } = useAuthStore()
  const { decodedToken, isExpired } = useJwt<User>(token);

  const { data: user, isPending, invalidateQueries } = useGetUser({ _id: decodedToken?._id })
  const { updateUser } = useUpdateUser()

  const { control, reset, formState: { isDirty }, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: '',
      email: ''
    },
    resolver: zodResolver(profileFormSchema)
  })


  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    console.log({ values });

    if (!user?._id) {
      toast.warning("No user found", toastConfig)
      return
    }
    await updateUser({
      _id: user?._id,
      name: values.name
    })
  }

  const onLogout = () => {
    setToken('')
    invalidateQueries()
    navigate({
      to: '/auth/sign-in'
    })
  }

  useEffect(() => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
    })
  }, [user])

  return (
    <div
      className='w-full h-dvh flex justify-self-center md:w-3/4 overflow-hidden'>
      <AnimatePresence mode="wait">
        <motion.div
          key={"me"}
          initial={{ x: 120, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full "
        >
          <div className='flex p-4 bg-background flex-row sticky top-0 z-10  justify-between items-center'>
            <NavigationComponent />
          </div>
          {/* <Separator className="bg-border" /> */}


          {
            user ? (
              <div className="p-4 flex flex-col gap-4">
                <Separator className="bg-border" />
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


                <Separator className="bg-border" />

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
                      <RecycleBinDialog />
                    </Suspense>
                  </div>
                </div>


              </div>
            ) : (
              <div className="p-4 flex flex-col gap-4">
                <div className="bg-muted-foreground rounded h-20 flex items-center justify-center">
                  <LockIcon />
                </div>
                <Separator className="bg-border" />

                <div className="flex items-center justify-center">
                  <Link to="/auth/sign-in"
                    aria-label="link-to-home-link"
                    className='flex items-center gap-2'
                  >
                    <Button
                      aria-label='go-to-log-button'
                      title='go-to-login-button'>
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            )
          }


        </motion.div>
      </AnimatePresence>
    </div>
  )
}
export default React.memo(Me)

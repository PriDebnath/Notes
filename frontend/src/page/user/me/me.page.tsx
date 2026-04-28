import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, ArrowUpCircleIcon, ArrowUpRightFromCircleIcon, CloudBackupIcon, LockIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z, } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {  useAuthStore } from "@/feature/auth/store/auth.store"

const profileFormSchema = z.object({
  name: z.string().min(1, "name should not be empty"),
  email: z.email().min(1, "email should not be empty"),
})

const Me = () => {

  const { token} = useAuthStore()
  const reactForm = useForm({
    resolver: zodResolver(profileFormSchema)
  })

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {

  }

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
            <Link to="/"
              aria-label="link-to-home-link"
              className='flex items-center gap-2'
            >
              <Button variant="outline" size="icon"
                aria-label='go-to-home-button'
                title='go-to-home-button'>
                <ArrowLeftIcon />
              </Button>
            </Link>
          </div>
                      <Separator className="bg-border" />


{
  token ? (
   <div className="p-4 flex flex-col gap-4">

            <Separator className="bg-border" />
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                 <p className="text-muted-foreground text-xs">
                Profile
              </p>
              {
                reactForm?.formState?.isDirty && (
                    <Button variant="outline" size="icon"
                aria-label='save-profile-button'
                title='save-profile-button'>
                Save changes
              </Button>
                )
              }
              </div>
             
              <form onSubmit={reactForm.handleSubmit(onSubmit)}
               className="flex flex-col gap-4">

                <Controller
                  name="name"
                  control={reactForm.control}
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
                  control={reactForm.control}
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
                Sync
              </p>
              <div className="flex justify-between items-center text-center ">
                <p className=" text-sm">
                  Last synced: {'today'}
                </p>
                 <Button variant="outline" size="icon"
                aria-label='sync-button'
                title='sync-button'>
                <CloudBackupIcon />
              </Button>
              </div>

            </div>
          </div>
  ) : (
 <div className="p-4 flex flex-col gap-4">
  <div className="bg-muted-foreground rounded h-20 flex items-center justify-center">
<LockIcon/>
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

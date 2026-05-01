import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, ArrowUpCircleIcon, ArrowUpRightFromCircleIcon, CloudBackupIcon, LockIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import React, { Suspense, useEffect } from "react"
import { z, } from "zod"
import { useJwt } from "react-jwt";

import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/feature/auth/store/auth.store"
import { useGetUser, type User } from "@/feature/user/hook/use-get-user.hook"
import { cn } from "@/lib/utils"
import { ButtonLoader } from "@/components/ui/button-loader"
import RecycleBinDialog from "@/feature/quote/dialog/recycle-bin.dialog"
import NavigationComponent from "@/feature/user/component/navigation"
import ProfileComponent from "@/feature/user/component/ProfileComponent"
import CloudComponent from "@/feature/user/component/CloudComponent"




const Me = () => {
  const navigate = useNavigate()
  const { token, setToken } = useAuthStore()
  const { decodedToken, isExpired } = useJwt<User>(token);
  const { data: user, isPending, invalidateQueries } = useGetUser({ _id: decodedToken?._id })

  const onLogout = () => {
    setToken('')
    invalidateQueries()
    navigate({
      to: '/auth/sign-in'
    })
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
            <NavigationComponent />
          </div>
          {/* <Separator className="bg-border" /> */}
          {
            user ? (
              <div className="p-4 flex flex-col gap-4">
                <Separator className="bg-border" />
                <ProfileComponent user={user} onLogout={onLogout} />

                <Separator className="bg-border" />
                <CloudComponent user={user} />
                <Separator className="bg-border" />
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

import  { Button } from "@/components/ui/button"
import  { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import React from "react"


const Me = ()=>{

    // const reactForm = useForm

    return (
    <div className="overflow-hidden">
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

            <div>
                <p className="text-m">
                    Profile
                </p>
            </div>
            </motion.div>
            </AnimatePresence>
    </div>
    )
}
export default React.memo(Me)

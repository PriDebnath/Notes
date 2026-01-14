import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetQuoteDetails } from '@/hook/get-quote-details.hook'
import Tiptap from '@/components/common/tiptap-customized'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export const Route = createFileRoute('/$quoteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { quoteId } = Route.useParams()

  const { data: quote, isLoading, error } = useGetQuoteDetails(Number(quoteId))

  return (<div className='w-full overflow-hidden'>
    <AnimatePresence mode="wait">
      <motion.div
        key={quoteId}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full p-4"
      >
        <div className='flex flex-row  justify-between'>
          <Link to="/" className='flex items-center gap-2 mb-4'>
            <Button variant="outline" size="icon">
              <ArrowLeftIcon />
            </Button>
          </Link>


          <Button type="submit" onClick={() => { }}>
            {/* {mode == "add" ? "Add Quote" : "Update Quote"} */}
            Save
          </Button>
        </div>

        <Tiptap value={quote?.text} onValueUpdate={() => { }} />
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
      </motion.div>
    </AnimatePresence>
  </div>
  )
}

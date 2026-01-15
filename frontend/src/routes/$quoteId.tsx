import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetQuoteDetails } from '@/hook/get-quote-details.hook'
import Tiptap from '@/components/common/tiptap-customized'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import TagField from "@/feature/quote/form-field/tag"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
export const Route = createFileRoute('/$quoteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { quoteId } = Route.useParams()

  const { data: quote, isLoading, error } = useGetQuoteDetails(Number(quoteId))

const onTagChoose = (tag: string) => {
}

const onValueUpdate = (text: string) => {
}

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

        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Quote</Label>
              <Tiptap value={quote?.text} onValueUpdate={onValueUpdate} />
            </div>
          </div>
                   <Separator className="my-0  bg-primary/10" />
          
          <TagField onChoose={onTagChoose} />
          <div className="flex flex-wrap gap-2">
            {
              quote?.tags && quote?.tags.length > 0 && (
                quote?.tags.map((tag) => {
                  return (
                    <Badge
                      variant={'outline'}
                      className=" bg-primary/10 border-primary/30 text-primary/90"
                      key={tag.id}
                    >
                      #{tag.name}
                    </Badge>
                  )
                }
                )
              )
            }
          </div>
          
          <Separator className="my-0 bg-primary/10" />
          
        
      </motion.div>
    </AnimatePresence>
  </div>
  )
}

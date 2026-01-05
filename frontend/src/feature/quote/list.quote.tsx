import { PenIcon, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Quote } from "@/model/quote.model"

interface Props {
  loading: boolean
  quotes: Quote[];
  onEdit:(quote: Quote) => void
  onDelete:(quote: Quote) => void
}

export function ListQuote(props: Props) {
  let { loading, quotes, onEdit, onDelete } = props

  return (
    <div>
      {
        loading && <p>Loading quotes...</p>
      }
      {
        ( !loading &&quotes?.length <= 0 ) &&  (
           <p className="text-center text-gray-500">No quotes available.</p>
        )
      }
      {
        (quotes && quotes?.length > 0) && (
          <div className="flex flex-col gap-4">
            {quotes.map((q) => {
              return (
                <div key={q.id + q.text.slice(0, 5)} 
                className=" px-4 py-2 flex items-center justify-between border border-grey-200">
                  <p>{q.text}</p>
                  <Button onClick={()=>onEdit(q)}>
                    <PenIcon/>
                  </Button>
                   <Button onClick={()=>onDelete(q)}>
                    <Trash/>
                  </Button>
                </div>
              )
            })}
          </div>
        )
      }
    </div>
  )
}
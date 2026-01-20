import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import type { Quote } from "@/model/index.model"
import QuoteCard from "@/feature/quote/card/quote.card"
import QuoteSkeleton from "@/feature/quote/card/quote-skeleton.card"
import { useCardViewStore } from "@/store/use-card-view.store"

interface Props {
  loading: boolean
  quotes: Quote[]
  onEdit: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

export function ListQuote(props: Props) {
  const { loading, quotes, onEdit, onDelete } = props

  const { view } = useCardViewStore()

  // when list, use 1 column; otherwise responsive columns
  const breakpointCols: number | { [key: number]: number; default: number } =
    view === "list"
      ? 1
      : { default: 4, 1024: 3, 768: 2, 480: 2, 240: 1 }
  const columnClassName = "flex flex-col gap-2"

  if (loading) {
    return (
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-2"
        columnClassName={columnClassName}
      >
        {Array.from({ length: 3}).map((_, i) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <QuoteSkeleton />
            </motion.div>
          )
        })}
      </Masonry>
    )
  }

  if ((!quotes || quotes.length === 0) && !loading) {
    return <p className="w-full text-center text-muted-foreground">No quotes available.</p>
  }

  return (
    <div>
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-2"
        columnClassName={columnClassName}
      >
        {quotes.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
          >
            <QuoteCard
              quote={q}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </Masonry>

      <p className="text-center text-muted-foreground  py-16">
        --- end of everything ---
      </p>
    </div>
  )
}

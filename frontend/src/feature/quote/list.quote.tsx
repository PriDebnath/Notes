import { motion, AnimatePresence } from "framer-motion"
import type { Quote } from "@/model/quote.model"
import QuoteCard from "@/feature/quote/card/quote.card"

interface Props {
  loading: boolean
  quotes: Quote[]
  onEdit: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

export function ListQuote(props: Props) {
  const { loading, quotes, onEdit, onDelete } = props

  if (loading) return <p>Loading quotes...</p>
  if (!quotes || quotes.length === 0) return <p>No quotes available.</p>

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {quotes.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
          >
            <QuoteCard
              quote={q}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <p className="text-center p-4 text-gray-400">
        --- end of quotes ---
      </p>
    </div>
  )
}

import { PenIcon, Copy } from "lucide-react"
import type { Quote } from "@/model/quote.model"
import QuoteCard from "@/feature/quote/card/quote.card";

interface Props {
  loading: boolean
  quotes: Quote[];
  onEdit: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

export function ListQuote(props: Props) {
  const { loading, quotes, onEdit, onDelete } = props

  if (loading) {
    return <p className="loading-text">Loading quotes...</p>
  }

  if (!quotes || quotes.length === 0) {
    return <p className="empty-text">No quotes available.</p>
  }

  return (
    <div className="quotes-list">
      {quotes.map((q) => {
        return (
          <div key={q.id}>
            <QuoteCard quote={q} onEdit={onEdit} onDelete={onDelete} />
          </div>
        )
      })}
    </div>
  )
}
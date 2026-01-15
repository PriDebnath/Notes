import { useCallback, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { PlusIcon, Lightbulb, LightbulbOff, SearchIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import { ListQuote } from '@/feature/quote/list.quote'
import AddEditQuoteDialog from '@/feature/quote/dialog/add-edit.quote.dialog'
import DeleteQuoteDialog from '@/feature/quote/dialog/delete.quote.dialog'

import type { Quote, QuoteFormData, Tag } from '@/model/quote.model'

import { addOrGetTag } from '@/db/tag.db'
import { addQuote, updateQuote, deleteQuote } from '@/db/quote.db'
import {
  addQuoteTag,
  deleteAllQuoteTags,
  getAllQuotesDetails,
} from '@/db/quote_tags.db'
import { useDarkOrLightTheme } from '@/hook/use-dark-or-light-theme.hook'

export function QuoteListPage() {
  const { darkMode, toggleDarkMode } = useDarkOrLightTheme()
  
  /* ------------------ data ------------------ */

  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [mode, setMode] = useState<'add' | 'edit'>('add')

  const [openAddEdit, setOpenAddEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  /* ------------------ helpers ------------------ */

  const fetchQuotes = useCallback(async () => {
    setLoading(true)
    const data = await getAllQuotesDetails()
    setQuotes(data)
    setAllQuotes(data)
    setLoading(false)
  }, [])

  const resolveTags = async (tags: string[]): Promise<Tag[]> =>
    Promise.all(tags.map(name => addOrGetTag({ name })))

  /* ------------------ handlers ------------------ */

  const openAddDialog = () => {
    setMode('add')
    setSelectedQuote(null)
    setOpenAddEdit(true)
  }

  const openEditDialog = (quote: Quote) => {
    setMode('edit')
    setSelectedQuote(quote)
    setOpenAddEdit(true)
  }

  const openDeleteDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setOpenDelete(true)
  }

  const handleSubmit = async (data: QuoteFormData) => {
    const text = data.text || 'Empty'

    const savedQuote = data.id
      ? await updateQuote({ ...data, text })
      : await addQuote({ ...data, text })

    const quoteId = savedQuote.id!
    const tags = await resolveTags(data.tags ?? [])

    await deleteAllQuoteTags(quoteId)
    await Promise.all(
      tags.map(tag =>
        addQuoteTag({ quoteId, tagId: tag.id! })
      )
    )

    setOpenAddEdit(false)
    setSelectedQuote(null)
    fetchQuotes()
  }

  const handleDelete = async (quote: QuoteFormData) => {
    if (!quote.id) return
    await deleteQuote(quote.id)
    setOpenDelete(false)
    setSelectedQuote(null)
    fetchQuotes()
  }

  const handleSearch = (value: string) => {
    const term = value.trim().toLowerCase()
    if (!term) return setQuotes(allQuotes)

    setQuotes(
      allQuotes.filter(q =>
        q.text.toLowerCase().includes(term)
      )
    )
  }

  /* ------------------ init ------------------ */

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  /* ------------------ UI ------------------ */

  return (
        <div  className="p-2 gap-2 flex flex-col">
       {/* Sticky Header */}
        <motion.div
            key={"search"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="gap-2 flex flex-col sticky top-0 z-20 bg-background rounded-b-2xl "
           >
      
        <div className="text-right">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={toggleDarkMode}
          >
            {darkMode ? <LightbulbOff /> : <Lightbulb />}
          </Button>
        </div>

        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            onChange={e => handleSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </motion.div>

      {/* Content */}
      <main className="">
        <ListQuote
          loading={loading}
          quotes={quotes}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      </main>

      {/* Floating Add Button */}
      <nav className="flex justify-center">
        <Link to="/new">
          <Button
            size="icon-lg"
            className="fixed bottom-8 rounded-full aspect-square scale-150"
            onClick={openAddDialog}
          >
            <PlusIcon />
          </Button>
        </Link>
      </nav>

      {/* Dialogs */}
      <AddEditQuoteDialog
        mode={mode}
        quote={selectedQuote}
        open={openAddEdit}
        setOpen={setOpenAddEdit}
        handleSubmit={handleSubmit}
      />

      <DeleteQuoteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        quote={selectedQuote}
        handleDelete={handleDelete}
      />
    </div>
  )
}

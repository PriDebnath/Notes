import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  PlusIcon,
  Lightbulb,
  LightbulbOff,
  SearchIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import { ListQuote } from '@/feature/quote/list.quote'
import DeleteQuoteDialog from '@/feature/quote/dialog/delete.dialog'
import {SettingComponent} from '@/feature/quote/dialog/setting.dialog'

import type { Quote, QuoteFormData, Tag } from '@/model/index.model'

import { addOrGetTag } from '@/db/tag.db'
import { addQuote, updateQuote, deleteQuote } from '@/db/quote.db'
import {
  addQuoteTag,
  deleteAllQuoteTags,
} from '@/db/quote_tags.db'

import { useGetAllQuoteDetails } from '@/hook/use-get-all-quote-details.hook'
import {TagFilter} from '../../feature/quote/popover/filter.popover'

export function QuoteListPage() {
  
  /* ------------------ data ------------------ */

  const {
    data: quotesStored,
    isLoading,
    error,
    refetch,
  } = useGetAllQuoteDetails()
 const allTags =  [...new Set(quotesStored?.flatMap(q =>
            q.tags?.map(t => t.name) ?? []
          ))]

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [openDelete, setOpenDelete] = useState(false)

  /* ------------------ sync db → local ------------------ */

  useEffect(() => {
    setQuotes(quotesStored ?? [])
  }, [quotesStored])

  /* ------------------ search + tag filter ------------------ */

  useEffect(() => {
    if (!quotesStored) return

    let result = quotesStored

    // 🔍 search
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter(q =>
        q.text.toLowerCase().includes(term)
      )
    }

    // 🏷 tags
    if (activeTags.length > 0) {
      result = result.filter(q =>
        q.tags?.some(tag => activeTags.includes(tag.name))
      )
    }

    setQuotes(result)
  }, [quotesStored, search, activeTags])

  /* ------------------ handlers ------------------ */

  const openDeleteDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setOpenDelete(true)
  }

  const handleDelete = async (quote: QuoteFormData) => {
    if (!quote.id) return
    await deleteQuote(quote.id)
    setOpenDelete(false)
    refetch()
  }

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  /* ------------------ error ------------------ */

  if (error) {
    return (
      <p className="w-full text-center text-destructive">
        Error: {error}
      </p>
    )
  }

  /* ------------------ ui ------------------ */

  return (
    <div className=" flex flex-col">
      {/* Sticky Header */}
      <div
          className="gap-2 p-2 flex flex-col sticky top-0 z-20 bg-background rounded-b"
      >
        <div className="flex justify-between">
          <TagFilter
            tags={allTags}
            value={activeTags}
            onChange={setActiveTags}
          />
          <SettingComponent/>
        </div>
        {/* Search */}
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      
      </div>

      {/* Content */}
      <main className="px-2">
        <ListQuote
          loading={isLoading}
          quotes={quotes}
          onEdit={() => {}}
          onDelete={openDeleteDialog}
        />
      </main>

      {/* Floating Add Button */}
      <nav className="flex justify-center">
        <Link to="/new">
          <Button
            size="icon-lg"
            className="fixed bottom-8 rounded-full aspect-square scale-150"
          >
            <PlusIcon />
          </Button>
        </Link>
      </nav>

      {/* Delete Dialog */}
      <DeleteQuoteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        quote={selectedQuote}
        handleDelete={handleDelete}
      />
    </div>
  )
}

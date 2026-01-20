
import {
  PlusIcon,
  Lightbulb,
  LightbulbOff,
  SearchIcon,
} from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ListQuote } from '@/feature/quote/list.quote'
import { deleteQuoteWithLinks } from '@/db/quote_tags.db'
import { TagFilter } from '@/feature/quote/popover/filter.popover'
import type { Quote, QuoteFormData, Tag, SortOption } from '@/model/index.model'
import DeleteQuoteDialog from '@/feature/quote/dialog/delete.dialog'
import { SettingComponent } from '@/feature/quote/dialog/setting.dialog'
import { useGetAllQuoteDetails } from '@/api-hook/use-get-all-quote-details.hook'
import { useSortStore } from '@/store/use-sort.store'

export function QuoteListPage() {
  const {
    data: quotesStored,
    isLoading,
    error,
    refetch,
  } = useGetAllQuoteDetails()

  const [search, setSearch] = useState('')
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [openDelete, setOpenDelete] = useState(false)
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const { sortBy } = useSortStore()
  const allTags = [
    ...new Set(quotesStored?.flatMap(q => q.tags?.map(t => t.name) ?? []
    ))]

  useEffect(() => {
    setQuotes(quotesStored ?? [])
  }, [quotesStored])

  useEffect(() => {
    if (!quotesStored) return
    let result = [...quotesStored]
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

    // ↕️ sort
    const compareByDate = (a?: Date | string, b?: Date | string) => {
      const ta = a ? new Date(a).getTime() : 0
      const tb = b ? new Date(b).getTime() : 0
      return tb - ta
    }

    const compareByTags = (aTags?: Tag[], bTags?: Tag[]) => {
      const aName = aTags && aTags.length > 0 ? aTags[0].name.toLowerCase() : ''
      const bName = bTags && bTags.length > 0 ? bTags[0].name.toLowerCase() : ''
      if (aName < bName) return -1
      if (aName > bName) return 1
      return 0
    }

    result.sort((a, b) => {
      if (sortBy === 'created_at') {
        return compareByDate(a.created_at as any, b.created_at as any)
      }
      if (sortBy === 'updated_at') {
        return compareByDate(a.updated_at as any, b.updated_at as any)
      }
      if (sortBy === 'tags') {
        return compareByTags(a.tags as any, b.tags as any)
      }
      return 0
    })

    setQuotes(result)
  }, [quotesStored, search, activeTags, sortBy])


  const openDeleteDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setOpenDelete(true)
  }

  const handleDelete = async (quote: QuoteFormData) => {
    if (!quote.id) return
    await deleteQuoteWithLinks(quote.id)
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


  if (error) {
    return (
      <p className="w-full text-center text-destructive">
        Error: {error}
      </p>
    )
  }

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
          <SettingComponent />
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
          onEdit={() => { }}
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

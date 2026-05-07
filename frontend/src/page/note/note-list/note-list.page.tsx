
import {
  PlusIcon,
  Lightbulb,
  LightbulbOff,
  SearchIcon,
  Loader2,
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
import { Suspense, lazy } from 'react'
import { deleteNoteWithLinks } from '@/db/note_tags.db'
import type { Note, NoteDetails, NoteFormData, Tag, SortOption } from '@/model/index.model'
import { useGetAllNoteDetails } from '@/feature/note-list/hook/use-get-all-note-details.hook'
import { useSortStore } from '@/store/use-sort.store'
import { toggleNotePinned, updateNote } from '@/db/note.db'
import React from 'react'
import { ButtonLoader } from '@/components/ui/button-loader'
import { Loader } from '@/components/ui/loader'
import { useUpdateNoteDetails } from '@/feature/note-list/hook/use-update-note-details.hook'

const DeleteNoteDialog = lazy(() => import('@/feature/note-list/component/DeleteNoteDialog'))
const NoteListComponent = lazy(() => import('@/feature/note-list/component/NoteListComponent').then(mod => ({ default: mod.default })))
const SettingComponent = lazy(() => import('@/feature/note-list/component/SettingComponent/SettingComponent').then(mod => ({ default: mod.default })))
const TagFilterComponent = lazy(() => import('@/feature/note-list/component/TagFilterComponent').then(mod => ({ default: mod.default })))

export function NoteListPage() {
  const {
    data: notesStored,
    isLoading,
    error,
    refetch,
  } = useGetAllNoteDetails()

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<NoteDetails[]>([])
  const [openDelete, setOpenDelete] = useState(false)
  const { updateNote } = useUpdateNoteDetails()
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const allTags = [
    ...new Set(notesStored?.flatMap(q => q.tags?.map(t => t.name) ?? []
    ))]

  useEffect(() => {
    if (!notesStored) return
    let result = [...notesStored]
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

    setNotes(result)
  }, [notesStored, search, activeTags])


  const openDeleteDialog = (note: Note) => {
    setSelectedNote(note)
    setOpenDelete(true)
  }

  const handleDelete = async (note: NoteFormData) => {
    if (!note.id) return
    // await deleteNoteWithLinks(note.id) // no hard delete
    // sort delete
    await updateNote({
      ...note,
      text: note.text || "Empty",
      deleted: true,
      synced: false,
    })
    setOpenDelete(false)
    refetch()
  }

  const handleTogglePin = async (note: NoteDetails) => {
    if (!note.id) return
    await toggleNotePinned(note.id, !note.pinned)
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
      <p
        aria-label='error'
        className="w-full text-center text-destructive">
        Error: {error}
      </p>
    )
  }

  return (
    <div className=" flex flex-col">
      {/* Sticky Header */}
      <div
        aria-label='sticky-header'
        className="gap-2 p-2 flex flex-col sticky top-0 z-20 bg-background rounded-b"
      >
        <aside className="flex justify-between">
          <Suspense fallback={<ButtonLoader />}>
            <TagFilterComponent
              tags={allTags}
              value={activeTags}
              onChange={setActiveTags}
            />
          </Suspense>
          <Suspense fallback={<ButtonLoader />}>
            <SettingComponent />
          </Suspense>
        </aside>
        {/* Search */}
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            aria-label='search-note'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon aria-label='search-icon' />
          </InputGroupAddon>
        </InputGroup>

      </div>

      {/* Content */}
      <main className="px-2">
        <Suspense fallback={
          <div className='flex items-center justify-center' aria-label='loading-list'>
            <Loader />
          </div>
        }>
          <div aria-label='list'>
            <NoteListComponent
              loading={isLoading}
              notes={notes}
              onEdit={() => { }}
              onDelete={openDeleteDialog}
              onTogglePin={handleTogglePin}
            />
          </div>
        </Suspense>
      </main>

      {/* Floating Add Button */}
      <nav className="flex justify-center">
        <Link to="/new" title='new' aria-label="add-new-note-link" >
          <Button
            size="icon-lg"
            aria-label='add-note-button'
            title='add-note'
            className="fixed bottom-8  -translate-x-8 rounded-full aspect-square scale-150"
          >
            <PlusIcon />
          </Button>
        </Link>
      </nav>

      {/* Delete Dialog */}
      <Suspense fallback={null}>
        <DeleteNoteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          note={selectedNote}
          handleDelete={handleDelete}
        />
      </Suspense>
    </div>
  )
}

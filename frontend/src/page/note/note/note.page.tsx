import { toast } from "sonner"
import { lazy, Suspense } from 'react'
import { Route } from '@/routes/$noteId'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { useBlocker } from "@tanstack/react-router"
import TagField from "@/feature/note/component/TagFieldComponent"
import { Separator } from '@/components/ui/separator'
import { AnimatePresence, motion } from 'framer-motion'
import { addOrGetTag } from '@/legacy-indexDB-db/tag.db'
import { ArrowLeftIcon, Save, Shirt } from 'lucide-react'
import { useGetSummarize } from '@/feature/note/hook/ai-content-summarize.hook'
import { useGetQuoteDetails } from '@/feature/note/hook/use-get-note-details.hook'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import type { Note, QuoteDetails, QuoteFormData, Tag } from "@/model/index.model"
import { addTagToQuote, deleteQuoteTagLinks, deleteQuoteWithLinks } from '@/db/note_tags.db'
import { useState, useEffect, useRef, useCallback, type Dispatch, type SetStateAction } from "react"
import { ButtonLoader } from "@/components/ui/button-loader"
import EditorSkeleton from "@/feature/note/component/EditorSkeletonComponent"
import {  useCreateQuoteDetails } from "@/feature/note/hook/use-create-note-details.hook"
import {   useUpdateQuoteDetails  } from "@/feature/note-list/hook/use-update-note-details.hook"

const Tiptap = lazy(() => import('@/components/common/tiptap-customized'))
const ShareBackgroundComponent = lazy(
  () => import('@/feature/note/component/ShareBackgroundComponent/ShareBackgroundComponent')
    .then(mod => ({ default: mod.default }))
)
const ChooseBackgroundComponent = lazy(
  () => import('@/feature/note/component/ChooseBackgroundComponent')
    .then(mod => ({ default: mod.default }))
)
const ChatSheetComponent = lazy(
  () => import('@/feature/note/component/ChatSheetComponent/ChatSheetComponent')
    .then(mod => ({ default: mod.default }))
)


interface Props {
  mode: "add" | "edit";
}

export function QuotePage(props: Props) {
  const { mode } = props
  const navigate = useNavigate()
  const noteRef = useRef<HTMLDivElement>(null)

  // Only read params in edit mode
  const params = mode === 'edit' ? Route.useParams() : null
  const quoteId = params?.noteId

  // Only fetch in edit mode
  const {
    data: note,
    isLoading,
    error,
  } = useGetQuoteDetails(
    mode === 'edit' ? Number(quoteId) : undefined
  )
  const { updateQuote } = useUpdateQuoteDetails()
  const { createQuote } = useCreateQuoteDetails()

  const [quoteData, setQuoteData] = useState<QuoteFormData>(() => ({
    id: note?.id,
    text: note?.text || "",
    tags: note?.tags?.map((tag) => tag.name) || [],
    texture: note?.texture,
    pri_set: note?.pri_set,
  }))

  const onTagChoose = (tag: string) => {
    setQuoteData(prev => {
      const currentTags = prev?.tags || []
      const updatedTags = [...currentTags, tag]
      const uniqueTags = [...new Set(updatedTags)]
      return {
        ...prev,
        tags: uniqueTags
      }
    })
  }

  const onTagRemove = (tag: string) => {
    setQuoteData(prev => {
      const currentTags = prev?.tags || []
      const updatedTags = currentTags.filter((t) => tag != t)
      const uniqueTags = [...new Set(updatedTags)]
      return {
        ...prev,
        tags: uniqueTags
      }
    })
  }

  const onValueUpdate = (key: keyof QuoteFormData, value: string) => {
    setQuoteData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getTags = async (tags: string[]): Promise<Tag[]> => {
    const result: Tag[] = [];
    for (const tag of tags) {
      const savedTag = await addOrGetTag({ name: tag });
      result.push(savedTag);
    }
    return result;
  };

  const handleSubmit = useCallback(async (note: QuoteFormData) => {
    let quoteId: number | undefined = note.id
    if (quoteId) { // edit
      await updateQuote({
        ...note,
        text: note.text || "Empty",
        synced: false
      })
    } else {
      const newQuote = await createQuote({
        ...note,
        text: note.text || "Empty",
        synced: false
      })
      quoteId = newQuote.id
    }

    // console.log({ quoteId });

    const tags = await getTags(note.tags!)
    // console.log({ tags })

    // Delete all existing tags for this note
    await deleteQuoteTagLinks(quoteId!)

    // Add new tags for this note
    for (const tag of tags) {
      await addTagToQuote(quoteId!, tag.name!)
    }
    navigate({
      to: '/'
    })
  }, [navigate])

  useEffect(() => {
    if (note) {
      setQuoteData({
        id: note.id,
        text: note.text,
        tags: note.tags?.map(t => t.name) || [],
        texture: note.texture,
        pri_set: note.pri_set,
      })
    }
  }, [note, mode])

  const blocker = useBlocker({
    shouldBlockFn: () => Boolean(quoteData?.text?.trim()),
    withResolver: true,
  })

  useEffect(() => {
    if (blocker.status === 'blocked' && quoteData?.text?.trim()) {
      const saveAndProceed = async () => {
        try {
          await handleSubmit(quoteData)
          // handleSubmit already navigates, but proceed() clears the blocker state
          blocker.proceed()
        } catch (error) {
          console.error('Failed to save note before navigation:', error)
          blocker.reset()
        }
      }
      saveAndProceed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocker.status, quoteData, handleSubmit])


  return (

    <div
      ref={noteRef}
      className='w-full h-dvh flex justify-self-center md:w-3/4 overflow-hidden'>

      <AnimatePresence mode="wait">
        <motion.div
          key={quoteId}
          initial={{ x: 120, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full "
        >

          <div className='flex p-4 bg-background flex-row sticky top-0 z-10  justify-between items-center'>
            <Link to="/"
              aria-label="link-to-home-link"
              className='flex items-center gap-2'
            >
              <Button variant="outline" size="icon"
                aria-label='go-to-home-button'
                title='go-to-home-button'>
                <ArrowLeftIcon />
              </Button>
            </Link>
            <div className="flex gap-2" >
              <Suspense fallback={<ButtonLoader />}>
                <ShareBackgroundComponent quoteFormData={quoteData} />
              </Suspense>

              <Suspense fallback={<ButtonLoader />}>
                <ChooseBackgroundComponent onValueUpdate={onValueUpdate} />
              </Suspense>

              <Suspense fallback={<ButtonLoader />}>
                <ChatSheetComponent text={quoteData?.text!} query="Summarize this note" />
              </Suspense>
            </div>
          </div>

          {isLoading && <div aria-label="loading" ><EditorSkeleton /></div>}

          {error && <div aria-label="error" className="text-destructive">Error: {error}</div>}


          <div className="p-4 flex flex-col gap-4">
            {/*
        <Separator className="  bg-border" />
        */}
            {!isLoading &&
              (
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    {/*
                    <Label htmlFor="name-1">Note</Label>
                    */}
                    <Suspense fallback={<EditorSkeleton />}>
                      <div aria-label="editor" >
                        <Tiptap
                          key={quoteData?.id ?? "new"}
                          value={quoteData?.text}
                          quoteFormData={quoteData}
                          onValueUpdate={onValueUpdate} />
                      </div>
                    </Suspense>
                  </div>
                </div>
              )
            }

            <Separator className="  bg-border" />
            {/* */}
            <div className="">
              <TagField onChoose={onTagChoose} />
              <div
                aria-label='tag-list'
                className="flex flex-wrap gap-2">
                {
                  quoteData?.tags && quoteData?.tags.length > 0 && (
                    quoteData?.tags.map((tag) => {
                      return (
                        <motion.div
                          key={tag}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          onClick={() => {
                            onTagRemove(tag)
                          }}
                        >
                          <Badge
                            variant={'outline'}
                            aria-label={tag}
                            className=" bg-primary/10 border-primary/30 text-primary/90"
                          >
                            #{tag}
                          </Badge>
                        </motion.div>
                      )
                    }
                    )
                  )
                }
              </div>


            </div>

          </div>

        </motion.div>
      </AnimatePresence>
 
    </div>
  )
}
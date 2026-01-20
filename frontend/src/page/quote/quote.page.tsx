

import { Route } from '@/routes/$quoteId'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { useBlocker } from "@tanstack/react-router"
import TagField from "@/feature/quote/form-field/tag"
import {  addQuote, updateQuote } from '@/db/quote.db'
import { AnimatePresence, motion } from 'framer-motion'
import { addOrGetTag } from '@/legacy-indexDB-db/tag.db'
import { ArrowLeftIcon, Save, Shirt } from 'lucide-react'
import { lazy, Suspense } from 'react'
const Tiptap = lazy(() => import('@/components/common/tiptap-customized'))
const ShareBackground = lazy(() => import('@/feature/quote/dialog/share.dialog').then(mod => ({ default: mod.ShareBackground })))
import { useGetQuoteDetails } from '@/api-hook/use-get-quote-details.hook'
import { addTagToQuote, deleteQuoteTagLinks, deleteQuoteWithLinks } from '@/db/quote_tags.db'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import ChooseBackground from "@/feature/quote/drawer/choose-background.drawer"
import type { Quote, QuoteDetails, QuoteFormData, Tag } from "@/model/index.model"
import { useState, useEffect, useRef, useCallback, type Dispatch, type SetStateAction } from "react"


interface Props {
  mode: "add" | "edit";
}

export function QuotePage(props: Props) {
  const { mode } = props
  const navigate = useNavigate()
const noteRef = useRef<HTMLDivElement>(null)

  // Only read params in edit mode
  const params = mode === 'edit' ? Route.useParams() : null
  const quoteId = params?.quoteId

  // Only fetch in edit mode
  const {
    data: quote,
    isLoading,
    error,
  } = useGetQuoteDetails(
    mode === 'edit' ? Number(quoteId) : undefined
  )

  const [quoteData, setQuoteData] = useState<QuoteFormData>(() => ({
    id: quote?.id,
    text: quote?.text || "",
    tags: quote?.tags?.map((tag) => tag.name) || [],
    texture: quote?.texture  ,
    pri_set: quote?.pri_set,
  }))
// console.log({quoteData})

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("Submitted", quoteData)
    if (quoteData && quoteData?.text?.trim()) {
      handleSubmit(quoteData)
    }
  }


  const handleSubmit = useCallback(async (quote: QuoteFormData) => {
    // console.log({at:"at submit" ,quote })
    let quoteId: number | undefined = quote.id
    if (quoteId) { // edit
      await updateQuote({
        ...quote,
        text: quote.text || "Empty"
      })
    } else {
      const newQuote = await addQuote({
        ...quote,
        text: quote.text || "Empty",
      })
      quoteId = newQuote.id
    }

    // console.log({ quoteId });

    const tags = await getTags(quote.tags!)
    // console.log({ tags })

    // Delete all existing tags for this quote
    await deleteQuoteTagLinks(quoteId!)

    // Add new tags for this quote
    for (const tag of tags) {
      await addTagToQuote( quoteId!, tag.name!)
    }
    navigate({
      to: '/'
    })
  }, [navigate])

  useEffect(() => {
    if (quote) {
      setQuoteData({
        id: quote.id,
        text: quote.text,
        tags: quote.tags?.map(t => t.name) || [],
        texture: quote.texture,
        pri_set: quote.pri_set,
      })
    }
  }, [quote, mode])

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
          console.error('Failed to save quote before navigation:', error)
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
      className='w-full h-dvh '>
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteId}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full "
        >

          <div className='flex p-4 bg-background flex-row sticky top-0 z-10  justify-between items-center'>
            <Link to="/" className='flex items-center gap-2'>
              <Button variant="outline" size="icon">
                <ArrowLeftIcon />
              </Button>
            </Link>
            <div className="flex gap-2" >
              <Suspense fallback={null}>
                <ShareBackground quoteFormData={quoteData}/>
              </Suspense>
              <ChooseBackground onValueUpdate={onValueUpdate}/>
            </div>
          </div>

          {isLoading && <div>Loading...</div>}

          {error && <div className="text-destructive">Error: {error}</div>}


          <div className="p-4 flex flex-col gap-4">
            {/*
        <Separator className="  bg-border" />
        */}
            {!isLoading &&
              (
                <div className="grid gap-4">
                  <div className="grid gap-3">
                  {/*
                    <Label htmlFor="name-1">Quote</Label>
                    */}
                    <Suspense fallback={<div>Loading editor...</div>}>
                      <Tiptap
                        key={quoteData?.id ?? "new"}
                        value={quoteData?.text}
                        quoteFormData={quoteData}
                        onValueUpdate={onValueUpdate} />
                    </Suspense>
                  </div>
                </div>
              )
            }
            {/*
          <Separator className="  bg-border" />
  */}
            <div className="">
              <TagField onChoose={onTagChoose} />
              <div className="flex flex-wrap gap-2">
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

            {/*
          <Separator className=" bg-border" />
          */}
          </div>

        </motion.div>
      </AnimatePresence>
      {/*
  </div>
  */}
    </div>
  )
}
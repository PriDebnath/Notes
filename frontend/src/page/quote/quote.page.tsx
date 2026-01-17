

import { Route } from '@/routes/$quoteId'
import { ArrowLeftIcon, Save, Shirt } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import TagField from "@/feature/quote/form-field/tag"
import { Separator } from "@/components/ui/separator"
import { AnimatePresence, motion } from 'framer-motion'
import Tiptap from '@/components/common/tiptap-customized'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useGetQuoteDetails } from '@/hook/get-quote-details.hook'
import type { Quote, QuoteDetails, QuoteFormData, Tag } from "@/model/quote.model"
import { useState, useEffect, useRef, useCallback, type Dispatch, type SetStateAction } from "react"
import { addQuoteTag, deleteAllQuoteTags, getAllQuotesDetails } from '@/db/quote_tags.db'
import { getAllQuotes, addQuote, updateQuote, deleteQuote, getAllQuote } from '@/db/quote.db'
import { addOrGetTag } from '@/db/tag.db'
import { useBlocker } from "@tanstack/react-router"
import ChooseBackground from "@/feature/quote/drawer/choose-background.drawer"
import ShareBackground from "@/feature/quote/drawer/share.drawer"
import { toPng } from "html-to-image"
import { ListTags } from "@/feature/quote/list.tags";

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
    texture: quote?.texture,
    pri_set: quote?.pri_set,
  }))
console.log({quoteData})

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
    console.log("Submitted", quoteData)
    if (quoteData && quoteData?.text?.trim()) {
      handleSubmit(quoteData)
    }
  }


  const handleSubmit = useCallback(async (quote: QuoteFormData) => {
    console.log({at:"at submit" ,quote })
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

    console.log({ quoteId });

    const tags = await getTags(quote.tags!)
    console.log({ tags })

    // Delete all existing tags for this quote
    await deleteAllQuoteTags(quoteId!)

    // Add new tags for this quote
    for (const tag of tags) {
      await addQuoteTag({
        quoteId: quoteId!,
        tagId: tag.id!
      })
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


const exportAsImage = async () => {
  if (!noteRef.current) return

  const dataUrl = await toPng(noteRef.current, {
    pixelRatio: 2,        // crisp image
    backgroundColor: "#fff"
  })

  const link = document.createElement("a")
  link.download = new Date().getTime()+"-note.png"
  link.href = dataUrl
  link.click()
}


  return (

    <div
    ref={noteRef}
      className='w-full h-[100dvh] '>
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
            <div  className='flex gap-4 '>
              <ShareBackground quoteFormData={quoteData}/>
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
                    <Label htmlFor="name-1">Quote</Label>
                    <Tiptap
                      key={quoteData?.id ?? "new"}
                      value={quoteData?.text}
                      onValueUpdate={onValueUpdate} />
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


import { Route } from '@/routes/$quoteId'
import { ArrowLeftIcon,Save } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import TagField from "@/feature/quote/form-field/tag"
import { Separator } from "@/components/ui/separator"
import { AnimatePresence, motion } from 'framer-motion'
import Tiptap from '@/components/common/tiptap-customized'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetQuoteDetails } from '@/hook/get-quote-details.hook'
import type { Quote, QuoteDetails, QuoteFormData } from "@/model/quote.model"

import { useState, useEffect, type Dispatch, type SetStateAction } from "react"
import { addQuoteTag, deleteAllQuoteTags, getAllQuotesDetails } from '@/db/quote_tags.db'
import { getAllQuotes, addQuote, updateQuote, deleteQuote, getAllQuote } from '@/db/quote.db'
import { addOrGetTag } from '@/db/tag.db'

export function QuotePage() {
  const { quoteId } = Route.useParams()
  const { data: quote, isLoading, error } = useGetQuoteDetails(Number(quoteId))

const [quoteData, setQuoteData] = useState<QuoteFormData>(() => ({
    id: quote?.id,
    text: quote?.text || "",
    tags: quote?.tags?.map((tag)=>tag.name) || [],
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


const onValueUpdate = (text: string) => {
    setQuoteData(prev => ({
      ...prev,
      text: text
    }))
  }
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted", quoteData)
    if (quoteData && quoteData?.text?.trim()) {
      handleSubmit(quoteData)
    }
  }
  
  const getTags = async (tags: string[]): Promise<Tag[]> => {
    const result: Tag[] = [];

    for (const tag of tags) {
      const savedTag = await addOrGetTag({ name: tag });
      result.push(savedTag);
    }

    return result;
  };
  
  const handleSubmit = async (quote: QuoteFormData) => {
    console.log({quote})
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

  console.log({quoteId});
  
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

  
  
}


  return (<div className='w-full red-red-900 overflow-hidden'>
    <AnimatePresence mode="wait">
      <motion.div
        key={quoteId}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -40, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full p-4"
      >
        <div className='flex flex-row  justify-between'>
          <Link to="/" className='flex items-center gap-2 mb-4'>
            <Button variant="outline" size="icon">
              <ArrowLeftIcon />
            </Button>
          </Link>


          <Button type="submit" onClick={handleFormSubmit}>
            {/* {mode == "add" ? "Add Quote" : "Update Quote"} */}
            <Save/>
          </Button>
        </div>

        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Quote</Label>
              <Tiptap value={quote?.text} onValueUpdate={onValueUpdate} />
            </div>
          </div>
          <Separator className="  bg-primary/50" />
          
        
          <TagField onChoose={onTagChoose} />
          <div className="flex flex-wrap gap-2">
            {
              quoteData?.tags && quoteData?.tags.length > 0 && (
                quoteData?.tags.map((tag) => {
                  return (
                    <Badge
                      key={tag}
                      variant={'outline'}
                      className=" bg-primary/10 border-primary/30 text-primary/90"
                      >
                      #{tag}
                    </Badge>
                  )
                }
                )
              )
            }
>
          </div>
          
          <Separator className=" bg-primary/50" />
          
        
      </motion.div>
    </AnimatePresence>
  </div>
  )
}

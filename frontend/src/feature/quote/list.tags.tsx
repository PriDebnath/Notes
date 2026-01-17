import React from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import { Badge } from "@/components/ui/badge"
import type { Quote, Tag } from "@/model/quote.model"
import QuoteCard from "@/feature/quote/card/quote.card"
import QuoteSkeleton from "@/feature/quote/card/quote-skeleton.card"

interface Props {
  tags: Tag[];
}

export function ListTags(props: Props) {
  const { tags } = props

  return (
    <React.Fragment  >
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              variant={'outline'}
              className=" bg-primary/10 border-primary/20 text-primary/70"
              key={tag.id}
            >
              #{tag.name}
            </Badge>
          ))}
        </div>
      ) : (<span></span>)
      }
    </React.Fragment>
  )
}

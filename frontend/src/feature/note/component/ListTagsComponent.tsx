import React from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import { Badge } from "@/components/ui/badge"
import type { Note, Tag } from "@/model/index.model"
import NoteCard from "@/feature/note/component/NoteCardComponent/NoteCardComponent"
import NoteSkeleton from "@/feature/note/component/NoteCardComponent/component/NoteSkeletonComponent"

interface Props {
  tags: Tag[];
}

export function ListTagsComponent(props: Props) {
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

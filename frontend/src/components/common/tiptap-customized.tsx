import { motion } from "framer-motion";
import StarterKit from '@tiptap/starter-kit'
import { BatteryFull, List } from 'lucide-react'
import useBackground from "@/hook/use-background.hook";
import { useEditor, EditorContent } from '@tiptap/react'
import type { QuoteFormData } from "@/model/index.model";
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import TiptapToolbar from '@/components/common/tiptap-toolbar'
import { useGetKeyBoardHeight } from '@/hook/use-get-keyboard-height.hook'
import { cn } from "@/lib/utils";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Table, TableCell, TableHeader, TableKit, TableRow } from '@tiptap/extension-table'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'


interface Props {
  value?: string;
  quoteFormData?: QuoteFormData;
  onValueUpdate: (key: keyof QuoteFormData, value: string) => void
}

const Tiptap = (props: Props) => {
  const { value, quoteFormData, onValueUpdate } = props
  const { buildStyleString } = useBackground()
  const styleString = buildStyleString(quoteFormData?.texture!, quoteFormData?.pri_set!)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle, 
      FontSize,
      Image.configure({
        inline: false,
        allowBase64: true,
        resize: {
          enabled: true,
           directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
    minWidth: 50,
    minHeight: 50,
          alwaysPreserveAspectRatio: true,
        },
      }),
      TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
    TaskList,
  TaskItem.configure({
    nested: true,
  }),

             TableKit.configure({
        table: { resizable: true },
      }),
  ], // define your extension array
    content: value,
    editorProps: {
      attributes: {
        style: styleString,
        class: 'p-2 border  bg-card min-h-48 max-h-64 overflow-auto  rounded-xl   '
      }
    },
    onUpdate: (updates) => {
      const { editor: newEditor } = updates
      const html = newEditor.getHTML()
      onValueUpdate("text", html)
    }
  })

  let keyBoardHeight = useGetKeyBoardHeight()

  //console.log({ k: keyBoardHeight })
  return (
    <div className={cn(
      "tiptap",
      "prose",
      "prose-foreground",
      "removed-prose-sm ",
      "removed-sm:prose-base ",
      "  removed-lg:prose-lg",
      "  removed-xl:prose-2xl",
      "transition-transform duration-300 ease-out",
    )}
    >   {/* IMPORTANT */}
      <EditorContent editor={editor} />
      {/*
      <div className="
          fixed 
          z-50
          bottom-0
          left-0
          right-0
          border
          rounded-t-xl
          overflow-hidden
          transition-transform duration-300 ease-out
      "
        style={{
          transform: `translateY(-${keyBoardHeight}px)`
        }}
      >
      */}
      <motion.div
        className={cn(
          "fixed",
          "  z-50",
          "   bottom-0",
          " left-0",
          "   right-0",
          "  ",
          " "
        )}
        initial={{ scale: 0.8, }}
        animate={{
          y: -keyBoardHeight,
          scale: 1
        }}
        transition={{
          type: "spring",
          stiffness: 300, // how stiff the spring is
          damping: 30,    // how quickly it settles
        }}
      >
        <div className="flex justify-self-center w-full md:w-3/4 border  rounded-t-xl">
        <TiptapToolbar editor={editor} />
        </div>
      </motion.div>
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </div>
  )
}

export default Tiptap
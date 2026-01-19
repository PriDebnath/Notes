import { motion } from "framer-motion";
import StarterKit from '@tiptap/starter-kit'
import { BatteryFull, List } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import type { QuoteFormData } from "@/model/quote.model";
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import TiptapToolbar from '@/components/common/tiptap-toolbar'
import { useGetKeyBoardHeight } from '@/hook/use-get-keyboard-height.hook'
import useBackground from "@/hook/use-background.hook";

interface Props {
  value?: string;
  quoteFormData?: QuoteFormData;
  onValueUpdate: (key: keyof QuoteFormData, value: string) => void
}

const Tiptap = (props: Props) => {
  const { value,quoteFormData, onValueUpdate } = props
      const { buildStyleString } = useBackground()
      const styleString = buildStyleString(quoteFormData?.texture!, quoteFormData?.pri_set!)
  
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
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
    <div className="
                tiptap
                prose
                prose-foreground
                
removed-prose-sm  
removed-sm:prose-base 
                removed-lg:prose-lg
                removed-xl:prose-2xl
transition-transform duration-300 ease-out
            ">   {/* IMPORTANT */}
      <EditorContent editor={editor}  />
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
        className="
    fixed 
    z-50
    bottom-0
    left-0
    right-0
    border
    rounded-t-xl
  "
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
        <TiptapToolbar editor={editor} />
      </motion.div>
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </div>
  )
}

export default Tiptap
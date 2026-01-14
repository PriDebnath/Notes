import StarterKit from '@tiptap/starter-kit'
import { BatteryFull, List } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import TiptapToolbar from '@/components/common/tiptap-toolbar'
import {useGetKeyBoardHeight} from '@/hook/use-get-keyboard-height.hook'

interface Props {
  value?: string
  onValueUpdate: (text: string) => void
}

const Tiptap = (props: Props) => {
  const { value, onValueUpdate } = props
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: value,
    editorProps: {
      attributes: {
        class: 'p-2 border bg-card overflow-hidden h-48  rounded-xl   '
      }
    },
    onUpdate: (updates) => {
      const { editor: newEditor } = updates
      const html = newEditor.getHTML()
      onValueUpdate(html)
    }
  })
  
let   keyBoardHeight = useGetKeyBoardHeight()

console. log({k: keyBoardHeight})
  return (
    <div className="
                tiptap
                prose
                prose-foreground
removed-prose-sm  
removed-sm:prose-base 
                removed-lg:prose-lg
                removed-xl:prose-2xl
               h-full
               
            ">   {/* IMPORTANT */}
      <EditorContent editor={editor} />
      <div className="
          fixed 
          z-50
          bottom-0
          left-0
          right-0
          border
          rounded-t-xl
          overflow-hidden
      "
        style={{
          transform: `translateY(-${keyBoardHeight}px)`
        }}
      >
        <TiptapToolbar editor={editor} />
      </div>
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </div>
  )
}

export default Tiptap
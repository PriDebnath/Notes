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
        class: 'border bg-yellow-500 rounded border-primary/20 focus-visible:border-primary outline-none'
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
                removed-prose
                prose-sm 
                sm:prose-base 
                lg:prose-lg
                xl:prose-2xl
                focus:outline-none
                bg-red-700
            ">   {/* IMPORTANT */}
      <EditorContent editor={editor} />
      <div className={"fixed bottom-0"}
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
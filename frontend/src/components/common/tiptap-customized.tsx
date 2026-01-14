import StarterKit from '@tiptap/starter-kit'
import { BatteryFull, List } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import TiptapToolbar from '@/components/common/tiptap-toolbar'


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
        class: 'border rounded border-primary/20 focus-visible:border-primary outline-none'
      }
    },
    onUpdate: (updates) => {
      const { editor: newEditor } = updates
      const html = newEditor.getHTML()
      onValueUpdate(html)
    }
  })

  return (
    <div className="
                tiptap
                removed-prose
                prose-sm 
                sm:prose-base 
                lg:prose-lg
                xl:prose-2xl
                focus:outline-none
            ">   {/* IMPORTANT */}
      <EditorContent editor={editor} />
    <TiptapToolbar editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </div>
  )
}

export default Tiptap
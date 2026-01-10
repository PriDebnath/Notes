import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import { BatteryFull, List } from 'lucide-react'
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
    onUpdate: (updates) => {
      const { editor: newEditor } = updates
      const html = newEditor.getHTML()
      onValueUpdate(html)
    }
  })

  return (
    <div>
      <button
  onClick={() => {
    console.log('can toggle:', editor.can().toggleBulletList())
    editor.chain().focus().toggleBulletList().run()
    console.log(editor.getHTML())
  }}
>
  <List />
   
</button>
<TiptapToolbar editor={editor}/>
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </div>
  )
}

export default Tiptap
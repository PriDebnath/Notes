import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/tiptap-ui-primitive/button'
import { BoldIcon, ItalicIcon } from 'lucide-react'
import type { Editor } from '@tiptap/react'
// import { BoldIcon } from '@/components/icons/bold-icon'
// import { ItalicIcon } from '@/components/icons/italic-icon'
// import { Spacer } from '@/components/tiptap-ui-primitive/spacer'
interface Props {
editor: Editor
}
export default function TiptapToolbar(props: Props) {
    let { editor } = props
  return (
    <Toolbar variant='floating' >
      <ToolbarGroup>
        <Button data-style="ghost"
          onClick={() => {
    console.log('can toggle:', editor.can().toggleBulletList())
    editor.chain().focus().toggleBold().run()
    console.log(editor.getHTML())
  }}>
          <BoldIcon className="tiptap-button-icon" />
        </Button>
        <Button data-style="ghost">
          <ItalicIcon className="tiptap-button-icon" />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <Button data-style="ghost">Format</Button>
      </ToolbarGroup>

      {/* <Spacer /> */}

      <ToolbarGroup>
        <Button data-style="primary">Save</Button>
      </ToolbarGroup>
    </Toolbar>
  )
}
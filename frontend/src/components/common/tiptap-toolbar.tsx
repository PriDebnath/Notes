import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/tiptap-ui-primitive/button'
import { BoldIcon, ItalicIcon } from 'lucide-react'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

// import { BoldIcon } from '@/components/icons/bold-icon'
// import { ItalicIcon } from '@/components/icons/italic-icon'
// import { Spacer } from '@/components/tiptap-ui-primitive/spacer'
interface Props {
    editor: Editor
}
export default function TiptapToolbar(props: Props) {
    let { editor } = props
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isBold: editor.isActive('bold'),
            isItalic: editor.isActive('italic'),
            canBold: editor.can().chain().focus().toggleBold().run(),
            canItalic: editor.can().chain().focus().toggleItalic().run(),
        }),
    })

    return (
        <Toolbar variant='floating' className='my-2 rounded; border border-primary/20' >
            <ToolbarGroup>

                <Button
                    data-style="ghost"
                    data-active-state={editorState.isBold ? 'on' : 'off'}
                    disabled={!editorState.canBold}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <BoldIcon className="tiptap-button-icon" />
                </Button>

                <Button
                    data-style="ghost"
                    data-active-state={editorState.isItalic ? 'on' : 'off'}
                    disabled={!editorState.canItalic}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <ItalicIcon className="tiptap-button-icon" />
                </Button>



            </ToolbarGroup>

            <ToolbarSeparator />
        </Toolbar>
    )
}
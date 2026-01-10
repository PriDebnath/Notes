import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/tiptap-ui-primitive/button'
import {
  BoldIcon,
  ItalicIcon,
  CodeIcon,
  StrikethroughIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Heading1,
  Heading2,
  Heading3,
  UndoIcon,
  RedoIcon,
  EraserIcon,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

interface Props {
  editor: Editor
}

export default function TiptapToolbar({ editor }: Props) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      strike: editor.isActive('strike'),
      code: editor.isActive('code'),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      blockquote: editor.isActive('blockquote'),
      h1: editor.isActive('heading', { level: 1 }),
      h2: editor.isActive('heading', { level: 2 }),
      h3: editor.isActive('heading', { level: 3 }),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  })

  return (
    <Toolbar variant="floating" className="my-2 rounded border border-primary/20">
      {/* Text styles */}
      <ToolbarGroup>
            {/* 
        <Button
          data-style="ghost"
          data-active-state={state.bold ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon />
        </Button>

        <Button
          data-style="ghost"
          data-active-state={state.italic ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </Button>

        <Button
          data-style="ghost"
          data-active-state={state.strike ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon />
        </Button>
        <Button
          data-style="ghost"
          data-active-state={state.code ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <CodeIcon />
        </Button>
        */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Headings */}
      <ToolbarGroup>
        <Button
          data-style="ghost"
          data-active-state={state.h1 ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 />
        </Button>

        <Button
          data-style="ghost"
          data-active-state={state.h2 ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 />
        </Button>

        <Button
          data-style="ghost"
          data-active-state={state.h3 ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Lists & blocks */}
      <ToolbarGroup>
        <Button
          data-style="ghost"
          data-active-state={state.bulletList ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon />
        </Button>

        <Button
          data-style="ghost"
          data-active-state={state.orderedList ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon />
        </Button>

        <Button
          data-style="ghost"
          data-active-state={state.blockquote ? 'on' : 'off'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <QuoteIcon />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* History & cleanup */}
      <ToolbarGroup>
      {/*
        <Button
          data-style="ghost"
          disabled={!state.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon />
        </Button>

        <Button
          data-style="ghost"
          disabled={!state.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon />
        </Button>
        */}
        <Button
          data-style="ghost"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <EraserIcon />
        </Button>
        {/*
        */}
      </ToolbarGroup>
    </Toolbar>
  )
}

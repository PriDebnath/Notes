import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/tiptap-ui-primitive/button'
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  HighlighterIcon,
  Heading1,
  Heading2,
  Heading3,
  ListIcon,
  ListOrderedIcon,
  CheckSquareIcon,
  QuoteIcon,
  CodeSquareIcon,
  MinusIcon,
  CornerDownLeftIcon,
  LinkIcon,
  UnlinkIcon,
  ImageIcon,
  TableIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  UndoIcon,
  RedoIcon,
  EraserIcon,
  TrashIcon,
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
      underline: editor.isActive('underline'),
      strike: editor.isActive('strike'),
      code: editor.isActive('code'),
      highlight: editor.isActive('highlight'),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      taskList: editor.isActive('taskList'),
      blockquote: editor.isActive('blockquote'),
      codeBlock: editor.isActive('codeBlock'),
      h1: editor.isActive('heading', { level: 1 }),
      h2: editor.isActive('heading', { level: 2 }),
      h3: editor.isActive('heading', { level: 3 }),
      alignLeft: editor.isActive({ textAlign: 'left' }),
      alignCenter: editor.isActive({ textAlign: 'center' }),
      alignRight: editor.isActive({ textAlign: 'right' }),
      alignJustify: editor.isActive({ textAlign: 'justify' }),
      link: editor.isActive('link'),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  })

  return (
    <Toolbar variant="floating" 
    className="rounded! bg-card  flex-wrap gap-1">
      {/* TEXT MARKS */}
      <ToolbarGroup className="" >
      <HeadingDropdown editor={editor} />
      <FontSizeDropdown editor={editor} />
        <Button  className="  " 
          data-active-state={state.bold ? 'on' : 'off'} 
          onClick={() => editor.chain().focus().toggleBold().run()}>
        <BoldIcon />
        </Button>
        <Button data-active-state={state.italic ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleItalic().run()}><ItalicIcon /></Button>
        <Button data-active-state={state.underline ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon /></Button>
        <Button data-active-state={state.strike ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleStrike().run()}><StrikethroughIcon /></Button>
        <Button data-active-state={state.code ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleCode().run()}><CodeIcon /></Button>
        <Button data-active-state={state.highlight ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleHighlight().run()}><HighlighterIcon /></Button>
  {/*   
      </ToolbarGroup>
  */}
  <ToolbarSeparator />

      {/* HEADINGS */}
  {/*   
      <ToolbarGroup>
  */}
      {/*
        <Button data-active-state={state.h1 ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 /></Button>
        <Button data-active-state={state.h2 ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 /></Button>
        <Button data-active-state={state.h3 ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 /></Button>
        <Button onClick={() => editor.chain().focus().setParagraph().run()}>P</Button>
      */}
      </ToolbarGroup>
      <ToolbarSeparator />

      {/* LISTS */}
      {/*
      */}
      <ToolbarGroup>
        <Button data-active-state={state.bulletList ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleBulletList().run()}><ListIcon /></Button>
        <Button data-active-state={state.orderedList ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrderedIcon /></Button>
        <Button data-active-state={state.taskList ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleTaskList().run()}><CheckSquareIcon /></Button>
        <Button onClick={() => editor.chain().focus().sinkListItem('listItem').run()}>→</Button>
        <Button onClick={() => editor.chain().focus().liftListItem('listItem').run()}>←</Button>
      {/*
      </ToolbarGroup>
      */}

      <ToolbarSeparator />

      {/* BLOCKS */}
      {/*
      <ToolbarGroup>
      */}
        <Button data-active-state={state.blockquote ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleBlockquote().run()}><QuoteIcon /></Button>
        <Button data-active-state={state.codeBlock ? 'on' : 'off'} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><CodeSquareIcon /></Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}><MinusIcon /></Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}><CornerDownLeftIcon /></Button>
      {/*
      */}
      </ToolbarGroup>

      {/*
      <ToolbarSeparator />
      */}

      {/* ALIGNMENT */}
      {/*
      */}
      <ToolbarGroup>
        <Button data-active-state={state.alignLeft ? 'on' : 'off'} onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeftIcon /></Button>
        <Button data-active-state={state.alignCenter ? 'on' : 'off'} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenterIcon /></Button>
        <Button data-active-state={state.alignRight ? 'on' : 'off'} onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRightIcon /></Button>
        <Button data-active-state={state.alignJustify ? 'on' : 'off'} onClick={() => editor.chain().focus().setTextAlign('justify').run()}><AlignJustifyIcon /></Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* LINK / MEDIA */}
      <ToolbarGroup>
        <Button data-active-state={state.link ? 'on' : 'off'} onClick={() => editor.chain().focus().setLink({ href: prompt('URL') || '' }).run()}><LinkIcon /></Button>
        <Button onClick={() => editor.chain().focus().unsetLink().run()}><UnlinkIcon /></Button>
        <Button onClick={() => editor.chain().focus().setImage({ src: prompt('Image URL') || '' }).run()}><ImageIcon /></Button>
        <Button onClick={() => editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })}><TableIcon /></Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* HISTORY / CLEANUP */}
      <ToolbarGroup>
        <Button disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}><UndoIcon /></Button>
        <Button disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}><RedoIcon /></Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><EraserIcon /></Button>
        <Button onClick={() => editor.chain().focus().clearContent().run()}><TrashIcon /></Button>
      </ToolbarGroup>

    </Toolbar>
  )
}

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

function HeadingDropdown({ editor }: { editor: Editor }) {
  const value =
    editor.isActive("heading", { level: 1 }) ? "h1" :
    editor.isActive("heading", { level: 2 }) ? "h2" :
    editor.isActive("heading", { level: 3 }) ? "h3" :
    "p"

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        const chain = editor.chain().focus()
        if (v === "p") chain.setParagraph().run()
        if (v === "h1") chain.setHeading({ level: 1 }).run()
        if (v === "h2") chain.setHeading({ level: 2 }).run()
        if (v === "h3") chain.setHeading({ level: 3 }).run()
      }}
    >
      <SelectTrigger className="">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="h1">H1</SelectItem>
        <SelectItem value="h2">H2</SelectItem>
        <SelectItem value="h3">H3</SelectItem>
        <SelectItem value="p">P</SelectItem>
      </SelectContent>
    </Select>
  )
}

const SIZES = [
  { label: "8px", value: "8px" },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "18px", value: "18px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
]


function FontSizeDropdown({ editor }: { editor: Editor }) {
  return (
    <Select
      onValueChange={(value) =>
        editor.chain().focus().setFontSize(value).run()
      }
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>

      <SelectContent>
        {SIZES.map(size => (
          <SelectItem key={size.value} value={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

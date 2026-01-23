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
import { FontSizeDropdown } from './font-size';
import { HeadingDropdown } from './html-tag';
import { ToolbarButton } from './tiptap-toolbar-button';

const TEXT_MARKS = [
  { key: 'bold', icon: <BoldIcon />, action: (e: Editor) =>e.chain().focus().toggleBold().run() },
  { key: 'italic', icon: <ItalicIcon />, action: (e: Editor) =>e.chain().focus().toggleItalic().run() },
  { key: 'underline', icon: <UnderlineIcon />, action: (e: Editor) =>e.chain().focus().toggleUnderline().run() },
  { key: 'strike', icon: <StrikethroughIcon />, action: (e: Editor) =>e.chain().focus().toggleStrike().run() },
  { key: 'code', icon: <CodeIcon />, action: (e: Editor) =>e.chain().focus().toggleCode().run() },
  { key: 'highlight', icon: <HighlighterIcon />, action: (e: Editor) =>e.chain().focus().toggleHighlight().run() },
]

const LISTS = [
  { key: 'bulletList', icon: <ListIcon />, action: (e: Editor) =>e.chain().focus().toggleBulletList().run() },
  { key: 'orderedList', icon: <ListOrderedIcon />, action: (e: Editor) =>e.chain().focus().toggleOrderedList().run() },
  { key: 'taskList', icon: <CheckSquareIcon />, action: (e: Editor) =>e.chain().focus().toggleTaskList().run() },
  { key: 'sink', icon: '→', action: (e: Editor) =>e.chain().focus().sinkListItem('listItem').run() },
  { key: 'lift', icon: '←', action: (e: Editor) =>e.chain().focus().liftListItem('listItem').run() },
]


const BLOCKS = [
  { key: 'blockquote', icon: <QuoteIcon />, action: (e: Editor) =>e.chain().focus().toggleBlockquote().run() },
  { key: 'codeBlock', icon: <CodeSquareIcon />, action: (e: Editor) =>e.chain().focus().toggleCodeBlock().run() },
  { key: 'hr', icon: <MinusIcon />, action: (e: Editor) =>e.chain().focus().setHorizontalRule().run() },
  { key: 'hardBreak', icon: <CornerDownLeftIcon />, action: (e: Editor) =>e.chain().focus().setHardBreak().run() },
]

const ALIGNMENT = [
  { key: 'alignLeft', icon: <AlignLeftIcon />, value: 'left' },
  { key: 'alignCenter', icon: <AlignCenterIcon />, value: 'center' },
  { key: 'alignRight', icon: <AlignRightIcon />, value: 'right' },
  { key: 'alignJustify', icon: <AlignJustifyIcon />, value: 'justify' },
]


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

      <ToolbarGroup className="" >
        <HeadingDropdown editor={editor} />
        <FontSizeDropdown editor={editor} />
        {TEXT_MARKS.map(btn => (
          <ToolbarButton
            key={btn.key}
            title={btn.key}
            active={state[btn.key as keyof typeof state]}
            onClick={() => btn.action(editor)}
          >
            {btn.icon}
          </ToolbarButton>
        ))}
      </ToolbarGroup>
      
        <ToolbarSeparator />

        {/* HEADINGS */}
      <ToolbarGroup>
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




function TableControls({ editor }: { editor: Editor }) {
  if (!editor.isActive("table")) return null

  return (
    <ToolbarGroup>
      <Button onClick={() => editor.chain().focus().addRowBefore().run()}>
        +Row ↑
      </Button>
      <Button onClick={() => editor.chain().focus().addRowAfter().run()}>
        +Row ↓
      </Button>
      <Button onClick={() => editor.chain().focus().addColumnBefore().run()}>
        +Col ←
      </Button>
      <Button onClick={() => editor.chain().focus().addColumnAfter().run()}>
        +Col →
      </Button>
      <Button onClick={() => editor.chain().focus().deleteTable().run()}>
        Delete
      </Button>
    </ToolbarGroup>
  )
}

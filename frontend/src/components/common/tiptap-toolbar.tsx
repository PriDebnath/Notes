import React from 'react'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/tiptap-ui-primitive/toolbar'
import { ToolbarButton } from './tiptap-toolbar-button'

import { FontSizeDropdown } from './font-size'
import { HeadingDropdown } from './html-tag'

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  HighlighterIcon,
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
import { Separator } from '@radix-ui/react-dropdown-menu'
import TableSelect from '@/components/common/table-select'

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type ToolbarBtn = {
  key: string
  icon: React.ReactNode
  active?: (state: any) => boolean
  disabled?: (state: any) => boolean
  action: (editor: Editor) => void
}

/* ------------------------------------------------------------------ */
/* Button Groups */
/* ------------------------------------------------------------------ */

const TEXT_MARKS: ToolbarBtn[] = [
  { key: 'bold', icon: <BoldIcon />, active: s => s.bold, action: e => e.chain().focus().toggleBold().run() },
  { key: 'italic', icon: <ItalicIcon />, active: s => s.italic, action: e => e.chain().focus().toggleItalic().run() },
  { key: 'underline', icon: <UnderlineIcon />, active: s => s.underline, action: e => e.chain().focus().toggleUnderline().run() },
  { key: 'strike', icon: <StrikethroughIcon />, active: s => s.strike, action: e => e.chain().focus().toggleStrike().run() },
  { key: 'code', icon: <CodeIcon />, active: s => s.code, action: e => e.chain().focus().toggleCode().run() },
  { key: 'highlight', icon: <HighlighterIcon />, active: s => s.highlight, action: e => e.chain().focus().toggleHighlight().run() },
]

const LISTS: ToolbarBtn[] = [
  { key: 'bulletList', icon: <ListIcon />, active: s => s.bulletList, action: e => e.chain().focus().toggleBulletList().run() },
  { key: 'orderedList', icon: <ListOrderedIcon />, active: s => s.orderedList, action: e => e.chain().focus().toggleOrderedList().run() },
  { key: 'taskList', icon: <CheckSquareIcon />, active: s => s.taskList, action: e => e.chain().focus().toggleTaskList().run() },
  { key: 'sink', icon: '→', action: e => e.chain().focus().sinkListItem('listItem').run() },
  { key: 'lift', icon: '←', action: e => e.chain().focus().liftListItem('listItem').run() },
]

const BLOCKS: ToolbarBtn[] = [
  { key: 'blockquote', icon: <QuoteIcon />, active: s => s.blockquote, action: e => e.chain().focus().toggleBlockquote().run() },
  { key: 'codeBlock', icon: <CodeSquareIcon />, active: s => s.codeBlock, action: e => e.chain().focus().toggleCodeBlock().run() },
  { key: 'hr', icon: <MinusIcon />, action: e => e.chain().focus().setHorizontalRule().run() },
  { key: 'hardBreak', icon: <CornerDownLeftIcon />, action: e => e.chain().focus().setHardBreak().run() },
]

const ALIGNMENT: ToolbarBtn[] = [
  { key: 'alignLeft', icon: <AlignLeftIcon />, active: s => s.alignLeft, action: e => e.chain().focus().setTextAlign('left').run() },
  { key: 'alignCenter', icon: <AlignCenterIcon />, active: s => s.alignCenter, action: e => e.chain().focus().setTextAlign('center').run() },
  { key: 'alignRight', icon: <AlignRightIcon />, active: s => s.alignRight, action: e => e.chain().focus().setTextAlign('right').run() },
  { key: 'alignJustify', icon: <AlignJustifyIcon />, active: s => s.alignJustify, action: e => e.chain().focus().setTextAlign('justify').run() },
]

const LINKS_MEDIA: ToolbarBtn[] = [
  {
    key: 'link',
    icon: <LinkIcon />,
    active: s => s.link,
    action: e => e.chain().focus().setLink({ href: prompt('URL') || '' }).run(),
  },
  { key: 'unlink', icon: <UnlinkIcon />, action: e => e.chain().focus().unsetLink().run() },
  { key: 'image', icon: <ImageIcon />, action: e => e.chain().focus().setImage({ src: prompt('Image URL') || '' }).run() },
  // {
  //   key: 'table',
  //   icon: <TableIcon />,
  //   action: e => e.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true }),
  // },
]

const HISTORY: ToolbarBtn[] = [
  { key: 'undo', icon: <UndoIcon />, disabled: s => !s.canUndo, action: e => e.chain().focus().undo().run() },
  { key: 'redo', icon: <RedoIcon />, disabled: s => !s.canRedo, action: e => e.chain().focus().redo().run() },
  { key: 'clearMarks', icon: <EraserIcon />, action: e => e.chain().focus().unsetAllMarks().clearNodes().run() },
  { key: 'clearAll', icon: <TrashIcon />, action: e => e.chain().focus().clearContent().run() },
]

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function RenderGroup({
  editor,
  state,
  items,
}: {
  editor: Editor;
  state: any;
  items: ToolbarBtn[];

}) {
  return (
    <ToolbarGroup className=' '>
      {items.map(btn => (
        <ToolbarButton
          key={btn.key}
          title={btn.key}
          active={btn.active?.(state)}
          disabled={btn.disabled?.(state)}
          onClick={() => btn.action(editor)}
        >
          {btn.icon}
        </ToolbarButton>
      ))}
    </ToolbarGroup>
  )
}

function ToolbarRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-1 flex-wrap">
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main Toolbar */
/* ------------------------------------------------------------------ */

export default function TiptapToolbar({ editor }: { editor: Editor }) {
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
    <Toolbar variant="floating" className="rounded bg-card flex-wrap gap-1">

      {/* ROW 1 — Text / Headings */}
      <ToolbarRow>
        <ToolbarGroup className='flex flex-wrap'>
          <HeadingDropdown editor={editor} />
          <FontSizeDropdown editor={editor} />
          {TEXT_MARKS.map(btn => (
            <ToolbarButton
              key={btn.key}
              title={btn.key}
              active={btn.active?.(state)}
              disabled={btn.disabled?.(state)}
              onClick={() => btn.action(editor)}
            >
              {btn.icon}
            </ToolbarButton>
          ))}
        </ToolbarGroup>
      </ToolbarRow>

      {/* ROW 2 — Lists & Blocks */}
      <ToolbarRow>
        <ToolbarSeparator />
        <RenderGroup editor={editor} state={state} items={ALIGNMENT} />
        <ToolbarSeparator />
        <RenderGroup editor={editor} state={state} items={LISTS} />
        <ToolbarSeparator />
        <RenderGroup editor={editor} state={state} items={BLOCKS} />
      </ToolbarRow>

      {/* ROW 3 — Alignment */}
      {/* <ToolbarRow>
        <RenderGroup editor={editor} state={state} items={ALIGNMENT} />
      </ToolbarRow> */}

      {/* ROW 4 — Links / Media */}
      <ToolbarRow>
        <ToolbarSeparator />
        <RenderGroup editor={editor} state={state} items={LINKS_MEDIA} />
        <TableSelect editor={editor} />
        <ToolbarSeparator />
        <RenderGroup editor={editor} state={state} items={HISTORY} />
      </ToolbarRow>

      {/* ROW 5 — History / Cleanup */}
      {/* <ToolbarRow> */}
      {/* <RenderGroup editor={editor} state={state} items={HISTORY} /> */}
      {/* </ToolbarRow> */}

    </Toolbar>
  )
}

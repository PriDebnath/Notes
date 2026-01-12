import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import { BatteryFull, List } from 'lucide-react'
import TiptapToolbar from '@/components/common/tiptap-toolbar'
import { useState, useEffect, useRef } from 'react'


interface Props {
  value?: string
  onValueUpdate: (text: string) => void
}

const Tiptap = (props: Props) => {
  const { value, onValueUpdate } = props
  const [isFocused, setIsFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: value,
    onUpdate: (updates) => {
      const { editor: newEditor } = updates
      const html = newEditor.getHTML()
      onValueUpdate(html)
    },
    onFocus: () => {
      setIsFocused(true)
    },
    onBlur: () => {
      // Delay to allow toolbar clicks
      setTimeout(() => setIsFocused(false), 200)
    }
  })

  // Detect mobile and keyboard
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Use visualViewport API to detect keyboard
    let viewport = window.visualViewport
    if (viewport) {
      const handleViewportChange = () => {
        if (isMobile && viewport) {
          // Keyboard is open when viewport height is significantly less than window height
          const keyboardOpen = viewport.height < window.innerHeight * 0.75
          // This will be handled by CSS using env(keyboard-inset-height)
        }
      }
      viewport.addEventListener('resize', handleViewportChange)
      return () => {
        window.removeEventListener('resize', checkMobile)
        viewport?.removeEventListener('resize', handleViewportChange)
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  return (
    <div 
      ref={containerRef}
      className={`
        tiptap
        prose
        prose-base
        sm:prose-lg
        lg:prose-xl
        xl:prose-2xl
        focus:outline-none
        ${isMobile && isFocused ? 'mobile-editor-focused' : ''}
      `}
    >
      <EditorContent 
        editor={editor} 
        className='border rounded border-primary/20 active:border-primary min-h-[200px] p-3 text-lg' 
      />
      <TiptapToolbar editor={editor} isMobile={isMobile} isFocused={isFocused} />
    </div>
  )
}

export default Tiptap
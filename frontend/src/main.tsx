import './index.css'
import './tiptap.scss'
// import App from './App.tsx'
import { StrictMode, type JSX } from 'react'
import { createRoot } from 'react-dom/client'
import { MainProvider } from '@/provider/main.provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider />
  </StrictMode>,
)

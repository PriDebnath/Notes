import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TanstackRouterProvider } from '@/provider/tanstack-router.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackRouterProvider />
  </StrictMode>,
)

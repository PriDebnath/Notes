import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TanstackRouterProvider } from '@/provider/tanstack-router.provider.tsx'
import { TanstackQueryClientProvider } from '@/provider/query-client.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackQueryClientProvider>
      <TanstackRouterProvider />
    </TanstackQueryClientProvider>
  </StrictMode>,
)

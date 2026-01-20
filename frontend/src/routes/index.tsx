import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: lazyRouteComponent(() =>
    import('@/page/quote/quote-list.page').then(mod => ({ default: mod.QuoteListPage })),
  ),
})

 

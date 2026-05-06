import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: lazyRouteComponent(() =>
    import('@/page/note/note-list/note-list.page').then(mod => ({ default: mod.QuoteListPage })),
  ),
})

 

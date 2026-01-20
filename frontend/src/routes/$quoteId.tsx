import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/$quoteId')({
  component: lazyRouteComponent(() =>
    import('@/page/quote/quote.page').then(mod => ({
      default: () => <mod.QuotePage mode="edit" />,
    })),
  ),
})
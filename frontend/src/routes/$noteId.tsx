import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/$noteId')({
  component: lazyRouteComponent(() =>
    import('@/page/note/note/note.page').then(mod => ({
      default: () => <mod.NotePage mode="edit" />,
    })),
  ),
})
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const component = lazyRouteComponent(() => {
    return import('@/page/shared-note/shared-note.page').then(mod => ({ default: mod.default }))
})
 
export const Route = createFileRoute('/shared-note/$_id')({
  component: component,
})
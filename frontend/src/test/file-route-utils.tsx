import React from 'react'
import { render } from '@testing-library/react'
import { MainProvider } from '@/provider/main.provider'
import { type RenderOptions } from '@testing-library/react'
import { router } from '@/provider/tanstack-router.provider'

// Create test router with generated route tree
// export function createTestRouterFromFiles(initialLocation = '/') {
//     const router = createRouter({
//         routeTree,
//         history: createMemoryHistory({
//             initialEntries: [initialLocation],
//         }),
//         context: {
//             // Add any required context for your routes
//         },
//     })

//     return router
// }

// Custom render function for file-based routes
interface RenderWithFileRoutesOptions extends Omit<RenderOptions, 'wrapper'> {
    initialLocation?: string
    routerContext?: any
}

export function renderWithFileRoutes(
    ui: React.ReactElement,
    {
        initialLocation = '/',
        routerContext = {},
        ...renderOptions
    }: RenderWithFileRoutesOptions = {},
) {

    return {
        ...render(ui, { wrapper: MainProvider, ...renderOptions }),
        router,
    }
}


// Helper to test specific file routes
// export function createMockFileRoute(
//     path: string,
//     component: React.ComponentType,
// ) {
//     // This is useful for isolated testing when you don't want to use the full route tree
//     return {
//         path,
//         component,
//         // Add other common route properties as needed
//     }
// }
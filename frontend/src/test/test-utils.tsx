import '@testing-library/jest-dom';
import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createRouter,
  RouterProvider,
  createRootRoute,
  createRoute,
  createMemoryHistory,
} from "@tanstack/react-router"
import { cleanup } from '@testing-library/react';
import { afterEach } from "vitest";
import { TanstackRouterProvider } from '@/provider/tanstack-router.provider.tsx'
import { TanstackQueryClientProvider } from '@/provider/query-client.provider.tsx'

afterEach(() => {
  cleanup();
});

export function renderWithProviders(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  // simple test router
  // const rootRoute = createRootRoute()

  // const testRoute = createRoute({
  //   getParentRoute: () => rootRoute,
  //   path: "/",
  //   component: () => ui,
  // })

  // const router = createRouter({
  //   routeTree: rootRoute.addChildren([testRoute]),
  // })
// create route tree
  const rootRoute = createRootRoute()

  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => ui,
  })

  const routeTree = rootRoute.addChildren([testRoute])

  // IMPORTANT → start router at "/"
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ["/"],
    }),
  })
  return render(
    // <QueryClientProvider client={queryClient}>
    //   <RouterProvider router={router} />
    // </QueryClientProvider>
     <TanstackQueryClientProvider>
          <TanstackRouterProvider />
        </TanstackQueryClientProvider>
  )
}

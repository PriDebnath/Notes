import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const basepath = import.meta.env.BASE_URL; // auto matches Vite base
console.log({basepath});

const router = createRouter({
  routeTree,
  basepath,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export function TanstackRouterProvider() {
  return <RouterProvider router={router} />;
}
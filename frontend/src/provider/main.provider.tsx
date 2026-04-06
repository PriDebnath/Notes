import { TooltipProvider } from "@/components/ui/tooltip"
import { TanstackRouterProvider } from "./tanstack-router.provider"
import { TanstackQueryClientProvider } from "./query-client.provider"

export const MainProvider = () => {
  return (
    <TooltipProvider>
      <TanstackQueryClientProvider>
        <TanstackRouterProvider />
      </TanstackQueryClientProvider>
    </TooltipProvider>
  )
}
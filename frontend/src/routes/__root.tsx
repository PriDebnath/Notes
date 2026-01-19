import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useApplyTheme } from '@/hook/use-dark-or-light-theme.hook'
import { useApplyColorTheme} from '@/hook/use-color-theme.hook'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useApplyTheme()
  useApplyColorTheme()
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

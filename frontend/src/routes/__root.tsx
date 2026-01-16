import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useDarkOrLightTheme } from '@/hook/use-dark-or-light-theme.hook'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useDarkOrLightTheme()
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useTheme } from '@/hook/use-dark-or-light-theme.hook'
import { useColorTheme } from '@/hook/use-color-theme.hook'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useTheme()
  useColorTheme()
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

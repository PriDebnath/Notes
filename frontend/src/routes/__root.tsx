import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useApplyTheme } from '@/hook/use-dark-or-light-theme.hook'
import { useApplyColorTheme} from '@/hook/use-color-theme.hook'
import { useApplyFont} from '@/hook/use-apply-font.hook'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useApplyTheme()
  useApplyColorTheme()
  useApplyFont()
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

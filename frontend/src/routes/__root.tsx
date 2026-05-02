import * as React from 'react'
import { useApplyFont} from '@/hooks/use-apply-font.hook'
import { useApplyColorTheme} from '@/hooks/use-color-theme.hook'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useApplyTheme } from '@/hooks/use-dark-or-light-theme.hook'
import { NativeBackHandler } from '@/provider/native-back.provider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useApplyTheme()
  useApplyColorTheme()
  useApplyFont()
  return (
    <React.Fragment>
      <NativeBackHandler/>
      <Outlet />
    </React.Fragment>
  )
}

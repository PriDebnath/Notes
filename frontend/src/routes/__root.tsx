import * as React from 'react'
import { useApplyFont} from '@/hook/use-apply-font.hook'
import { useApplyColorTheme} from '@/hook/use-color-theme.hook'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useApplyTheme } from '@/hook/use-dark-or-light-theme.hook'
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

import { useEffect } from 'react'
import { App } from '@capacitor/app'
import { useRouter } from '@tanstack/react-router'

export function NativeBackHandler() {
  const router = useRouter()

  useEffect(() => {
    const sub = App.addListener('backButton', () => {
      if (router.history.canGoBack()) {
        router.history.back()
      } else {
        App.exitApp()
      }
    })

    return () => {
      sub.then(s => s.remove())
    }
  }, [router])

  return null
}

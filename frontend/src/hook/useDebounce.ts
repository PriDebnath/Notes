import { useEffect, useRef } from "react"

/**
 * Runs `callback` after `delay` ms
 * when `value` stops changing.
 *
 * Silent. No cleanup side-effects.
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  callback: (value: T) => void
) {
  const firstRun = useRef(true)

  useEffect(() => {
    // ❌ skip first render
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    const id = setTimeout(() => {
      callback(value)
    }, delay)

    return () => clearTimeout(id)
  }, [value, delay, callback])
}

import { useEffect, useState } from "react"

export function useLastDeployed() {
  const [lastDeployed, setLastDeployed] = useState<string | null>(null)

  useEffect(() => {
    fetch("/last-deployed.json")
      .then(res => res.json())
      .then(data => setLastDeployed(data.lastDeployed))
  }, [])

  return lastDeployed
}

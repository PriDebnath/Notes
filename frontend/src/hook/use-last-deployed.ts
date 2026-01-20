import { useEffect, useState } from "react"

export function useLastDeployed() {
    const [lastDeployed, setLastDeployed] = useState<string | null>(null)

    useEffect(() => {
        // Use a relative URL so this works correctly when the app
        // is deployed under a sub-path (e.g. GitHub Pages).
        fetch("last-deployed.json")
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load last-deployed.json: ${res.status}`)
                return res.json()
            })
            .then((data) => setLastDeployed(data.lastDeployed))
            .catch(() => {
                // Silently ignore errors; UI will just not show a date.
                setLastDeployed(null)
            })
    }, [])

    if (lastDeployed) { // format a bit
        let lastDeployedTime = new Date(lastDeployed).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        })
        return lastDeployedTime
    }
    return lastDeployed
}

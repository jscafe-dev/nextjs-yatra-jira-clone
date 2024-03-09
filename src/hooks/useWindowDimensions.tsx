import { useCallback, useEffect, useState } from "react"

function useWindowDimensions() {
    const hasWindow = typeof window !== "undefined"

    const getWindowDimensions = useCallback(() => {
        const width = hasWindow ? window.innerWidth : null
        const height = hasWindow ? window.innerHeight : null
        return {
            width,
            height,
        }
    }, [hasWindow])

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    )

    const isDesktop = windowDimensions?.width !== null ? windowDimensions?.width >= 640 : true;

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions())
            }

            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [getWindowDimensions, hasWindow])

    return { windowDimensions, isDesktop }
}

export { useWindowDimensions };
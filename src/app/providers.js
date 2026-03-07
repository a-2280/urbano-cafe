"use client"

import ReactLenis from "lenis/react"
import { usePathname } from "next/navigation"

const SCROLL_OPTIONS = {
    duration: 1.2,
    orientation: "vertical",
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
}

export default function Providers({ children }) {
    const pathname = usePathname()

    if (pathname?.startsWith("/studio")) {
        return children
    }

    return (
        <ReactLenis root options={SCROLL_OPTIONS}>
            {children}
        </ReactLenis>
    )
}

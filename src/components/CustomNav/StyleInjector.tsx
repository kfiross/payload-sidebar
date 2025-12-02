'use client'

import { useLayoutEffect, useState } from 'react'
// @ts-expect-error - css-text returns string
import styles from './styles.scss'

const STYLE_ID = 'payload-sidebar-plugin-styles'

// Critical inline styles to prevent FOUC (Flash of Unstyled Content)
// These styles hide the nav until full CSS is loaded
const CRITICAL_STYLES = `
.nav:not(.nav--styles-ready) {
  visibility: hidden !important;
}
.nav.nav--styles-ready {
  visibility: visible;
}
`

/**
 * Injects plugin styles into the document head on client-side only
 * Uses useLayoutEffect to inject styles before browser paint
 * This prevents SSR errors and reduces visual glitches
 */
export function StyleInjector({ onReady }: { onReady?: () => void }) {
  const [injected, setInjected] = useState(false)

  // Use useLayoutEffect to inject styles before paint
  useLayoutEffect(() => {
    // Check if styles already injected
    if (document.getElementById(STYLE_ID)) {
      setInjected(true)
      onReady?.()
      return
    }

    // Inject critical styles first (inline in head for immediate effect)
    const criticalStyleElement = document.createElement('style')
    criticalStyleElement.id = `${STYLE_ID}-critical`
    criticalStyleElement.textContent = CRITICAL_STYLES
    document.head.insertBefore(criticalStyleElement, document.head.firstChild)

    // Create and inject main style element
    const styleElement = document.createElement('style')
    styleElement.id = STYLE_ID
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    // Mark as ready after a microtask to ensure styles are applied
    queueMicrotask(() => {
      setInjected(true)
      onReady?.()
    })

    // Cleanup on unmount
    return () => {
      const el = document.getElementById(STYLE_ID)
      const criticalEl = document.getElementById(`${STYLE_ID}-critical`)
      if (el) el.remove()
      if (criticalEl) criticalEl.remove()
    }
  }, [onReady])

  return injected ? null : null
}

'use client'

import { useEffect } from 'react'
// @ts-expect-error - css-text returns string
import styles from './styles.scss'

const STYLE_ID = 'payload-sidebar-plugin-styles'

/**
 * Injects plugin styles into the document head on client-side only
 * This prevents SSR errors with document not defined
 */
export function StyleInjector() {
  useEffect(() => {
    // Check if styles already injected
    if (document.getElementById(STYLE_ID)) {
      return
    }

    // Create and inject style element
    const styleElement = document.createElement('style')
    styleElement.id = STYLE_ID
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    // Cleanup on unmount
    return () => {
      const el = document.getElementById(STYLE_ID)
      if (el) {
        el.remove()
      }
    }
  }, [])

  return null
}

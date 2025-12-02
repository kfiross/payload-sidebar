'use client'

import { useNav } from '@payloadcms/ui'
import React from 'react'

import './styles.scss'

// Extend HTMLAttributes to include inert
declare module 'react' {
  interface HTMLAttributes<T> {
    inert?: boolean | ''
  }
}

/**
 * Client wrapper for Custom Nav - handles nav open/close state and animations
 */
export const NavClientWrapper: React.FC<{
  classPrefix?: string
  children: React.ReactNode
}> = (props) => {
  const { classPrefix = 'nav', children } = props

  const { hydrated, navOpen, navRef, shouldAnimate } = useNav()

  return (
    <aside
      className={[
        classPrefix,
        navOpen && `${classPrefix}--nav-open`,
        shouldAnimate && `${classPrefix}--nav-animate`,
        hydrated && `${classPrefix}--nav-hydrated`,
      ]
        .filter(Boolean)
        .join(' ')}
      inert={!navOpen ? '' : undefined}
    >
      <div className={`${classPrefix}__scroll`} ref={navRef}>
        {children}
      </div>
    </aside>
  )
}

'use client'

import React, { Suspense, useMemo, memo } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import type { LucideProps } from 'lucide-react'

// Get all valid icon names from lucide
type IconName = keyof typeof dynamicIconImports

interface DynamicIconProps extends LucideProps {
  name: string
  fallback?: React.ReactNode
}

// Cache for lazy-loaded icon components
const iconCache = new Map<string, React.LazyExoticComponent<React.ComponentType<LucideProps>>>()

/**
 * Get or create a lazy-loaded icon component
 */
function getIconComponent(name: string): React.LazyExoticComponent<React.ComponentType<LucideProps>> | null {
  // Check cache first
  if (iconCache.has(name)) {
    return iconCache.get(name)!
  }

  // Validate icon name exists
  if (!(name in dynamicIconImports)) {
    return null
  }

  // Create lazy component
  const LazyIcon = React.lazy(dynamicIconImports[name as IconName])
  iconCache.set(name, LazyIcon)
  return LazyIcon
}

/**
 * Fallback icon when loading or icon not found
 */
const FallbackIcon: React.FC<LucideProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
)

/**
 * DynamicIcon - Renders any Lucide icon by name with lazy loading
 *
 * @example
 * <DynamicIcon name="file" size={18} />
 * <DynamicIcon name="users-round" className="icon" />
 */
export const DynamicIcon = memo<DynamicIconProps>(function DynamicIcon({
  name,
  fallback,
  ...props
}) {
  const IconComponent = useMemo(() => getIconComponent(name), [name])

  if (!IconComponent) {
    // Icon not found, render fallback
    if (fallback) {
      return <>{fallback}</>
    }
    return <FallbackIcon {...props} />
  }

  return (
    <Suspense fallback={fallback ?? <FallbackIcon {...props} />}>
      <IconComponent {...props} />
    </Suspense>
  )
})

export type { IconName }

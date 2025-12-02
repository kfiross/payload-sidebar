'use client'

import { useMemo } from 'react'
import { useBadgeContext } from '../components/NavContext'
import type { BadgeValue, ResolvedBadge, BadgeColor } from '../types'

/**
 * Resolve a badge value to a normalized format with color
 */
function resolveBadgeValue(value: BadgeValue | undefined): ResolvedBadge | null {
  if (value === undefined || value === null) return null

  if (typeof value === 'number') {
    return value > 0 ? { count: value, color: 'red' } : null
  }

  return value.count > 0 ? { count: value.count, color: value.color ?? 'red' } : null
}

/**
 * Hook to get badge for a specific slug
 *
 * @param slug - The collection or global slug
 * @returns Resolved badge with count and color, or null if no badge
 *
 * @example
 * ```tsx
 * const badge = useBadge('chat-dashboard')
 * // badge = { count: 5, color: 'red' } or null
 * ```
 */
export function useBadge(slug: string): ResolvedBadge | null {
  const badges = useBadgeContext()

  return useMemo(() => {
    const badgeValue = badges[slug]
    return resolveBadgeValue(badgeValue)
  }, [badges, slug])
}

/**
 * Hook to get all badges as resolved format
 *
 * @returns Map of slug to resolved badge
 */
export function useAllBadges(): Record<string, ResolvedBadge> {
  const badges = useBadgeContext()

  return useMemo(() => {
    const resolved: Record<string, ResolvedBadge> = {}

    for (const [slug, value] of Object.entries(badges)) {
      const badge = resolveBadgeValue(value)
      if (badge) {
        resolved[slug] = badge
      }
    }

    return resolved
  }, [badges])
}

/**
 * Get CSS class for badge color
 */
export function getBadgeColorClass(color: BadgeColor, classPrefix = 'nav'): string {
  return `${classPrefix}__link-badge--${color}`
}

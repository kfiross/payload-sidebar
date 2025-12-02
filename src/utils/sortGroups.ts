import type { NavGroup } from '../types'

/**
 * Sort navigation groups according to priority order
 *
 * @param groups - Array of navigation groups to sort
 * @param groupOrder - Map of group labels to priority numbers (lower = higher priority)
 * @returns Sorted array of groups
 */
export function sortGroups(groups: NavGroup[], groupOrder: Record<string, number>): NavGroup[] {
  return [...groups].sort((a, b) => {
    const orderA = groupOrder[a.label] ?? 50
    const orderB = groupOrder[b.label] ?? 50
    return orderA - orderB
  })
}

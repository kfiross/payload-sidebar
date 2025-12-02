'use client'

import React from 'react'
import { NavGroup } from '@payloadcms/ui'
import { formatAdminURL } from '@payloadcms/ui/shared'
import { NavLink } from './NavLink'
import { PinnedSection } from './PinnedSection'
import { usePinnedNav } from '../../hooks/usePinnedNav'
import { useNavConfig } from '../NavContext'
import type { NavEntity, NavGroup as NavGroupType } from '../../types'

interface NavGroupData {
  label: string
  entities: NavEntity[]
}

interface NavContentProps {
  groups: NavGroupData[]
  adminRoute: string
  navPreferences: { groups?: Record<string, { open?: boolean }> } | null
}

export const NavContent: React.FC<NavContentProps> = ({ groups, adminRoute, navPreferences }) => {
  const { pinnedItems, isPinned, togglePin, unpinItem, loading } = usePinnedNav()
  const { classPrefix, enablePinning } = useNavConfig()

  // Build pinned items with labels and hrefs
  const pinnedNavItems = React.useMemo(() => {
    return pinnedItems
      .map((item) => {
        // Find the entity in groups to get its label
        for (const group of groups) {
          const entity = group.entities.find((e) => e.slug === item.slug && e.type === item.type)
          if (entity) {
            const href =
              item.type === 'collection'
                ? formatAdminURL({ adminRoute, path: `/collections/${item.slug}` })
                : formatAdminURL({ adminRoute, path: `/globals/${item.slug}` })
            return {
              ...item,
              label: entity.label,
              href,
            }
          }
        }
        return null
      })
      .filter(Boolean) as Array<{
      slug: string
      type: 'collection' | 'global'
      order: number
      label: string
      href: string
    }>
  }, [pinnedItems, groups, adminRoute])

  return (
    <>
      {/* Dashboard Link */}
      <NavLink href={formatAdminURL({ adminRoute, path: '' })} id="nav-dashboard" slug="dashboard">
        Dashboard
      </NavLink>

      {/* Pinned Section */}
      {enablePinning && !loading && pinnedNavItems.length > 0 && (
        <PinnedSection items={pinnedNavItems} onUnpin={unpinItem} />
      )}

      {/* Sorted Navigation Groups */}
      {groups.map(({ entities, label }, groupIndex) => (
        <NavGroup isOpen={navPreferences?.groups?.[label]?.open} key={groupIndex} label={label}>
          {entities.map(({ slug, type, label: entityLabel }, entityIndex) => {
            const href =
              type === 'collection'
                ? formatAdminURL({ adminRoute, path: `/collections/${slug}` })
                : formatAdminURL({ adminRoute, path: `/globals/${slug}` })

            const id = type === 'collection' ? `nav-${slug}` : `nav-global-${slug}`
            const pinned = isPinned(slug, type)

            return (
              <NavLink
                href={href}
                id={id}
                key={entityIndex}
                slug={slug}
                type={type}
                isPinned={pinned}
                onTogglePin={enablePinning ? () => togglePin(slug, type) : undefined}
              >
                <span className={`${classPrefix}__link-label`}>{entityLabel}</span>
              </NavLink>
            )
          })}
        </NavGroup>
      ))}
    </>
  )
}

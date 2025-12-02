'use client'

import React from 'react'
import { Pin, X, File } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavConfig } from '../NavContext'
import { useBadge, getBadgeColorClass } from '../../hooks/useBadge'
import type { PinnedItem } from '../../types'

interface PinnedNavItem extends PinnedItem {
  label: string
  href: string
}

interface PinnedSectionProps {
  items: PinnedNavItem[]
  onUnpin: (slug: string, type: string) => void
}

export const PinnedSection: React.FC<PinnedSectionProps> = ({ items, onUnpin }) => {
  const pathname = usePathname()
  const { icons, classPrefix } = useNavConfig()

  if (items.length === 0) return null

  return (
    <div className={`${classPrefix}__pinned-section`}>
      <div className={`${classPrefix}__pinned-header`}>
        <Pin size={12} />
        <span>Pinned</span>
      </div>
      <div className={`${classPrefix}__pinned-items`}>
        {items.map((item) => {
          const Icon = icons[item.slug] || File
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const badge = useBadge(item.slug)

          return (
            <div key={`${item.type}-${item.slug}`} className={`${classPrefix}__pinned-item`}>
              <Link
                href={item.href}
                className={`${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ''}`}
                id={`nav-pinned-${item.slug}`}
              >
                <Icon className={`${classPrefix}__link-icon`} size={18} />
                <span className={`${classPrefix}__link-label`}>{item.label}</span>
                {badge && (
                  <span
                    className={`${classPrefix}__link-badge ${getBadgeColorClass(badge.color, classPrefix)}`}
                  >
                    {badge.count > 99 ? '99+' : badge.count}
                  </span>
                )}
              </Link>
              <button
                className={`${classPrefix}__unpin-btn`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onUnpin(item.slug, item.type)
                }}
                title="Unpin"
                type="button"
              >
                <X size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

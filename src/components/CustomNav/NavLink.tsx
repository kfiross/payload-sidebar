'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { Pin, Check, File } from 'lucide-react'
import { useNavConfig } from '../NavContext'
import { useBadge, getBadgeColorClass } from '../../hooks/useBadge'

interface NavLinkProps {
  href: string
  id: string
  slug?: string
  type?: 'collection' | 'global'
  children: React.ReactNode
  isPinned?: boolean
  onTogglePin?: () => void
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  id,
  slug,
  type: _type,
  children,
  isPinned = false,
  onTogglePin,
}) => {
  const pathname = usePathname()
  const { icons, classPrefix, enablePinning } = useNavConfig()
  const badge = useBadge(slug || '')

  // Check if current path matches or starts with this link's href
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  // Get slug from id (nav-{slug} or nav-global-{slug})
  const extractedSlug = slug || id.replace('nav-global-', '').replace('nav-', '')
  const Icon = icons[extractedSlug] || File

  return (
    <div className={`${classPrefix}__link-wrapper`}>
      <Link
        className={`${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ''}`}
        href={href}
        id={id}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className={`${classPrefix}__link-icon`} size={18} />
        {children}
        {badge && (
          <span
            className={`${classPrefix}__link-badge ${getBadgeColorClass(badge.color, classPrefix)}`}
          >
            {badge.count > 99 ? '99+' : badge.count}
          </span>
        )}
      </Link>
      {enablePinning && onTogglePin && (
        <button
          className={`${classPrefix}__pin-btn${isPinned ? ` ${classPrefix}__pin-btn--pinned` : ''}`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onTogglePin()
          }}
          title={isPinned ? 'Pinned' : 'Pin to top'}
          type="button"
        >
          {isPinned ? <Check size={14} /> : <Pin size={14} />}
        </button>
      )}
    </div>
  )
}

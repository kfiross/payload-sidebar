import type { LucideIcon } from 'lucide-react'

// ============================================================================
// Badge Types
// ============================================================================

/**
 * Supported badge colors
 */
export type BadgeColor = 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'gray'

/**
 * Badge configuration with count and optional color
 */
export interface BadgeConfig {
  count: number
  color?: BadgeColor // default: 'red'
}

/**
 * Badge value - either a simple number (defaults to red) or full config
 */
export type BadgeValue = number | BadgeConfig

/**
 * Resolved badge with required color
 */
export interface ResolvedBadge {
  count: number
  color: BadgeColor
}

// ============================================================================
// Pinned Item Types
// ============================================================================

/**
 * Pinned navigation item
 */
export interface PinnedItem {
  slug: string
  type: 'collection' | 'global'
  order: number
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Navigation entity (collection or global)
 */
export interface NavEntity {
  slug: string
  type: 'collection' | 'global'
  label: string
}

/**
 * Navigation group containing entities
 */
export interface NavGroup {
  label: string
  entities: NavEntity[]
}

// ============================================================================
// Plugin Options
// ============================================================================

/**
 * Icon component type - Lucide icon or custom component
 */
export type IconComponent = LucideIcon | React.ComponentType<{ size?: number; className?: string }>

/**
 * Main plugin configuration options
 */
export interface PayloadSidebarOptions {
  /**
   * Thứ tự sắp xếp groups
   * Key: label của group (hỗ trợ i18n)
   * Value: số thứ tự (nhỏ = ưu tiên cao)
   * @example { 'Content': 1, 'Users': 2, 'Settings': 3 }
   */
  groupOrder?: Record<string, number>

  /**
   * Custom icons cho collections/globals
   * Merge với default icons
   * @example { 'my-collection': MyIcon }
   */
  icons?: Record<string, IconComponent>

  /**
   * Bật/tắt tính năng pin items
   * @default true
   */
  enablePinning?: boolean

  /**
   * Cách lưu trữ pinned items
   * - 'preferences': Lưu trong Payload preferences (per-user, persist)
   * - 'localStorage': Lưu local (per-browser, không sync)
   * @default 'preferences'
   */
  pinnedStorage?: 'preferences' | 'localStorage'

  /**
   * Custom class prefix cho CSS
   * @default 'nav'
   */
  classPrefix?: string

  /**
   * Override CSS variables
   * @example { '--badge-red': '#ff0000' }
   */
  cssVariables?: Record<string, string>

  /**
   * Callback khi user pin/unpin item
   */
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}

/**
 * Resolved plugin options with all defaults applied
 */
export interface ResolvedPluginOptions {
  groupOrder: Record<string, number>
  icons: Record<string, IconComponent>
  enablePinning: boolean
  pinnedStorage: 'preferences' | 'localStorage'
  classPrefix: string
  cssVariables: Record<string, string>
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}

// ============================================================================
// Context Types
// ============================================================================

/**
 * Badge context value - map of slug to badge value
 */
export type BadgeContextValue = Record<string, BadgeValue>

/**
 * Nav config context value passed to components
 */
export interface NavConfigContextValue {
  icons: Record<string, IconComponent>
  classPrefix: string
  enablePinning: boolean
  pinnedStorage: 'preferences' | 'localStorage'
  cssVariables: Record<string, string>
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}

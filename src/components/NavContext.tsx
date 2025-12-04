'use client'

import React, { createContext, useContext } from 'react'
import type { NavConfigContextValue, BadgeContextValue } from '../types'
import { DEFAULT_ICONS, DEFAULT_BADGE_COLORS } from '../defaults'
import type { IconComponent } from './DynamicIcon'

// ============================================================================
// Nav Config Context - for plugin configuration
// ============================================================================

const NavConfigContext = createContext<NavConfigContextValue | null>(null)

/**
 * Hook to access sidebar plugin configuration
 */
export const useNavConfig = (): NavConfigContextValue => {
  const ctx = useContext(NavConfigContext)
  if (!ctx) {
    // Return defaults if no provider (for backwards compatibility)
    return {
      icons: DEFAULT_ICONS, // Now returns Record<string, string>
      classPrefix: 'nav',
      enablePinning: true,
      pinnedStorage: 'preferences',
      cssVariables: DEFAULT_BADGE_COLORS,
      customLinks: [],
    }
  }
  return ctx
}

/**
 * Provider for sidebar configuration
 */
export const NavConfigProvider: React.FC<{
  children: React.ReactNode
  config: NavConfigContextValue
}> = ({ children, config }) => {
  return <NavConfigContext.Provider value={config}>{children}</NavConfigContext.Provider>
}

// ============================================================================
// Custom Icon Context - for extending icons beyond the default set
// ============================================================================

const CustomIconContext = createContext<Record<string, IconComponent>>({})

/**
 * Hook to access custom icons registered by the app
 */
export const useCustomIcons = (): Record<string, IconComponent> => {
  return useContext(CustomIconContext)
}

/**
 * Provider for custom icons beyond the default ~100 icons.
 * Use this when you need Lucide icons that aren't in the pre-defined set.
 *
 * @example
 * ```tsx
 * import { Newspaper, Trophy, Gamepad2 } from 'lucide-react'
 * import { SidebarIconProvider } from 'payload-sidebar-plugin/components'
 *
 * function MyIconProvider({ children }) {
 *   const customIcons = {
 *     'newspaper': Newspaper,
 *     'trophy': Trophy,
 *     'gamepad-2': Gamepad2,
 *   }
 *   return (
 *     <SidebarIconProvider icons={customIcons}>
 *       {children}
 *     </SidebarIconProvider>
 *   )
 * }
 * ```
 */
export const SidebarIconProvider: React.FC<{
  children: React.ReactNode
  icons: Record<string, IconComponent>
}> = ({ children, icons }) => {
  return <CustomIconContext.Provider value={icons}>{children}</CustomIconContext.Provider>
}

// ============================================================================
// Badge Context - for dynamic badge values
// ============================================================================

const BadgeContext = createContext<BadgeContextValue>({})

/**
 * Hook to access all badge values
 */
export const useBadgeContext = (): BadgeContextValue => {
  return useContext(BadgeContext)
}

/**
 * Provider for dynamic badge values
 * This should be used by the app to inject notification counts, etc.
 *
 * @example
 * ```tsx
 * function MyBadgeProvider({ children }) {
 *   const { unreadChats } = useNotifications()
 *   return (
 *     <SidebarBadgeProvider badges={{ 'chat-dashboard': { count: unreadChats, color: 'red' } }}>
 *       {children}
 *     </SidebarBadgeProvider>
 *   )
 * }
 * ```
 */
export const SidebarBadgeProvider: React.FC<{
  children: React.ReactNode
  badges: BadgeContextValue
}> = ({ children, badges }) => {
  return <BadgeContext.Provider value={badges}>{children}</BadgeContext.Provider>
}

// Export context for advanced use cases
export { BadgeContext, NavConfigContext, CustomIconContext }

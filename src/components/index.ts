// Client Components only - do NOT import CustomNav here (it's a server component)
// For CustomNav, import from 'payload-sidebar-plugin/rsc'
export { CustomNavClient } from './CustomNav/index.client'
export { NavContent } from './CustomNav/NavContent'
export { NavLink } from './CustomNav/NavLink'
export { PinnedSection } from './CustomNav/PinnedSection'

// Context & Providers
export {
  NavConfigProvider,
  SidebarBadgeProvider,
  SidebarIconProvider,
  useNavConfig,
  useBadgeContext,
  useCustomIcons,
  NavConfigContext,
  BadgeContext,
  CustomIconContext,
} from './NavContext'

// Icon utilities
export { DynamicIcon, DEFAULT_ICON_MAP } from './DynamicIcon'
export type { IconComponent, IconName } from './DynamicIcon'

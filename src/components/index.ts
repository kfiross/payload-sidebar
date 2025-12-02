// Client Components only - do NOT import CustomNav here (it's a server component)
// For CustomNav, import from 'payload-sidebar-plugin/rsc'
export { CustomNavClient } from './CustomNav/index.client'
export { NavContent } from './CustomNav/NavContent'
export { NavLink } from './CustomNav/NavLink'
export { PinnedSection } from './CustomNav/PinnedSection'

// Context
export {
  NavConfigProvider,
  SidebarBadgeProvider,
  useNavConfig,
  useBadgeContext,
  NavConfigContext,
  BadgeContext,
} from './NavContext'

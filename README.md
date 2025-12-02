# @kari/payload-sidebar

A customizable navigation sidebar plugin for Payload CMS 3.x with:

- 📁 **Sortable navigation groups** - Define custom order for your nav groups
- 🎨 **Custom icons** - Use Lucide icons or your own components
- 📌 **Pin items** - Pin frequently used items to the top
- 🔔 **Multi-color badges** - Show notification counts with different colors

## Installation

```bash
pnpm add @kari/payload-sidebar
# or
npm install @kari/payload-sidebar
```

## Basic Usage

```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { payloadSidebar } from '@kari/payload-sidebar'

export default buildConfig({
  plugins: [
    payloadSidebar({
      groupOrder: {
        'Content': 1,
        'Users': 2,
        'Settings': 3,
      },
    }),
  ],
  // ... rest of config
})
```

## Configuration Options

```typescript
interface PayloadSidebarOptions {
  // Sort order for navigation groups (lower = higher priority)
  groupOrder?: Record<string, number>

  // Custom icons for collections/globals
  icons?: Record<string, LucideIcon | React.ComponentType>

  // Enable pin functionality (default: true)
  enablePinning?: boolean

  // Storage for pinned items: 'preferences' (server) or 'localStorage'
  pinnedStorage?: 'preferences' | 'localStorage'

  // CSS class prefix (default: 'nav')
  classPrefix?: string

  // Override CSS variables
  cssVariables?: Record<string, string>

  // Callback when item is pinned/unpinned
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}
```

## Adding Badges

Badges are managed separately from the plugin to allow flexibility. Use the `SidebarBadgeProvider`:

```tsx
// src/components/SidebarBadgeProvider.tsx
'use client'

import { SidebarBadgeProvider } from '@kari/payload-sidebar'
import { useNotifications } from '@/providers/NotificationProvider'

export function MyBadgeProvider({ children }: { children: React.ReactNode }) {
  const { unreadChats, unreadComments } = useNotifications()

  return (
    <SidebarBadgeProvider
      badges={{
        'chat-dashboard': { count: unreadChats, color: 'red' },
        'comments-dashboard': { count: unreadComments, color: 'blue' },
        'posts': { count: 3, color: 'yellow' }, // Static badge
      }}
    >
      {children}
    </SidebarBadgeProvider>
  )
}
```

### Badge Colors

| Color | Use Case |
|-------|----------|
| `red` | Urgent, unread, errors |
| `yellow` | Warning, drafts, pending review |
| `blue` | Info, notifications |
| `green` | Success, new, approved |
| `orange` | Pending, in-progress |
| `gray` | Neutral, archived |

## Custom Icons

```typescript
import { Heart, Star } from 'lucide-react'

payloadSidebar({
  icons: {
    'my-collection': Heart,
    'favorites': Star,
  },
})
```

## Group Order

Supports both English and Vietnamese labels:

```typescript
payloadSidebar({
  groupOrder: {
    // English
    'Content': 1,
    'Users': 2,
    'Settings': 3,

    // Vietnamese
    'Nội dung': 1,
    'Người dùng': 2,
    'Cài đặt': 3,

    // Always last
    'Advanced': 99,
  },
})
```

## Pinning

By default, pinning is enabled and uses Payload preferences (persisted per-user).

To use localStorage instead:

```typescript
payloadSidebar({
  pinnedStorage: 'localStorage',
})
```

To disable pinning:

```typescript
payloadSidebar({
  enablePinning: false,
})
```

## API Routes Required

If using `pinnedStorage: 'preferences'`, you need these API routes:

- `GET /api/nav/pinned` - Get pinned items
- `POST /api/nav/pin` - Pin an item
- `POST /api/nav/unpin` - Unpin an item
- `POST /api/nav/reorder` - Reorder pinned items

See the example implementation in the source code.

## License

MIT

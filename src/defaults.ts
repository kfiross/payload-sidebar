// ============================================================================
// Default Group Order
// ============================================================================

/**
 * Default group ordering priority
 * Lower number = higher priority (appears first)
 */
export const DEFAULT_GROUP_ORDER: Record<string, number> = {
  // Vietnamese
  'Nội dung': 1,
  'Người dùng': 2,
  'Bố cục': 3,
  'Cài đặt': 4,
  'Chat & AI': 5,
  CRM: 6,
  'Giao diện': 7,
  'Công cụ': 8,
  'Nâng cao': 99, // Always last

  // English
  Content: 1,
  Users: 2,
  Layout: 3,
  Settings: 4,
  Appearance: 7,
  Tools: 8,
  Advanced: 99, // Always last

  // Default Payload groups
  collections: 1,
  globals: 2,
}

// ============================================================================
// Default Icons (using Lucide icon names in kebab-case)
// ============================================================================

/**
 * Default icon name mapping for common collections and globals
 * Uses Lucide icon names: https://lucide.dev/icons
 */
export const DEFAULT_ICONS: Record<string, string> = {
  // ===== DASHBOARD =====
  dashboard: 'layout-dashboard',

  // ===== COLLECTIONS =====

  // Content
  pages: 'file-text',
  posts: 'newspaper',
  media: 'image',
  files: 'file',
  categories: 'folder-open',
  tags: 'tag',
  badges: 'award',

  // Users
  users: 'users',

  // Chat & Messages
  chats: 'message-square',
  messages: 'send',
  'knowledge-base': 'book-open',

  // Comments
  comments: 'message-circle',

  // CRM
  contacts: 'contact',
  'contact-fields': 'database',
  'contact-notes': 'sticky-note',
  leads: 'target',
  deals: 'briefcase',
  tickets: 'ticket',
  activities: 'activity',
  'customer-feedback': 'thumbs-up',
  'customer-interests': 'heart',

  // ===== GLOBALS =====

  // Layout
  header: 'menu',
  footer: 'layout-template',

  // Analytics & Dashboard
  'analytics-settings': 'bar-chart-3',
  'chat-dashboard': 'layout-dashboard',
  'crm-dashboard': 'layout-dashboard',
  'comments-dashboard': 'layout-dashboard',

  // Settings
  settings: 'settings',
  'chat-config': 'message-square',
  'ai-config': 'bot',
  'posts-page-settings': 'newspaper',

  // Appearance
  'theme-settings': 'palette',

  // Tools
  'wordpress-import': 'file-down',
  'company-info': 'building-2',
  'image-optimizer': 'image-plus',
  'floating-action-button': 'mouse-pointer-click',

  // Search & Navigation
  search: 'search',
  redirects: 'arrow-right-left',

  // Form
  'form-submissions': 'database',

  // Advanced / Fallback
  advanced: 'wrench',

  // ===== CUSTOM LINKS =====
  // Default icons for custom links
  link: 'link',
  'external-link': 'external-link',
  external: 'external-link',
  globe: 'globe',
  sparkles: 'sparkles',
  zap: 'zap',
  star: 'star',
  folder: 'folder',
  'file-code': 'file-code',
  terminal: 'terminal',
  help: 'help-circle',
  info: 'info',
  docs: 'book-marked',
  documentation: 'book-marked',
  api: 'terminal',
  custom: 'sparkles',

  // Common social/dev icons
  github: 'github',
  rocket: 'rocket',
  chart: 'bar-chart-3',
  book: 'book-open',
}

// ============================================================================
// Badge Color CSS Variables
// ============================================================================

/**
 * Default CSS variables for badge colors
 */
export const DEFAULT_BADGE_COLORS: Record<string, string> = {
  '--badge-red-bg': 'var(--theme-error-500, #ef4444)',
  '--badge-red-text': '#ffffff',

  '--badge-yellow-bg': 'var(--theme-warning-500, #eab308)',
  '--badge-yellow-text': '#000000',

  '--badge-blue-bg': 'var(--theme-elevation-500, #3b82f6)',
  '--badge-blue-text': '#ffffff',

  '--badge-green-bg': 'var(--theme-success-500, #22c55e)',
  '--badge-green-text': '#ffffff',

  '--badge-orange-bg': '#f97316',
  '--badge-orange-text': '#ffffff',

  '--badge-gray-bg': 'var(--theme-elevation-300, #6b7280)',
  '--badge-gray-text': '#ffffff',
}

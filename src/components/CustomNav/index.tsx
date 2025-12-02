import type { EntityToGroup, NavGroupType } from '@payloadcms/ui/shared'
import type { PayloadRequest, ServerProps } from 'payload'

import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { EntityType, groupNavItems } from '@payloadcms/ui/shared'
import { getTranslation } from '@payloadcms/translations'
import React from 'react'

// Import client component using package path to ensure proper bundling
// This path will be resolved by the consuming bundler (Next.js)
import { CustomNavClient } from 'payload-sidebar-plugin/components'
import { sortGroups } from '../../utils/sortGroups'
import { DEFAULT_GROUP_ORDER, DEFAULT_BADGE_COLORS } from '../../defaults'
import { getPluginOptions } from '../../plugin/index'

export type CustomNavProps = {
  req?: PayloadRequest
} & ServerProps

async function getNavPrefs(
  req?: PayloadRequest,
): Promise<{ groups?: Record<string, { open?: boolean }> } | null> {
  if (!req?.user) return null

  try {
    const preferences = await req.payload.find({
      collection: 'payload-preferences',
      where: {
        key: { equals: 'nav' },
        'user.relationTo': { equals: 'users' },
        'user.value': { equals: req.user.id },
      },
      limit: 1,
      depth: 0,
    })

    return (preferences.docs[0]?.value as { groups?: Record<string, { open?: boolean }> }) || null
  } catch {
    return null
  }
}

export async function CustomNav(props: CustomNavProps): Promise<React.ReactElement | null> {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    req,
    searchParams,
    user,
    viewType,
    visibleEntities,
  } = props

  // Get plugin options from global storage
  const pluginOptions = getPluginOptions()

  if (!payload?.config) {
    return null
  }

  // Merge plugin options with defaults
  const groupOrder = { ...DEFAULT_GROUP_ORDER, ...pluginOptions.groupOrder }
  const classPrefix = pluginOptions.classPrefix ?? 'nav'
  const enablePinning = pluginOptions.enablePinning ?? true
  const pinnedStorage = pluginOptions.pinnedStorage ?? 'preferences'
  const cssVariables = { ...DEFAULT_BADGE_COLORS, ...pluginOptions.cssVariables }

  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks, logout },
    },
    routes: { admin: adminRoute },
    collections,
    globals,
  } = payload.config

  // Group nav items
  const groups = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visibleEntities?.collections?.includes(slug))
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter(({ slug }) => visibleEntities?.globals?.includes(slug))
        .map(
          (global) =>
            ({
              type: EntityType.global,
              entity: global,
            }) satisfies EntityToGroup,
        ),
    ],
    permissions!,
    i18n,
  )

  // Sort groups according to our priority - convert to serializable format
  const sortedGroups = sortGroups(
    groups.map((g) => ({
      label: g.label,
      entities: g.entities.map((e) => ({
        slug: e.slug,
        type: e.type === EntityType.collection ? ('collection' as const) : ('global' as const),
        label: typeof e.label === 'string' ? e.label : getTranslation(e.label, i18n),
      })),
    })),
    groupOrder,
  )

  const navPreferences = await getNavPrefs(req)

  // Serializable config for client components (no functions, no React components)
  const navConfig = {
    classPrefix,
    enablePinning,
    pinnedStorage,
    cssVariables,
  }

  const LogoutComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const BeforeNavLinksComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: beforeNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const AfterNavLinksComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: afterNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  return (
    <CustomNavClient
      classPrefix={classPrefix}
      groups={sortedGroups}
      adminRoute={adminRoute}
      navPreferences={navPreferences}
      navConfig={navConfig}
      beforeNavLinks={BeforeNavLinksComponent as React.ReactElement}
      afterNavLinks={AfterNavLinksComponent as React.ReactElement}
      logoutComponent={LogoutComponent as React.ReactElement}
    />
  )
}

export default CustomNav

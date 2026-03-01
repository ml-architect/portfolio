import type { RouteLocationRaw } from 'vue-router'

export interface NavLink {
  label: string
  to: RouteLocationRaw
  key?: string
}

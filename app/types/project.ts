import type { ParsedContent } from '@nuxt/content'

export interface ProjectContent extends ParsedContent {
  title: string
  description: string
  category: 'commercial' | 'research'
  tags: string[]
  date: string
  role: string
  team?: string
  client?: string
  clientUrl?: string
  featured?: boolean
}

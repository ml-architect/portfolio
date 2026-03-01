import type { NavLink } from '~/types/navigation'

export function useNavigation() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const navLinks = computed<NavLink[]>(() => [
    { label: t('nav.home'), to: localePath('/'), key: 'home' },
    { label: t('nav.projects'), to: localePath('/projects'), key: 'projects' },
    { label: t('nav.blog'), to: localePath('/blog'), key: 'blog' },
    { label: t('nav.about'), to: localePath('/about'), key: 'about' },
  ])

  function isActive(to: string | object): boolean {
    const path = typeof to === 'string' ? to : (to as { path: string }).path ?? ''
    if (path === localePath('/')) {
      return route.path === path
    }
    return route.path === path || route.path.startsWith(path + '/')
  }

  return { navLinks, isActive }
}

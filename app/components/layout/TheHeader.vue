<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const { data: projectCount } = await useAsyncData(
  `project-count-${locale.value}`,
  () => queryContent('/projects')
    .where({ _locale: locale.value })
    .count(),
  { watch: [locale] }
)

const navLinks = computed(() => [
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

function onScroll(): void {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(isMobileMenuOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-black/80 backdrop-blur-xl'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="text-lg font-bold text-white hover:opacity-80 transition-opacity duration-200 tracking-tight shrink-0"
        >
          ML Architect<sup class="text-xs font-normal ml-0.5 align-super">&reg;</sup>
        </NuxtLink>

        <!-- Desktop Navigation (pill container) -->
        <nav class="hidden md:flex items-center bg-[#141414] rounded-full px-1.5 py-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            :class="[
              'relative flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
              isActive(link.to)
                ? 'text-white'
                : 'text-[#545454] hover:text-white/70',
            ]"
          >
            {{ link.label }}
            <span
              v-if="link.key === 'projects' && projectCount"
              class="bg-green-400 text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
            >
              {{ projectCount }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Right section: Language Switcher + Mobile Hamburger -->
        <div class="flex items-center gap-3 shrink-0">
          <LayoutLanguageSwitcher class="hidden md:flex" />

          <!-- Mobile hamburger button -->
          <button
            type="button"
            class="flex md:hidden items-center justify-center w-10 h-10 rounded-full text-[#545454] hover:text-white hover:bg-[#141414] transition-colors duration-200"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Icon
              :name="isMobileMenuOpen ? 'ph:x' : 'ph:list'"
              size="24"
            />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <LayoutTheMobileMenu
    v-model="isMobileMenuOpen"
    :links="navLinks"
  />
</template>

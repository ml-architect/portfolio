<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = computed(() => [
  { label: t('nav.projects'), to: localePath('/projects') },
  { label: t('nav.blog'), to: localePath('/blog') },
  { label: t('nav.about'), to: localePath('/about') },
])

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
        ? 'bg-surface-900/80 backdrop-blur-xl border-b border-surface-700'
        : 'bg-transparent border-b border-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Site Name -->
        <NuxtLink
          :to="localePath('/')"
          class="text-lg font-bold text-[#F0F0F8] hover:text-primary-400 transition-colors duration-200 tracking-tight"
        >
          ML Architect
        </NuxtLink>

        <!-- Desktop Navigation (center) -->
        <div class="hidden md:flex flex-1 justify-center">
          <LayoutTheNavigation :links="navLinks" />
        </div>

        <!-- Right section: Language Switcher + Mobile Hamburger -->
        <div class="flex items-center gap-3">
          <LayoutLanguageSwitcher class="hidden md:flex" />

          <!-- Mobile hamburger button -->
          <button
            type="button"
            class="flex md:hidden items-center justify-center w-10 h-10 rounded-button text-[#A0A3BD] hover:text-[#F0F0F8] hover:bg-surface-800 transition-colors duration-200"
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

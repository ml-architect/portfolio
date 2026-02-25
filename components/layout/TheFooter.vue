<script setup lang="ts">
const { t } = useI18n()

const currentYear = new Date().getFullYear()

interface SocialLink {
  icon: string
  href: string
  label: string
}

const socialLinks: SocialLink[] = [
  {
    icon: 'mdi:github',
    href: 'https://github.com/ml-architect',
    label: 'GitHub',
  },
  {
    icon: 'mdi:telegram',
    href: 'https://t.me/ml_architect',
    label: 'Telegram',
  },
  {
    icon: 'ph:envelope',
    href: 'mailto:contact@example.com',
    label: 'Email',
  },
]
</script>

<template>
  <footer class="relative mt-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Top border -->
      <div class="border-t border-surface-700" />

      <!-- Main footer content -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 py-8"
      >
        <!-- Copyright -->
        <p class="text-sm text-[#6B6F8D]">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>

        <!-- Social icons -->
        <div class="flex items-center gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            :aria-label="link.label"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-9 h-9 rounded-button text-[#6B6F8D] hover:text-[#F0F0F8] hover:bg-surface-800 transition-colors duration-200"
          >
            <Icon :name="link.icon" size="20" />
          </a>
        </div>
      </div>

      <!-- Built with Nuxt -->
      <div class="pb-6 text-center">
        <p class="text-xs text-[#6B6F8D]/60">
          {{ t('footer.built_with') }}
        </p>
      </div>
    </div>
  </footer>
</template>

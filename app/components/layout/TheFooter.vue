<script setup lang="ts">
const { t } = useI18n()

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/versus666jzx' },
  { label: 'Telegram', href: 'https://t.me/andrew_the_one' },
  { label: 'LinkedIn', href: '#' },
]
</script>

<template>
  <footer class="relative mt-24">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Top border -->
      <div class="border-t border-[#1e1e1e]" />

      <!-- Footer content -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
      >
        <!-- Copyright -->
        <p class="text-sm text-[#545454]">
          2026 &copy; &mdash; Made by ML Architect
        </p>

        <!-- Social text links -->
        <div class="flex items-center gap-6">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-[#545454] hover:text-white transition-colors duration-200"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

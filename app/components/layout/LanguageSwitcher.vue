<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div
    class="inline-flex items-center rounded-full bg-surface-800 p-0.5 border border-surface-700"
  >
    <NuxtLink
      :to="switchLocalePath('ru')"
      :class="[
        'px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 uppercase tracking-wide',
        locale === 'ru'
          ? 'bg-surface-700 text-text-light shadow-sm'
          : 'text-text-dimmed hover:text-text-secondary',
      ]"
    >
      RU
    </NuxtLink>
    <NuxtLink
      :to="switchLocalePath('en')"
      :class="[
        'px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 uppercase tracking-wide',
        locale === 'en'
          ? 'bg-surface-700 text-text-light shadow-sm'
          : 'text-text-dimmed hover:text-text-secondary',
      ]"
    >
      EN
    </NuxtLink>
  </div>
</template>

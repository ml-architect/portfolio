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
          ? 'bg-surface-700 text-[#F0F0F8] shadow-sm'
          : 'text-[#6B6F8D] hover:text-[#A0A3BD]',
      ]"
    >
      RU
    </NuxtLink>
    <NuxtLink
      :to="switchLocalePath('en')"
      :class="[
        'px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 uppercase tracking-wide',
        locale === 'en'
          ? 'bg-surface-700 text-[#F0F0F8] shadow-sm'
          : 'text-[#6B6F8D] hover:text-[#A0A3BD]',
      ]"
    >
      EN
    </NuxtLink>
  </div>
</template>

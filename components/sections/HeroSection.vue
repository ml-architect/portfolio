<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Grid background -->
    <AnimationGridBackground />

    <!-- Content -->
    <div class="relative z-10 text-center flex flex-col items-center gap-6 px-4">
      <!-- Badge -->
      <UiBadge variant="primary">
        {{ t('hero.badge') }}
      </UiBadge>

      <!-- Heading -->
      <AnimationAnimatedText
        tag="h1"
        :text="t('hero.title')"
        class="text-display-lg md:text-display-xl text-[#F0F0F8] font-bold"
      />
      <span class="gradient-text text-display-lg md:text-display-xl font-bold -mt-4">
        {{ t('hero.titleAccent') }}
      </span>

      <!-- Subtitle -->
      <p class="text-lg text-[#A0A3BD] max-w-2xl mx-auto">
        {{ t('hero.subtitle') }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mt-2">
        <UiButton variant="primary" :to="localePath('/projects')">
          {{ t('hero.cta_projects') }}
        </UiButton>
        <UiButton variant="ghost" :to="localePath('/about')">
          {{ t('hero.cta_about') }}
        </UiButton>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <a
        href="#stats"
        class="flex flex-col items-center gap-2 text-[#6B6F8D] hover:text-[#A0A3BD] transition-colors"
        :aria-label="t('common.scroll_down')"
      >
        <span class="text-xs uppercase tracking-widest">{{ t('common.scroll_down') }}</span>
        <Icon name="ph:caret-down" size="24" class="animate-bounce" />
      </a>
    </div>
  </section>
</template>

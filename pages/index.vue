<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'ML Architect — Portfolio',
  description: t('hero.subtitle'),
  ogTitle: 'ML Architect — Portfolio',
  ogDescription: t('hero.subtitle'),
})
</script>

<template>
  <div>
    <SectionsHeroSection />
    <SectionsStatsSection />
    <SectionsFeaturedProjects />
    <SectionsSkillsSection />
    <SectionsContactSection />
  </div>
</template>

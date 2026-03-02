<script setup lang="ts">
const { t } = useI18n()

useSeo('AI Architect — Portfolio', t('hero.seoDescription'))
</script>

<template>
  <div>
    <SectionsHeroSection />
    <SectionsFeaturedProjects />
    <SectionsImpactSection />
    <SectionsSkillsSection />
    <SectionsMarqueeSection />
    <SectionsContactSection />
  </div>
</template>

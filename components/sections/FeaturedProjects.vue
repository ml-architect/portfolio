<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: projects } = await useAsyncData(
  `featured-projects-${locale.value}`,
  () =>
    queryContent('/projects')
      .where({ _locale: locale.value, featured: true })
      .sort({ date: -1 })
      .find(),
  { watch: [locale] },
)
</script>

<template>
  <section class="max-w-6xl mx-auto py-24 px-4">
    <!-- Heading -->
    <div class="text-center mb-12">
      <h2 class="text-display-sm text-[#F0F0F8] font-bold">
        {{ t('sections.featured') }}
      </h2>
      <p class="text-[#A0A3BD] mt-3">
        {{ t('sections.featured_subtitle') }}
      </p>
    </div>

    <!-- Projects grid -->
    <AnimationScrollReveal animation="fadeUp">
      <div
        v-if="projects?.length"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <ProjectCard
          v-for="project in projects"
          :key="project._path"
          :project="project"
        />
      </div>
    </AnimationScrollReveal>

    <!-- View all link -->
    <div class="text-center mt-10">
      <UiButton variant="outline" :to="localePath('/projects')">
        {{ t('sections.view_all') }}
      </UiButton>
    </div>
  </section>
</template>

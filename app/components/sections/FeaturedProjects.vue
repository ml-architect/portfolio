<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: projects } = await useAsyncData(
  'featured-projects',
  () =>
    queryContent('/projects')
      .where({ _locale: locale.value, featured: true })
      .sort({ date: -1 })
      .limit(4)
      .find(),
  { watch: [locale] },
)

const sectionRef = ref<HTMLElement | null>(null)

function getVariant(index: number): 'main' | 'side' | 'horizontal' {
  if (index === 0) return 'main'
  if (index === 1 || index === 2) return 'side'
  return 'horizontal'
}

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.projects-header', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
      },
    })

    gsap.fromTo('.featured-card', {
      y: 40,
      opacity: 0,
      filter: 'blur(16px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%',
      },
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section id="projects" ref="sectionRef" class="max-w-6xl mx-auto py-24 px-6">
    <!-- Header -->
    <div class="projects-header flex flex-col md:flex-row justify-between md:items-end gap-4">
      <UiSectionHeader
        :title="t('sections.featured')"
        :subtitle="t('sections.featured_subtitle')"
      />
      <NuxtLink
        :to="localePath('/projects')"
        class="text-white hover:text-gray-400 transition-colors text-sm"
      >
        {{ t('sections.view_all') }} &rarr;
      </NuxtLink>
    </div>

    <!-- Bento grid -->
    <div
      v-if="projects?.length"
      class="bento-grid grid grid-cols-1 md:grid-cols-2 gap-5 mt-10"
    >
      <!-- Main card (row-span-2) -->
      <SectionsFeaturedProjectCard
        v-if="projects[0]"
        :project="projects[0]"
        variant="main"
        class="md:row-span-2"
      />

      <!-- Side card #1 -->
      <SectionsFeaturedProjectCard
        v-if="projects[1]"
        :project="projects[1]"
        variant="side"
      />

      <!-- Side card #2 -->
      <SectionsFeaturedProjectCard
        v-if="projects[2]"
        :project="projects[2]"
        variant="side"
      />

      <!-- Horizontal card (col-span-2) -->
      <SectionsFeaturedProjectCard
        v-if="projects[3]"
        :project="projects[3]"
        variant="horizontal"
        class="md:col-span-2"
      />
    </div>
  </section>
</template>

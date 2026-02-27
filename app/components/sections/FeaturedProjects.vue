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
    gsap.from('.projects-header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
      },
    })

    gsap.from('.featured-card', {
      scale: 0.95,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
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
      <div>
        <h2 class="text-display-md font-semibold text-white">
          {{ t('sections.featured') }}
        </h2>
        <p class="text-sm text-[#545454] max-w-md mt-2">
          {{ t('sections.featured_subtitle') }}
        </p>
      </div>
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

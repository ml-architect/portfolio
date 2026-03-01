<script setup lang="ts">
import { gsap } from 'gsap'

const { t, locale } = useI18n()

const activeFilter = ref('all')

const { data: projects } = await useAsyncData(
  'all-projects',
  () =>
    queryContent('/projects')
      .where({ _locale: locale.value })
      .sort({ date: -1 })
      .find(),
  { watch: [locale] },
)

const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter(
    (p: any) => p.category === activeFilter.value,
  )
})

useSeoMeta({
  title: `${t('sections.all_projects')} — ML Architect`,
  description: t('sections.featured_subtitle'),
  ogTitle: `${t('sections.all_projects')} — ML Architect`,
  ogDescription: t('sections.featured_subtitle'),
})

const pageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!pageRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.projects-page-header', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
    })

    gsap.fromTo('.projects-page-filter', {
      y: 20,
      opacity: 0,
      filter: 'blur(10px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      delay: 0.15,
      ease: 'power2.out',
    })
  }, pageRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div ref="pageRef" class="max-w-6xl mx-auto py-24 px-6">
    <!-- Heading -->
    <div class="projects-page-header mb-10">
      <h1 class="text-display-md text-white font-display font-bold">
        {{ t('sections.all_projects') }}
      </h1>
    </div>

    <!-- Filter -->
    <div class="projects-page-filter mb-8">
      <ProjectFilter v-model="activeFilter" />
    </div>

    <!-- Projects grid -->
    <ProjectGrid
      v-if="filteredProjects.length"
      :projects="filteredProjects"
    />

    <!-- Empty state -->
    <div
      v-else
      class="text-center py-16 text-[#545454]"
    >
      <Icon name="ph:folder-open" size="48" class="mb-4 opacity-50" />
      <p>{{ t('blog.empty') }}</p>
    </div>
  </div>
</template>

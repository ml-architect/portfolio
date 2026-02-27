<script setup lang="ts">
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
</script>

<template>
  <div class="max-w-6xl mx-auto py-24 px-6">
    <!-- Heading -->
    <div class="mb-10">
      <h1 class="text-display-md text-white font-display font-bold">
        {{ t('sections.all_projects') }}
      </h1>
    </div>

    <!-- Filter -->
    <div class="mb-8">
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

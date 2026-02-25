<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = computed(() => route.params.slug as string)

const { data: project } = await useAsyncData(
  `project-${slug.value}-${locale.value}`,
  () =>
    queryContent('/projects')
      .where({ _locale: locale.value, _path: { $contains: slug.value } })
      .findOne(),
  { watch: [locale] },
)

// Prev/Next navigation
const { data: surround } = await useAsyncData(
  `project-surround-${slug.value}-${locale.value}`,
  () =>
    queryContent('/projects')
      .where({ _locale: locale.value })
      .sort({ date: -1 })
      .findSurround(project.value?._path || ''),
  { watch: [locale, project] },
)

const prevProject = computed(() => surround.value?.[0] || null)
const nextProject = computed(() => surround.value?.[1] || null)

const formattedDate = computed(() => {
  if (!project.value?.date) return ''
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(project.value.date))
})

useSeoMeta({
  title: () => project.value ? `${project.value.title} — ML Architect` : 'ML Architect',
  description: () => project.value?.description || '',
  ogTitle: () => project.value ? `${project.value.title} — ML Architect` : 'ML Architect',
  ogDescription: () => project.value?.description || '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-24 px-4">
    <!-- Back link -->
    <NuxtLink
      :to="localePath('/projects')"
      class="
        inline-flex items-center gap-2 text-sm text-[#6B6F8D]
        hover:text-primary-400 transition-colors mb-8
      "
    >
      <Icon name="ph:arrow-left" size="16" />
      {{ t('project.back') }}
    </NuxtLink>

    <template v-if="project">
      <!-- Hero area -->
      <header class="mb-12">
        <!-- Category badge -->
        <UiBadge :variant="project.category" class="mb-4">
          {{ project.category === 'commercial' ? t('filter.commercial') : t('filter.research') }}
        </UiBadge>

        <!-- Title -->
        <h1 class="text-display-md text-[#F0F0F8] font-bold mb-4">
          {{ project.title }}
        </h1>

        <!-- Description -->
        <p class="text-lg text-[#A0A3BD] mb-6">
          {{ project.description }}
        </p>

        <!-- Meta info -->
        <div class="flex flex-wrap gap-6 text-sm text-[#6B6F8D]">
          <div v-if="project.date" class="flex items-center gap-2">
            <Icon name="ph:calendar" size="16" />
            <span>{{ t('project.date') }}: {{ formattedDate }}</span>
          </div>
          <div v-if="project.role" class="flex items-center gap-2">
            <Icon name="ph:user" size="16" />
            <span>{{ t('project.role') }}: {{ project.role }}</span>
          </div>
          <div v-if="project.team" class="flex items-center gap-2">
            <Icon name="ph:users" size="16" />
            <span>{{ t('project.team') }}: {{ project.team }}</span>
          </div>
        </div>
      </header>

      <!-- Highlights -->
      <section
        v-if="project.highlights?.length"
        class="mb-12 bg-surface-800 rounded-card border border-surface-700/50 p-6"
      >
        <h2 class="text-lg font-semibold text-[#F0F0F8] mb-4">
          {{ t('project.highlights') }}
        </h2>
        <ul class="space-y-3">
          <li
            v-for="(highlight, index) in project.highlights"
            :key="index"
            class="flex items-start gap-3 text-[#A0A3BD]"
          >
            <Icon
              name="ph:check-circle"
              size="20"
              class="text-primary-400 shrink-0 mt-0.5"
            />
            <span>{{ highlight }}</span>
          </li>
        </ul>
      </section>

      <!-- Tags -->
      <section v-if="project.tags?.length" class="mb-12">
        <h2 class="text-lg font-semibold text-[#F0F0F8] mb-4">
          {{ t('project.tags') }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <UiSkillTag
            v-for="tag in project.tags"
            :key="tag"
            :name="tag"
          />
        </div>
      </section>

      <!-- Markdown body -->
      <section class="prose prose-invert max-w-none mb-12">
        <ContentRenderer :value="project" />
      </section>

      <!-- GitHub link -->
      <div v-if="project.github" class="mb-12">
        <UiButton
          variant="outline"
          :href="project.github"
          icon="simple-icons:github"
        >
          {{ t('project.github') }}
        </UiButton>
      </div>

      <!-- Prev/Next navigation -->
      <nav class="flex items-stretch gap-4 pt-8 border-t border-surface-700/50">
        <NuxtLink
          v-if="prevProject"
          :to="prevProject._path"
          class="
            flex-1 group bg-surface-800 rounded-card border border-surface-700/50
            p-4 hover:border-primary-500/30 transition-all duration-300
          "
        >
          <span class="text-xs text-[#6B6F8D] mb-1 block">{{ t('project.prev') }}</span>
          <span class="text-sm text-[#F0F0F8] group-hover:text-primary-300 transition-colors">
            {{ prevProject.title }}
          </span>
        </NuxtLink>
        <div v-else class="flex-1" />

        <NuxtLink
          v-if="nextProject"
          :to="nextProject._path"
          class="
            flex-1 group bg-surface-800 rounded-card border border-surface-700/50
            p-4 text-right hover:border-primary-500/30 transition-all duration-300
          "
        >
          <span class="text-xs text-[#6B6F8D] mb-1 block">{{ t('project.next') }}</span>
          <span class="text-sm text-[#F0F0F8] group-hover:text-primary-300 transition-colors">
            {{ nextProject.title }}
          </span>
        </NuxtLink>
        <div v-else class="flex-1" />
      </nav>
    </template>

    <!-- Not found -->
    <div v-else class="text-center py-16">
      <Icon name="ph:warning" size="48" class="text-[#6B6F8D] mb-4" />
      <p class="text-[#6B6F8D]">{{ t('common.not_found') }}</p>
    </div>
  </div>
</template>

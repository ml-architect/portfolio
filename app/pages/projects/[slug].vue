<script setup lang="ts">
import { gsap } from 'gsap'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = computed(() => route.params.slug as string)

const { data: project } = await useAsyncData(
  `project-${slug.value}`,
  () =>
    queryContent('/projects')
      .where({ _locale: locale.value, _path: { $contains: slug.value } })
      .findOne(),
  { watch: [locale] },
)

// Prev/Next navigation
const { data: surround } = await useAsyncData(
  `project-surround-${slug.value}`,
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

const pageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!pageRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.project-back-link', {
      y: 20,
      opacity: 0,
      filter: 'blur(10px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.fromTo('.project-header', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      delay: 0.1,
      ease: 'power2.out',
    })

    gsap.fromTo('.project-highlights', {
      y: 40,
      opacity: 0,
      filter: 'blur(16px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
    })

    gsap.fromTo('.project-tags', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      delay: 0.3,
      ease: 'power2.out',
    })

    gsap.fromTo('.project-body', {
      y: 40,
      opacity: 0,
      filter: 'blur(16px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: 0.35,
      ease: 'power2.out',
    })

    gsap.fromTo('.project-nav', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      delay: 0.4,
      ease: 'power2.out',
    })
  }, pageRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div ref="pageRef" class="max-w-4xl mx-auto py-24 px-6">
    <!-- Back link -->
    <NuxtLink
      :to="localePath('/projects')"
      class="
        project-back-link inline-flex items-center gap-2 text-sm text-[#545454]
        hover:text-primary-400 transition-colors mb-8
      "
    >
      <Icon name="ph:arrow-left" size="16" />
      {{ t('project.back') }}
    </NuxtLink>

    <template v-if="project">
      <!-- Hero area -->
      <header class="project-header mb-12">
        <!-- Category badge -->
        <UiBadge :variant="project.category" class="mb-4">
          {{ project.category === 'commercial' ? t('filter.commercial') : t('filter.research') }}
        </UiBadge>

        <!-- Title -->
        <h1 class="text-display-md text-white font-display font-bold mb-4">
          {{ project.title }}
        </h1>

        <!-- Description -->
        <p class="text-lg text-[#545454] mb-6">
          {{ project.description }}
        </p>

        <!-- Meta info -->
        <div class="flex flex-wrap gap-6 text-sm text-[#545454]">
          <div v-if="project.client" class="flex items-center gap-2">
            <Icon name="ph:buildings" size="16" />
            <span>
              {{ t('project.client') }}:
              <a
                v-if="project.clientUrl"
                :href="project.clientUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary-400 transition-colors"
              >{{ project.client }}</a>
              <template v-else>{{ project.client }}</template>
            </span>
          </div>
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
        class="project-highlights mb-12 bg-surface-800 rounded-card border border-[#1e1e1e] p-6"
      >
        <h2 class="text-lg font-semibold text-white font-display mb-4">
          {{ t('project.highlights') }}
        </h2>
        <ul class="space-y-3">
          <li
            v-for="(highlight, index) in project.highlights"
            :key="index"
            class="flex items-start gap-3 text-[#545454]"
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
      <section v-if="project.tags?.length" class="project-tags mb-12">
        <h2 class="text-lg font-semibold text-white font-display mb-4">
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
      <section class="project-body prose prose-invert max-w-none mb-12">
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
      <nav class="project-nav flex items-stretch gap-4 pt-8 border-t border-[#1e1e1e]">
        <NuxtLink
          v-if="prevProject"
          :to="prevProject._path"
          class="
            flex-1 group bg-surface-800 rounded-card border border-[#1e1e1e]
            p-4 hover:border-primary-500/30 transition-all duration-300
          "
        >
          <span class="text-xs text-[#545454] mb-1 block">{{ t('project.prev') }}</span>
          <span class="text-sm text-white group-hover:text-primary-300 transition-colors">
            {{ prevProject.title }}
          </span>
        </NuxtLink>
        <div v-else class="flex-1" />

        <NuxtLink
          v-if="nextProject"
          :to="nextProject._path"
          class="
            flex-1 group bg-surface-800 rounded-card border border-[#1e1e1e]
            p-4 text-right hover:border-primary-500/30 transition-all duration-300
          "
        >
          <span class="text-xs text-[#545454] mb-1 block">{{ t('project.next') }}</span>
          <span class="text-sm text-white group-hover:text-primary-300 transition-colors">
            {{ nextProject.title }}
          </span>
        </NuxtLink>
        <div v-else class="flex-1" />
      </nav>
    </template>

    <!-- Not found -->
    <div v-else class="text-center py-16">
      <Icon name="ph:warning" size="48" class="text-[#545454] mb-4" />
      <p class="text-[#545454]">{{ t('common.not_found') }}</p>
    </div>
  </div>
</template>

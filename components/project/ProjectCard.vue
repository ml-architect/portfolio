<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

interface ProjectContent extends ParsedContent {
  title: string
  description: string
  category: 'commercial' | 'research'
  tags: string[]
  date: string
  role: string
  team?: string
  featured?: boolean
}

interface Props {
  project: ProjectContent
}

const props = defineProps<Props>()
const { locale } = useI18n()

const formattedDate = computed(() => {
  if (!props.project.date) return ''
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(props.project.date))
})

const visibleTags = computed(() => {
  return (props.project.tags || []).slice(0, 4)
})

const hasMoreTags = computed(() => {
  return (props.project.tags || []).length > 4
})
</script>

<template>
  <NuxtLink
    :to="project._path"
    class="
      block bg-surface-800 rounded-card border border-surface-700/50
      p-6 hover:border-primary-500/30 transition-all duration-300
      hover:-translate-y-0.5
    "
  >
    <!-- Category badge -->
    <UiBadge :variant="project.category" size="sm">
      {{ project.category === 'commercial' ? $t('filter.commercial') : $t('filter.research') }}
    </UiBadge>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-[#F0F0F8] mt-3">
      {{ project.title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-[#A0A3BD] mt-2 line-clamp-2">
      {{ project.description }}
    </p>

    <!-- Bottom: tags + date -->
    <div class="flex items-center justify-between mt-4 pt-4 border-t border-surface-700/30">
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in visibleTags"
          :key="tag"
          class="text-xs text-[#6B6F8D] bg-surface-700/50 px-2 py-0.5 rounded"
        >
          {{ tag }}
        </span>
        <span
          v-if="hasMoreTags"
          class="text-xs text-[#6B6F8D]"
        >
          +{{ project.tags.length - 4 }}
        </span>
      </div>
      <span class="text-xs text-[#6B6F8D] whitespace-nowrap ml-3">
        {{ formattedDate }}
      </span>
    </div>
  </NuxtLink>
</template>

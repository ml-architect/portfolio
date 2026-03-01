<script setup lang="ts">
import type { ProjectContent } from '~/types/project'

interface Props {
  project: ProjectContent
}

const props = defineProps<Props>()
const { formatDate } = useFormatDate()

const formattedDate = computed(() => {
  if (!props.project.date) return ''
  return formatDate(props.project.date, 'month-year')
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
      flex flex-col h-full bg-surface-800 rounded-card border border-white/[0.08]
      p-6 hover:border-white/[0.2] transition-all duration-300
      hover:-translate-y-0.5
    "
  >
    <!-- Category badge -->
    <UiBadge :variant="project.category" size="sm" class="self-start">
      {{ project.category === 'commercial' ? $t('filter.commercial') : $t('filter.research') }}
    </UiBadge>

    <!-- Client -->
    <div v-if="project.client" class="flex items-center gap-1.5 mt-3 text-xs text-text-muted">
      <Icon name="ph:buildings" class="size-3.5 shrink-0" />
      <component
        :is="project.clientUrl ? 'a' : 'span'"
        v-bind="project.clientUrl ? { href: project.clientUrl, target: '_blank', rel: 'noopener noreferrer' } : {}"
        :class="project.clientUrl ? 'hover:text-primary-400 transition-colors' : ''"
        @click.stop
      >
        {{ project.client }}
      </component>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-white" :class="project.client ? 'mt-1.5' : 'mt-3'">
      {{ project.title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-text-muted mt-2 line-clamp-2 flex-1">
      {{ project.description }}
    </p>

    <!-- Bottom: tags + date -->
    <div class="flex items-center justify-between mt-4 pt-4 border-t border-surface-card">
      <div class="flex gap-1.5 overflow-hidden min-w-0">
        <span
          v-for="tag in visibleTags"
          :key="tag"
          class="text-xs text-text-muted bg-surface-card px-2 py-0.5 rounded shrink-0"
        >
          {{ tag }}
        </span>
        <span
          v-if="hasMoreTags"
          class="text-xs text-text-muted shrink-0"
        >
          +{{ project.tags.length - 4 }}
        </span>
      </div>
      <span class="text-xs text-text-muted whitespace-nowrap ml-3 shrink-0">
        {{ formattedDate }}
      </span>
    </div>
  </NuxtLink>
</template>

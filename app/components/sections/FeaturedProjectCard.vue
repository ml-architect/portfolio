<script setup lang="ts">
import { gsap } from 'gsap'
import type { ProjectContent } from '~/types/project'

interface Props {
  project: ProjectContent
  variant: 'main' | 'side' | 'horizontal'
}

const props = defineProps<Props>()
const { locale } = useI18n()
const localePath = useLocalePath()

const cardRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isTouchDevice = ref(false)

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
})

const formattedDate = computed(() => {
  if (!props.project.date) return ''
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(props.project.date))
})

const maxTags = computed(() => {
  if (props.variant === 'main') return 5
  if (props.variant === 'horizontal') return 4
  return 3
})

const visibleTags = computed(() => {
  return (props.project.tags || []).slice(0, maxTags.value)
})

const hasMoreTags = computed(() => {
  return (props.project.tags || []).length > maxTags.value
})

const remainingTags = computed(() => {
  return (props.project.tags || []).length - maxTags.value
})

function onMouseMove(e: MouseEvent) {
  if (isTouchDevice.value || !cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = ((y - centerY) / centerY) * -4
  const rotateY = ((x - centerX) / centerX) * 4

  gsap.to(cardRef.value, {
    rotationX: rotateX,
    rotationY: rotateY,
    duration: 0.3,
    ease: 'power2.out',
    transformPerspective: 800,
  })
}

function onMouseLeave() {
  isHovered.value = false
  if (!cardRef.value) return

  gsap.to(cardRef.value, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.5,
    ease: 'power2.out',
  })
}
</script>

<template>
  <div
    ref="cardRef"
    class="featured-card will-change-transform"
    @mouseenter="isHovered = true"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <NuxtLink
      :to="localePath(project._path ?? '/')"
      :class="[
        'group block h-full rounded-card border transition-colors duration-300',
        'bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]',
        isHovered ? 'shimmer-border' : '',
        variant === 'main' ? 'p-8' : 'p-6',
        variant === 'horizontal' ? 'md:px-8' : '',
        variant === 'horizontal' ? 'flex flex-col md:flex-row md:items-start md:gap-8' : 'flex flex-col',
      ]"
    >
      <!-- Content block -->
      <div :class="variant === 'horizontal' ? 'flex-1 flex flex-col min-w-0' : 'flex flex-col flex-1'">
        <!-- Top: badge + date -->
        <div class="flex items-center gap-3 mb-3">
          <UiBadge :variant="project.category" size="sm">
            {{ project.category === 'commercial' ? $t('filter.commercial') : $t('filter.research') }}
          </UiBadge>
          <span class="text-xs text-[#545454]">{{ formattedDate }}</span>
        </div>

        <!-- Title -->
        <h3
          :class="[
            'font-semibold text-white',
            variant === 'main' ? 'text-display-sm' : 'text-xl',
          ]"
        >
          {{ project.title }}
        </h3>

        <!-- Description -->
        <p
          :class="[
            'text-sm text-[#8a8a8a] mt-2',
            variant === 'main' ? 'line-clamp-3' : 'line-clamp-2',
          ]"
        >
          {{ project.description }}
        </p>

        <!-- Role -->
        <p v-if="project.role" class="text-xs text-[#545454] mt-3">
          {{ project.role }}
        </p>
      </div>

      <!-- Bottom: tags + arrow -->
      <div
        :class="[
          'flex items-end justify-between gap-4',
          variant === 'horizontal' ? 'mt-4 md:mt-0 md:flex-shrink-0 md:self-end' : 'mt-auto pt-4',
        ]"
      >
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in visibleTags"
            :key="tag"
            class="text-xs text-[#8a8a8a] bg-surface-700/60 px-2 py-0.5 rounded"
          >
            {{ tag }}
          </span>
          <span
            v-if="hasMoreTags"
            class="text-xs text-[#545454]"
          >
            +{{ remainingTags }}
          </span>
        </div>

        <!-- Arrow -->
        <div
          class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                 bg-surface-700/50 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                 transition-all duration-300"
        >
          <Icon name="ph:arrow-up-right" class="w-4 h-4 text-white" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

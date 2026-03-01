<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

interface ExpertiseItem {
  icon: string
  title: string
  description: string
  tags: string[]
}

const expertise = computed<ExpertiseItem[]>(() => [
  {
    icon: 'ph:graphics-card-bold',
    title: t('expertise.inference_title'),
    description: t('expertise.inference_desc'),
    tags: t('expertise.inference_tags').split(', '),
  },
  {
    icon: 'ph:brain-bold',
    title: t('expertise.ml_title'),
    description: t('expertise.ml_desc'),
    tags: t('expertise.ml_tags').split(', '),
  },
  {
    icon: 'ph:robot-bold',
    title: t('expertise.llm_title'),
    description: t('expertise.llm_desc'),
    tags: t('expertise.llm_tags').split(', '),
  },
  {
    icon: 'ph:code-bold',
    title: t('expertise.backend_title'),
    description: t('expertise.backend_desc'),
    tags: t('expertise.backend_tags').split(', '),
  },
  {
    icon: 'ph:database-bold',
    title: t('expertise.data_title'),
    description: t('expertise.data_desc'),
    tags: t('expertise.data_tags').split(', '),
  },
  {
    icon: 'ph:cloud-arrow-up-bold',
    title: t('expertise.infra_title'),
    description: t('expertise.infra_desc'),
    tags: t('expertise.infra_tags').split(', '),
  },
])

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.expertise-title', {
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
        start: 'top 95%',
      },
    })

    gsap.fromTo('.expertise-item', {
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
        trigger: '.expertise-grid',
        start: 'top 95%',
      },
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section ref="sectionRef" class="max-w-6xl mx-auto py-24 px-6">
    <h2 class="expertise-title text-display-md font-semibold text-white mb-4">
      {{ t('sections.skills') }}
    </h2>
    <p class="expertise-title text-text-secondary mb-12">
      {{ t('sections.skills_subtitle') }}
    </p>

    <div class="expertise-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in expertise"
        :key="item.title"
        class="expertise-item group rounded-card border border-surface-600/50 bg-surface-800/50 p-6 transition-all duration-300 hover:border-primary-500/30 hover:bg-surface-700/50"
      >
        <div class="flex items-center gap-3 mb-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-card-inner bg-primary-500/10 text-primary-400">
            <Icon :name="item.icon" class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-medium text-white">
            {{ item.title }}
          </h3>
        </div>

        <p class="text-text-secondary text-sm leading-relaxed mb-4">
          {{ item.description }}
        </p>

        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="inline-block px-2 py-0.5 text-xs font-mono rounded-badge bg-surface-600/60 text-text-secondary transition-colors duration-200 group-hover:text-text-light group-hover:bg-surface-500/50"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

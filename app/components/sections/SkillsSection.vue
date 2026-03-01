<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

interface ExpertiseItem {
  title: string
  description: string
}

const expertise = computed<ExpertiseItem[]>(() => [
  {
    title: t('expertise.backend_title'),
    description: t('expertise.backend_desc'),
  },
  {
    title: t('expertise.ml_title'),
    description: t('expertise.ml_desc'),
  },
  {
    title: t('expertise.data_title'),
    description: t('expertise.data_desc'),
  },
  {
    title: t('expertise.infra_title'),
    description: t('expertise.infra_desc'),
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
        start: 'top 80%',
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
        start: 'top 80%',
      },
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section ref="sectionRef" class="max-w-6xl mx-auto py-24 px-6">
    <h2 class="expertise-title text-display-md font-semibold text-white mb-12">
      {{ t('sections.skills') }}
    </h2>

    <div class="expertise-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
      <div v-for="item in expertise" :key="item.title" class="expertise-item">
        <h3 class="text-display-sm font-medium text-white">
          &middot; {{ item.title }}
        </h3>
        <p class="text-text-muted mt-3 leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>

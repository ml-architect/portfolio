<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

interface ImpactCard {
  icon: string
  value: number
  suffix: string
  titleKey: string
  descKey: string
}

const cards: ImpactCard[] = [
  { icon: 'ph:graphics-card-bold', value: 6, suffix: '', titleKey: 'impact.localInference_title', descKey: 'impact.localInference_desc' },
  { icon: 'ph:waveform-bold', value: 1000, suffix: '+', titleKey: 'impact.audioScale_title', descKey: 'impact.audioScale_desc' },
  { icon: 'ph:video-camera-bold', value: 6000, suffix: '', titleKey: 'impact.cameras_title', descKey: 'impact.cameras_desc' },
  { icon: 'ph:brain-bold', value: 32, suffix: 'B', titleKey: 'impact.finetune_title', descKey: 'impact.finetune_desc' },
  { icon: 'ph:map-pin-bold', value: 8, suffix: '', titleKey: 'impact.instances_title', descKey: 'impact.instances_desc' },
  { icon: 'ph:lightning-bold', value: 50, suffix: '', titleKey: 'impact.latency_title', descKey: 'impact.latency_desc' },
]

const sectionRef = ref<HTMLElement | null>(null)
const numberRefs = ref<(HTMLElement | null)[]>([])

const setNumberRef = (el: any, index: number) => {
  numberRefs.value[index] = el as HTMLElement | null
}

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.impact-header',
      { y: 30, opacity: 0, filter: 'blur(12px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 98%',
          toggleActions: 'play none none none',
        },
      },
    )

    gsap.fromTo('.impact-card',
      { y: 40, opacity: 0, filter: 'blur(16px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.impact-grid',
          start: 'top 98%',
          toggleActions: 'play none none none',
        },
      },
    )

    numberRefs.value.forEach((el, index) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: cards[index].value,
        duration: 4,
        delay: index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 98%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString()
        },
      })
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section ref="sectionRef" class="max-w-6xl mx-auto py-24 px-6">
    <!-- Header -->
    <UiSectionHeader
      :title="t('impact.title')"
      :subtitle="t('impact.subtitle')"
      class="impact-header"
    />

    <!-- Grid -->
    <div class="impact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
      <UiCard
        v-for="(card, index) in cards"
        :key="card.titleKey"
        variant="glass"
        class="impact-card p-6"
      >
        <!-- Icon -->
        <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <Icon :name="card.icon" size="24" class="text-green-400" />
        </div>

        <!-- Number -->
        <div class="text-display-sm text-white font-bold">
          <span :ref="(el) => setNumberRef(el, index)">0</span>
          <span v-if="card.suffix">{{ card.suffix }}</span>
        </div>

        <!-- Title -->
        <h3 class="text-sm text-text-secondary mt-2">
          {{ t(card.titleKey) }}
        </h3>

        <!-- Description -->
        <p class="text-xs text-text-dimmed mt-1">
          {{ t(card.descKey) }}
        </p>
      </UiCard>
    </div>
  </section>
</template>

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
  { icon: 'ph:cloud-arrow-up-bold', value: 10, suffix: '', titleKey: 'impact.cloud_title', descKey: 'impact.cloud_desc' },
  { icon: 'ph:file-search-bold', value: 111, suffix: '', titleKey: 'impact.contracts_title', descKey: 'impact.contracts_desc' },
  { icon: 'ph:brain-bold', value: 20, suffix: '+', titleKey: 'impact.models_title', descKey: 'impact.models_desc' },
  { icon: 'ph:arrows-clockwise-bold', value: 7, suffix: '', titleKey: 'impact.finetune_title', descKey: 'impact.finetune_desc' },
  { icon: 'ph:cube-bold', value: 35, suffix: '+', titleKey: 'impact.services_title', descKey: 'impact.services_desc' },
  { icon: 'ph:shield-check-bold', value: 12, suffix: '+', titleKey: 'impact.security_title', descKey: 'impact.security_desc' },
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
          start: 'top 90%',
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
          start: 'top 95%',
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
          start: 'top 95%',
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
    <div class="impact-header">
      <h2 class="text-display-md font-semibold text-white">
        {{ t('impact.title') }}
      </h2>
      <p class="text-sm text-[#545454] max-w-md mt-2">
        {{ t('impact.subtitle') }}
      </p>
    </div>

    <!-- Grid -->
    <div class="impact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
      <div
        v-for="(card, index) in cards"
        :key="card.titleKey"
        class="impact-card bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-card p-6 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
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
        <h3 class="text-sm text-[#A0A3BD] mt-2">
          {{ t(card.titleKey) }}
        </h3>

        <!-- Description -->
        <p class="text-xs text-[#6B6F8D] mt-1">
          {{ t(card.descKey) }}
        </p>
      </div>
    </div>
  </section>
</template>

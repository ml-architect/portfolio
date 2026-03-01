<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.cta-title', {
      y: 40,
      opacity: 0,
      filter: 'blur(16px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-title',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    gsap.fromTo('.cta-button', {
      y: 20,
      opacity: 0,
      filter: 'blur(10px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-title',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section ref="sectionRef" class="py-32 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
    <!-- Big CTA text -->
    <h2 class="cta-title text-display-xl md:text-[8rem] lg:text-[10rem] font-display font-semibold text-white leading-none tracking-tighter">
      {{ t('hero.lets_talk') }}
    </h2>

    <!-- Email pill button -->
    <a
      href="mailto:mattias666@mail.ru"
      class="cta-button mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40"
    >
      <span class="text-sm md:text-base">mattias666@mail.ru</span>
      <Icon name="ph:arrow-up-right" size="20" />
    </a>
  </section>
</template>

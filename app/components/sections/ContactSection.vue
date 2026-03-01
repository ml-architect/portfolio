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
        start: 'top 98%',
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
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-title',
        start: 'top 98%',
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

    <!-- Contact buttons -->
    <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
      <a
        href="mailto:mattias666@mail.ru"
        class="cta-button inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40"
      >
        <span class="text-sm md:text-base">mattias666@mail.ru</span>
        <Icon name="ph:arrow-up-right" size="20" />
      </a>
      <a
        href="https://t.me/andrew_the_one"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-button inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40"
      >
        <Icon name="simple-icons:telegram" size="20" />
        <span class="text-sm md:text-base">Telegram</span>
      </a>
    </div>
  </section>
</template>

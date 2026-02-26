<script setup lang="ts">
import { gsap } from 'gsap'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Hero title lines animate in
    tl.from('.hero-line', {
      y: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
    })

    // Scroll indicator fades in
    tl.from('.scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.5')

    // Bottom bar slides up
    tl.from('.hero-bottom', {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.3')
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section
    ref="sectionRef"
    class="hero-section relative flex flex-col justify-between bg-surface-950"
  >
    <!-- Main title area -->
    <div class="flex-1 flex items-center w-full px-6 md:px-12 lg:px-16 min-h-0">
      <div class="relative w-full">
        <h1 class="text-display-hero font-display font-semibold text-white tracking-tighter leading-none">
          <span class="hero-line block">{{ t('hero.title') }}</span>
          <span class="hero-line block">{{ t('hero.titleAccent') }}</span>
        </h1>

      </div>
    </div>

    <!-- Scroll indicator — right edge -->
    <a
      href="#projects"
      class="scroll-indicator group absolute right-6 md:right-10 bottom-20 hidden lg:flex flex-col items-center gap-3"
      :aria-label="t('common.scroll_down')"
    >
      <!-- Mouse icon -->
      <span class="relative w-5 h-8 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300">
        <span class="scroll-dot absolute left-1/2 -translate-x-1/2 top-1.5 w-0.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors duration-300" />
      </span>

      <!-- Animated line -->
      <span class="scroll-line w-px h-8 bg-white/10 overflow-hidden relative">
        <span class="scroll-line-fill absolute inset-x-0 top-0 w-full bg-white/50" />
      </span>

      <!-- Label -->
      <span class="text-[9px] text-white/30 uppercase tracking-[0.25em] group-hover:text-white/60 transition-colors duration-300 [writing-mode:vertical-lr]">
        scroll
      </span>
    </a>

    <!-- Bottom bar -->
    <div class="hero-bottom max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
      <!-- Left: Let's Talk + email -->
      <div>
        <p class="text-xl font-medium text-white">
          {{ t('hero.lets_talk') }}
        </p>
        <a
          href="mailto:mattias666@mail.ru"
          class="text-sm text-[#545454] hover:text-white/70 transition-colors"
        >
          mattias666@mail.ru
        </a>
      </div>

      <!-- Right: subtitle paragraph -->
      <p class="max-w-md text-sm text-[#545454] text-left md:text-right leading-relaxed">
        {{ t('hero.subtitle') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  height: calc(100dvh - 4rem); /* 4rem = layout pt-16 for fixed header */
  padding-top: 1rem;
  padding-bottom: 1.5rem;
}

/* Scroll indicator — mouse dot bounce */
@keyframes scroll-dot {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.4;
    transform: translateX(-50%) translateY(8px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
}

.scroll-dot {
  animation: scroll-dot 1.8s ease-in-out infinite;
}

/* Scroll indicator — line fill */
@keyframes scroll-line-fill {
  0% {
    height: 0;
    top: 0;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    height: 100%;
    top: 0;
    opacity: 0;
  }
}

.scroll-line-fill {
  animation: scroll-line-fill 2s ease-in-out infinite;
}
</style>

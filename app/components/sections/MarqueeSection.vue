<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.from(sectionRef.value, {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 90%',
      },
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section ref="sectionRef" class="overflow-hidden py-20 border-y border-surface-700">
    <div class="marquee-track whitespace-nowrap">
      <span
        v-for="i in 2"
        :key="i"
        class="marquee-segment text-marquee font-display font-semibold text-white/[0.07] uppercase tracking-wide"
      >
        machine learning &nbsp;&middot;&nbsp; data engineering
        &nbsp;&middot;&nbsp; system architecture &nbsp;&middot;&nbsp; neural
        networks &nbsp;&middot;&nbsp; deep learning &nbsp;&middot;&nbsp; MLOps
        &nbsp;&middot;&nbsp;
      </span>
    </div>
  </section>
</template>

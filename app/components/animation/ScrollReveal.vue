<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight'
  delay?: number
  duration?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'fadeUp',
  delay: 0,
  duration: 0.8,
  once: true,
})

const container = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween | null = null

const animationConfigs: Record<NonNullable<Props['animation']>, gsap.TweenVars> = {
  fadeUp: { y: 40, opacity: 0, filter: 'blur(16px)' },
  fadeIn: { opacity: 0, filter: 'blur(12px)' },
  slideLeft: { x: -40, opacity: 0, filter: 'blur(12px)' },
  slideRight: { x: 40, opacity: 0, filter: 'blur(12px)' },
}

onMounted(() => {
  if (!container.value) return

  const fromVars = animationConfigs[props.animation!]

  tween = gsap.fromTo(container.value, fromVars, {
    y: 0,
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: props.duration,
    delay: props.delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: container.value,
      start: 'top 85%',
      toggleActions: props.once ? 'play none none none' : 'play reverse play reverse',
    },
  })
})

onUnmounted(() => {
  if (tween) {
    const st = tween.scrollTrigger
    if (st) st.kill()
    tween.kill()
    tween = null
  }
})
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

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

const container: Ref<HTMLElement | null> = ref(null)
const { gsap, ScrollTrigger, addAnimation } = useGsap()

const animationConfigs: Record<NonNullable<Props['animation']>, gsap.TweenVars> = {
  fadeUp: { y: 40, opacity: 0 },
  fadeIn: { opacity: 0 },
  slideLeft: { x: -40, opacity: 0 },
  slideRight: { x: 40, opacity: 0 },
}

onMounted(() => {
  if (!container.value) return

  const fromVars = animationConfigs[props.animation!]

  addAnimation(() => {
    gsap.from(container.value!, {
      ...fromVars,
      duration: props.duration,
      delay: props.delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.value!,
        start: 'top 85%',
        toggleActions: props.once ? 'play none none none' : 'play reverse play reverse',
      },
    })
  })
})
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>

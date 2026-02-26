<script setup lang="ts">
import type { Ref } from 'vue'

interface Props {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  animation?: 'words' | 'chars'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h1',
  delay: 0,
  animation: 'words',
})

const container: Ref<HTMLElement | null> = ref(null)
const { gsap, addAnimation } = useGsap()

const segments = computed(() => {
  if (props.animation === 'chars') {
    return props.text.split('').map((char) => (char === ' ' ? '\u00A0' : char))
  }
  return props.text.split(' ')
})

onMounted(() => {
  if (!container.value) return

  const targets = container.value.querySelectorAll('.animated-segment')
  if (!targets.length) return

  addAnimation(() => {
    gsap.from(targets, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: props.delay,
      stagger: props.animation === 'chars' ? 0.02 : 0.06,
      ease: 'power3.out',
    })
  })
})
</script>

<template>
  <component
    :is="tag"
    ref="container"
    class="flex flex-wrap"
  >
    <span
      v-for="(segment, index) in segments"
      :key="index"
      class="inline-block overflow-hidden"
    >
      <span class="animated-segment inline-block">
        {{ segment }}
      </span>
      <!-- Add space after words (not after chars or last word) -->
      <span
        v-if="animation === 'words' && index < segments.length - 1"
        class="inline-block"
      >&nbsp;</span>
    </span>
  </component>
</template>

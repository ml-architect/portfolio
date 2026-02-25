import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsap() {
  const ctx = ref<gsap.Context | null>(null)

  onMounted(() => {
    ctx.value = gsap.context(() => {})
  })

  onUnmounted(() => {
    ctx.value?.revert()
  })

  function addAnimation(fn: () => void) {
    ctx.value?.add(fn)
  }

  return { gsap, ScrollTrigger, addAnimation }
}

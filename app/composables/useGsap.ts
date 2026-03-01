import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsap() {
  const ctx = ref<gsap.Context | null>(null)
  const pending: (() => void)[] = []

  onMounted(() => {
    ctx.value = gsap.context(() => {})
    // Выполняем все анимации, которые были добавлены до инициализации контекста
    while (pending.length) {
      ctx.value.add(pending.shift()!)
    }
  })

  onUnmounted(() => {
    ctx.value?.revert()
    ctx.value = null
  })

  function addAnimation(fn: () => void) {
    if (ctx.value) {
      ctx.value.add(fn)
    } else {
      pending.push(fn)
    }
  }

  return { gsap, ScrollTrigger, addAnimation }
}

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollAnimation() {
  const ctx = ref<gsap.Context | null>(null)

  onMounted(() => {
    ctx.value = gsap.context(() => {})
  })

  onUnmounted(() => {
    ctx.value?.revert()
  })

  function fadeUp(element: HTMLElement | string, options?: { delay?: number; stagger?: number; duration?: number }) {
    ctx.value?.add(() => {
      gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        stagger: options?.stagger ?? 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: typeof element === 'string' ? element : element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }

  function staggerCards(container: HTMLElement | string, cardSelector: string) {
    ctx.value?.add(() => {
      gsap.from(cardSelector, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      })
    })
  }

  function countUp(element: HTMLElement, target: number, duration = 2) {
    ctx.value?.add(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
        onUpdate: () => {
          element.textContent = Math.floor(obj.val).toString()
        },
      })
    })
  }

  function reveal(element: HTMLElement | string) {
    ctx.value?.add(() => {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: typeof element === 'string' ? element : element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    })
  }

  return { fadeUp, staggerCards, countUp, reveal }
}

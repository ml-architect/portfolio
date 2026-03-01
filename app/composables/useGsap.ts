import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type BlurInVariant = 'header' | 'card' | 'small'

interface BlurInOptions {
  delay?: number
  stagger?: number
  ease?: string
  trigger?: string | HTMLElement
  start?: string
}

interface CountUpOptions {
  duration?: number
  ease?: string
  start?: string
  suffix?: string
  formatter?: (val: number) => string
}

const blurInPresets: Record<BlurInVariant, { y: number; blur: string; duration: number; start: string }> = {
  header: { y: 30, blur: '12px', duration: 0.9, start: 'top 95%' },
  card: { y: 40, blur: '16px', duration: 0.8, start: 'top 98%' },
  small: { y: 20, blur: '10px', duration: 0.7, start: 'top 98%' },
}

export function useGsap(scopeRef?: Ref<HTMLElement | null>) {
  const ctx = ref<gsap.Context | null>(null)
  const pending: (() => void)[] = []

  onMounted(() => {
    const scope = scopeRef?.value ?? undefined
    ctx.value = gsap.context(() => {
      while (pending.length) {
        pending.shift()!()
      }
    }, scope)
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

  function useBlurIn(selector: string | HTMLElement, variant: BlurInVariant, options?: BlurInOptions) {
    const preset = blurInPresets[variant]
    addAnimation(() => {
      gsap.fromTo(selector,
        {
          y: preset.y,
          opacity: 0,
          filter: `blur(${preset.blur})`,
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: preset.duration,
          delay: options?.delay ?? 0,
          stagger: options?.stagger ?? 0,
          ease: options?.ease ?? 'power2.out',
          scrollTrigger: {
            trigger: options?.trigger ?? selector,
            start: options?.start ?? preset.start,
            toggleActions: 'play none none none',
          },
        },
      )
    })
  }

  function useCountUp(element: HTMLElement, target: number, options?: CountUpOptions) {
    addAnimation(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: options?.duration ?? 2,
        ease: options?.ease ?? 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: options?.start ?? 'top 98%',
        },
        onUpdate: () => {
          if (options?.formatter) {
            element.textContent = options.formatter(obj.val)
          } else {
            element.textContent = Math.floor(obj.val).toString()
          }
        },
      })
    })
  }

  return {
    gsap,
    ScrollTrigger,
    addAnimation,
    useBlurIn,
    useCountUp,
  }
}

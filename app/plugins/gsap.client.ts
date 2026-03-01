import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, Flip, SplitText)

  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})

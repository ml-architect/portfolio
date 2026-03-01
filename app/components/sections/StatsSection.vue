<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

interface Stat {
  value: number
  suffix: string
  labelKey: string
}

const stats: Stat[] = [
  { value: 18, suffix: '+', labelKey: 'stats.projects' },
  { value: 16, suffix: '', labelKey: 'stats.commercial' },
  { value: 6, suffix: '', labelKey: 'stats.localInference' },
  { value: 35, suffix: '+', labelKey: 'stats.deployed' },
]

const sectionRef = ref<HTMLElement | null>(null)
const statRefs = ref<(HTMLElement | null)[]>([])

const setStatRef = (el: any, index: number) => {
  statRefs.value[index] = el as HTMLElement | null
}

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    statRefs.value.forEach((el, index) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stats[index].value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 98%',
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString()
        },
      })
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section id="stats" ref="sectionRef" class="py-16 border-y border-surface-700/50">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center px-4">
      <div
        v-for="(stat, index) in stats"
        :key="stat.labelKey"
        class="flex flex-col items-center"
      >
        <div class="text-display-sm text-text-light font-bold">
          <span :ref="(el) => setStatRef(el, index)">0</span>
          <span v-if="stat.suffix">{{ stat.suffix }}</span>
        </div>
        <span class="text-sm text-text-dimmed mt-1">
          {{ t(stat.labelKey) }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { countUp } = useScrollAnimation()

interface Stat {
  value: number
  suffix: string
  labelKey: string
}

const stats: Stat[] = [
  { value: 16, suffix: '+', labelKey: 'stats.projects' },
  { value: 8, suffix: '', labelKey: 'stats.commercial' },
  { value: 5, suffix: '+', labelKey: 'stats.experience' },
  { value: 78, suffix: '+', labelKey: 'stats.technologies' },
]

const statRefs = ref<(HTMLElement | null)[]>([])

const setStatRef = (el: any, index: number) => {
  statRefs.value[index] = el as HTMLElement | null
}

onMounted(() => {
  nextTick(() => {
    statRefs.value.forEach((el, index) => {
      if (el) {
        countUp(el, stats[index].value)
      }
    })
  })
})
</script>

<template>
  <section id="stats" class="py-16 border-y border-surface-700/50">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center px-4">
      <div
        v-for="(stat, index) in stats"
        :key="stat.labelKey"
        class="flex flex-col items-center"
      >
        <div class="text-display-sm text-[#F0F0F8] font-bold">
          <span :ref="(el) => setStatRef(el, index)">0</span>
          <span v-if="stat.suffix">{{ stat.suffix }}</span>
        </div>
        <span class="text-sm text-[#6B6F8D] mt-1">
          {{ t(stat.labelKey) }}
        </span>
      </div>
    </div>
  </section>
</template>

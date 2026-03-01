<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  projects: any[]
}

const props = defineProps<Props>()

const gridRef = ref<HTMLElement | null>(null)
let tweens: gsap.core.Tween[] = []

function animateCards() {
  if (!gridRef.value) return

  const cards = gridRef.value.children
  if (!cards.length) return

  // Убиваем предыдущие анимации
  tweens.forEach(t => t.kill())
  tweens = []

  // Сначала сбрасываем все inline-стили от GSAP
  gsap.set(cards, { clearProps: 'all' })

  const tween = gsap.fromTo(
    cards,
    { opacity: 0, y: 40, filter: 'blur(16px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      overwrite: true,
    },
  )
  tweens.push(tween)
}

watch(
  () => props.projects,
  async () => {
    await nextTick()
    animateCards()
  },
)

onMounted(async () => {
  await nextTick()
  animateCards()
})

onUnmounted(() => {
  tweens.forEach(t => t.kill())
  tweens = []
})
</script>

<template>
  <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="project in projects"
      :key="project._path"
    >
      <ProjectCard :project="project" />
    </div>
  </div>
</template>

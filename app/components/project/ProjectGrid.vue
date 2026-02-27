<script setup lang="ts">
interface Props {
  projects: any[]
}

const props = defineProps<Props>()

const gridRef = ref<HTMLElement | null>(null)
const { gsap } = useGsap()

function animateCards() {
  if (!gridRef.value) return

  const cards = gridRef.value.children
  if (!cards.length) return

  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out',
      overwrite: true,
    },
  )
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
</script>

<template>
  <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="project in projects"
      :key="project._path"
      style="opacity: 0"
    >
      <ProjectCard :project="project" />
    </div>
  </div>
</template>

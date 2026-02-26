<script setup lang="ts">
interface Props {
  projects: any[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <AnimationScrollReveal
      v-for="(project, index) in projects"
      :key="project._path"
      animation="fadeUp"
      :delay="index * 0.05"
    >
      <ProjectCard :project="project" />
    </AnimationScrollReveal>
  </div>
</template>

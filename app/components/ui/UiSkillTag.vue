<script setup lang="ts">
interface Props {
  name: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <span
    class="
      inline-flex items-center gap-1.5
      bg-surface-800 hover:bg-surface-700
      text-text-secondary hover:text-text-light
      px-3 py-1.5 rounded-lg text-sm
      transition-colors duration-200
      select-none cursor-default
    "
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="16"
      class="shrink-0"
    />
    <span>{{ name }}</span>
  </span>
</template>

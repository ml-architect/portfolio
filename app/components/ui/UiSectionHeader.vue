<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  class?: string
}>()
</script>

<template>
  <div :class="$props.class">
    <h2 class="text-display-md font-semibold text-white">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-sm text-text-muted max-w-md mt-2">
      {{ subtitle }}
    </p>
  </div>
</template>

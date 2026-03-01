<script setup lang="ts">
defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-400 transition-colors"
  >
    <Icon name="ph:arrow-left" size="16" />
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  message: string
}>()
</script>

<template>
  <div class="text-center py-16">
    <Icon :name="icon" size="48" class="text-text-muted mb-4 opacity-50" />
    <p class="text-text-muted">{{ message }}</p>
  </div>
</template>

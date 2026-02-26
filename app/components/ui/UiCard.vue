<script setup lang="ts">
interface Props {
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
})

const classes = computed(() => [
  'bg-surface-800 rounded-card border border-surface-700/50',
  'transition-all duration-300',
  {
    'hover:border-surface-600 hover:bg-surface-700/50 hover:-translate-y-0.5': props.hover,
  },
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

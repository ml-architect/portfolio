<script setup lang="ts">
interface Props {
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
})

const classes = computed(() => [
  'bg-surface-800 rounded-card border border-white/[0.08]',
  'transition-all duration-300',
  {
    'hover:border-white/[0.2] hover:bg-surface-700/50 hover:-translate-y-0.5': props.hover,
  },
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

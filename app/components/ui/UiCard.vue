<script setup lang="ts">
interface Props {
  hover?: boolean
  variant?: 'default' | 'glass'
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  variant: 'default',
})

const classes = computed(() => [
  'rounded-card border transition-all duration-300',
  props.variant === 'glass'
    ? 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08]'
    : 'bg-surface-800 border-white/[0.08]',
  {
    'hover:border-white/[0.15] hover:bg-white/[0.05] hover:-translate-y-0.5': props.hover && props.variant === 'glass',
    'hover:border-white/[0.2] hover:bg-surface-700/50 hover:-translate-y-0.5': props.hover && props.variant === 'default',
  },
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

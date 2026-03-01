<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'commercial' | 'research'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-primary-500/10 text-primary-300',
  commercial: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  research: 'bg-primary-500/10 text-primary-400 border border-primary-500/20',
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
}

const classes = computed(() => [
  'inline-flex items-center rounded-badge font-medium whitespace-nowrap select-none',
  variantClasses[props.variant!],
  sizeClasses[props.size!],
])
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>

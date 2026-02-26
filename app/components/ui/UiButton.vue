<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
})

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20',
  secondary: 'bg-surface-700 hover:bg-surface-600 text-[#F0F0F8]',
  ghost: 'bg-transparent hover:bg-surface-800 text-[#A0A3BD]',
  outline: 'border border-surface-500 hover:border-primary-500 text-[#A0A3BD] hover:text-primary-300',
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-2.5',
}

const iconSizes: Record<NonNullable<Props['size']>, string> = {
  sm: '14',
  md: '16',
  lg: '18',
}

const classes = computed(() => [
  'inline-flex items-center justify-center font-medium rounded-button',
  'transition-all duration-200 ease-out',
  'hover:-translate-y-[1px] active:translate-y-0',
  'focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
  variantClasses[props.variant!],
  sizeClasses[props.size!],
  {
    'opacity-50 pointer-events-none': props.disabled || props.loading,
  },
])

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { type: props.type, disabled: props.disabled || props.loading }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="linkProps"
    :class="classes"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin shrink-0"
      :width="iconSizes[size!]"
      :height="iconSizes[size!]"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Icon -->
    <Icon
      v-else-if="icon"
      :name="icon"
      :size="iconSizes[size!]"
      class="shrink-0"
    />

    <!-- Text content -->
    <span>
      <slot />
    </span>
  </component>
</template>

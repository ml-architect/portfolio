<script setup lang="ts">
const { t } = useI18n()

interface Props {
  modelValue: string
}

defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

interface FilterOption {
  value: string
  labelKey: string
}

const filters: FilterOption[] = [
  { value: 'all', labelKey: 'filter.all' },
  { value: 'commercial', labelKey: 'filter.commercial' },
  { value: 'research', labelKey: 'filter.research' },
]
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      v-for="filter in filters"
      :key="filter.value"
      class="
        px-4 py-2 rounded-button text-sm font-medium
        border transition-all duration-200
      "
      :class="
        modelValue === filter.value
          ? 'bg-primary-500/10 text-primary-400 border-primary-500/20'
          : 'bg-surface-800 text-[#6B6F8D] border-surface-700/50 hover:text-[#A0A3BD] hover:border-surface-600'
      "
      @click="emit('update:modelValue', filter.value)"
    >
      {{ t(filter.labelKey) }}
    </button>
  </div>
</template>

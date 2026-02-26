<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="min-h-screen bg-surface-950 flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <p class="text-8xl font-bold gradient-text mb-6">
        {{ error.statusCode }}
      </p>
      <h1 class="text-2xl font-semibold text-[#F0F0F8] mb-3">
        {{ t('common.not_found') }}
      </h1>
      <p class="text-[#A0A3BD] mb-8">
        {{ t('common.not_found_text') }}
      </p>
      <button
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-button font-medium transition-all duration-200 hover:-translate-y-[1px]"
        @click="handleError"
      >
        <Icon name="ph:house" size="18" />
        {{ t('common.back_home') }}
      </button>
    </div>
  </div>
</template>

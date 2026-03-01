<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()

// Backdrop lives permanently in DOM, controlled by this flag.
// When modelValue turns true, backdrop starts transitioning immediately (no v-if delay).
// showContent is delayed by one frame so the card animates in after backdrop begins.
const showContent = ref(false)
let raf: number | null = null

watch(() => props.modelValue, (open) => {
  if (open) {
    // Content appears next frame — backdrop blur starts this frame
    raf = requestAnimationFrame(() => {
      showContent.value = true
    })
    document.addEventListener('keydown', onKeydown)
  } else {
    if (raf) cancelAnimationFrame(raf)
    showContent.value = false
    document.removeEventListener('keydown', onKeydown)
  }
})

function close(): void {
  emit('update:modelValue', false)
}

function onBackdropClick(): void {
  close()
}

function onModalClick(e: MouseEvent): void {
  e.stopPropagation()
}

function onDownload(): void {
  close()
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') close()
}

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop — always in DOM, no v-if, transitions via CSS classes -->
    <div
      :class="[
        'fixed inset-0 z-[60] transition-all duration-400 ease-out',
        modelValue
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      ]"
      @click="onBackdropClick"
    >
      <div
        :class="[
          'absolute inset-0 bg-black/60 transition-[backdrop-filter] duration-700 ease-out',
          modelValue ? 'backdrop-blur-xl' : 'backdrop-blur-0',
        ]"
      />

      <!-- Modal card -->
      <div class="relative z-10 flex items-center justify-center h-full px-4">
        <Transition name="resume-card">
          <div
            v-if="showContent"
            class="relative bg-surface-900 border border-white/[0.08] rounded-2xl p-6 w-full max-w-xs shadow-2xl"
            @click="onModalClick"
          >
            <!-- Close -->
            <button
              type="button"
              class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
              @click="close"
            >
              <Icon name="ph:x" size="16" />
            </button>

            <!-- Title -->
            <p class="text-sm font-medium text-white/60 mb-4">
              {{ t('resume.title') }}
            </p>

            <!-- Download buttons -->
            <div class="flex flex-col gap-2">
              <a
                href="/resume-ru.pdf"
                download
                class="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-800 border border-white/[0.06] hover:border-primary/30 hover:bg-primary/10 transition-all group"
                @click="onDownload"
              >
                <Icon name="ph:download-simple" size="18" class="text-white/40 group-hover:text-primary transition-colors" />
                <span class="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{{ t('resume.ru') }}</span>
                <span class="ml-auto text-[10px] font-semibold text-white/30 uppercase tracking-wider">PDF</span>
              </a>
              <a
                href="/resume-en.pdf"
                download
                class="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-800 border border-white/[0.06] hover:border-primary/30 hover:bg-primary/10 transition-all group"
                @click="onDownload"
              >
                <Icon name="ph:download-simple" size="18" class="text-white/40 group-hover:text-primary transition-colors" />
                <span class="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{{ t('resume.en') }}</span>
                <span class="ml-auto text-[10px] font-semibold text-white/30 uppercase tracking-wider">PDF</span>
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Card enter/leave */
.resume-card-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}
.resume-card-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.resume-card-enter-from {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
.resume-card-leave-to {
  transform: scale(0.98) translateY(4px);
  opacity: 0;
}
</style>

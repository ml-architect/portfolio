<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface NavLink {
  label: string
  to: RouteLocationRaw
}

const props = defineProps<{
  modelValue: boolean
  links: NavLink[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const route = useRoute()

function close(): void {
  emit('update:modelValue', false)
}

function onLinkClick(): void {
  close()
}

function isActive(to: RouteLocationRaw): boolean {
  const path = typeof to === 'string' ? to : (to as { path: string }).path ?? ''
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex flex-col bg-surface-950/95 backdrop-blur-xl"
      >
        <!-- Close button -->
        <div class="flex justify-end p-5">
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-button text-[#A0A3BD] hover:text-[#F0F0F8] hover:bg-surface-800 transition-colors duration-200"
            aria-label="Close menu"
            @click="close"
          >
            <Icon name="ph:x" size="24" />
          </button>
        </div>

        <!-- Navigation links -->
        <nav class="flex-1 flex flex-col items-center justify-center gap-2">
          <NuxtLink
            v-for="(link, index) in links"
            :key="String(link.to)"
            :to="link.to"
            :class="[
              'mobile-menu-link px-6 py-4 text-3xl font-semibold tracking-tight transition-colors duration-200',
              isActive(link.to)
                ? 'text-[#F0F0F8]'
                : 'text-[#6B6F8D] hover:text-[#F0F0F8]',
            ]"
            :style="{ transitionDelay: `${index * 60 + 80}ms` }"
            @click="onLinkClick"
          >
            <span class="relative">
              {{ link.label }}
              <span
                v-if="isActive(link.to)"
                class="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
              />
            </span>
          </NuxtLink>
        </nav>

        <!-- Language switcher at bottom -->
        <div class="flex justify-center pb-12">
          <LayoutLanguageSwitcher />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Overlay transition */
.mobile-menu-enter-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* Staggered link animation */
.mobile-menu-enter-active .mobile-menu-link {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    color 0.2s ease;
}

.mobile-menu-leave-active .mobile-menu-link {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease,
    color 0.2s ease;
}

.mobile-menu-enter-from .mobile-menu-link {
  opacity: 0;
  transform: translateY(16px);
}

.mobile-menu-leave-to .mobile-menu-link {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface NavLink {
  label: string
  to: RouteLocationRaw
}

defineProps<{
  links: NavLink[]
  vertical?: boolean
}>()

defineEmits<{
  navigate: []
}>()

const route = useRoute()

function isActive(to: RouteLocationRaw): boolean {
  const path = typeof to === 'string' ? to : (to as { path: string }).path ?? ''
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <nav
    :class="[
      'flex gap-1',
      vertical ? 'flex-col items-center gap-6' : 'items-center gap-1',
    ]"
  >
    <NuxtLink
      v-for="link in links"
      :key="String(link.to)"
      :to="link.to"
      :class="[
        'relative px-3 py-2 text-sm font-medium rounded-button transition-colors duration-200',
        vertical ? 'text-2xl px-4 py-3' : '',
        isActive(link.to)
          ? 'text-[#F0F0F8]'
          : 'text-[#A0A3BD] hover:text-[#F0F0F8]',
      ]"
      @click="$emit('navigate')"
    >
      {{ link.label }}
      <span
        v-if="isActive(link.to)"
        class="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-500 rounded-full"
        :class="vertical ? 'left-4 right-4' : ''"
      />
    </NuxtLink>
  </nav>
</template>

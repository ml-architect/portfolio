<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-950">
    <LayoutTheHeader />

    <main class="flex-1 pt-16">
      <slot />
    </main>

    <LayoutTheFooter />
  </div>
</template>

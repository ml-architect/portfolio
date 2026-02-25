<script setup lang="ts">
</script>

<template>
  <div
    class="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Grid pattern -->
    <div class="absolute inset-0 grid-pattern" />

    <!-- Radial gradient fade at edges -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #0a0b14 100%)"
    />

    <!-- Floating dots -->
    <div
      class="
        absolute w-1 h-1 rounded-full bg-primary-500/20
        animate-float
      "
      style="top: 15%; left: 20%; animation-delay: 0s;"
    />
    <div
      class="
        absolute w-1.5 h-1.5 rounded-full bg-primary-400/15
        animate-float
      "
      style="top: 45%; left: 75%; animation-delay: -2s;"
    />
    <div
      class="
        absolute w-1 h-1 rounded-full bg-primary-500/20
        animate-float
      "
      style="top: 70%; left: 35%; animation-delay: -4s;"
    />
    <div
      class="
        absolute w-2 h-2 rounded-full bg-primary-400/10
        animate-float
      "
      style="top: 25%; left: 85%; animation-delay: -1s;"
    />
    <div
      class="
        absolute w-1 h-1 rounded-full bg-primary-300/15
        animate-float
      "
      style="top: 80%; left: 60%; animation-delay: -3s;"
    />
    <div
      class="
        absolute w-1.5 h-1.5 rounded-full bg-primary-500/10
        animate-float
      "
      style="top: 10%; left: 50%; animation-delay: -5s;"
    />
  </div>
</template>

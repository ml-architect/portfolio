<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
let animationId = 0

// Simplex noise implementation (compact, no dependencies)
// Based on Stefan Gustavson's simplex noise
const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
]

const perm = new Uint8Array(512)
const permMod12 = new Uint8Array(512)

function seedNoise() {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255]
    permMod12[i] = perm[i] % 12
  }
}

function simplex3D(xin: number, yin: number, zin: number): number {
  const F3 = 1.0 / 3.0
  const G3 = 1.0 / 6.0
  const s = (xin + yin + zin) * F3
  const i = Math.floor(xin + s)
  const j = Math.floor(yin + s)
  const k = Math.floor(zin + s)
  const t = (i + j + k) * G3
  const x0 = xin - (i - t)
  const y0 = yin - (j - t)
  const z0 = zin - (k - t)

  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1 }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1 }
  }
  else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1 }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1 }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0 }
  }

  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3
  const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3
  const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3

  const ii = i & 255, jj = j & 255, kk = k & 255

  function contrib(gIdx: number, cx: number, cy: number, cz: number) {
    const t0 = 0.6 - cx * cx - cy * cy - cz * cz
    if (t0 < 0) return 0
    const g = GRAD3[gIdx]
    return t0 * t0 * t0 * t0 * (g[0] * cx + g[1] * cy + g[2] * cz)
  }

  const n0 = contrib(permMod12[ii + perm[jj + perm[kk]]], x0, y0, z0)
  const n1 = contrib(permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]], x1, y1, z1)
  const n2 = contrib(permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]], x2, y2, z2)
  const n3 = contrib(permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]], x3, y3, z3)

  return 32.0 * (n0 + n1 + n2 + n3)
}

seedNoise()

onMounted(async () => {
  // Wait for nextTick to ensure .client.vue refs are ready after SSR hydration
  await nextTick()

  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = 0
  let height = 0
  const spacing = 24
  const baseRadius = 1.2
  const maxRadiusAdd = 2.5
  const noiseScale = 0.025
  const timeSpeed = 0.0004

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = container!.clientWidth
    height = container!.clientHeight
    canvas!.width = width * dpr
    canvas!.height = height * dpr
    canvas!.style.width = `${width}px`
    canvas!.style.height = `${height}px`
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  function draw(time: number) {
    ctx!.clearRect(0, 0, width, height)

    const t = time * timeSpeed
    const cols = Math.ceil(width / spacing) + 1
    const rows = Math.ceil(height / spacing) + 1

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing
        const y = row * spacing

        // Noise value for this dot
        const n = simplex3D(x * noiseScale, y * noiseScale, t)
        // Normalize from [-1,1] to [0,1]
        const nNorm = (n + 1) * 0.5

        const radius = baseRadius + nNorm * maxRadiusAdd
        let alpha = 0.04 + nNorm * 0.12

        // Edge fade — dots near edges of container are more transparent
        const edgeFade = Math.min(
          x / 100,
          (width - x) / 100,
          y / 100,
          (height - y) / 100,
          1,
        )
        alpha *= Math.max(edgeFade, 0)

        if (alpha < 0.01) continue

        // Primary color: #22C55E = rgb(34, 197, 94)
        ctx!.beginPath()
        ctx!.arc(x, y, radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(34, 197, 94, ${alpha})`
        ctx!.fill()
      }
    }

    animationId = requestAnimationFrame(draw)
  }

  animationId = requestAnimationFrame(draw)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    resizeObserver.disconnect()
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="absolute inset-0" />
  </div>
</template>

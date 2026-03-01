<script setup lang="ts">
import { gsap } from 'gsap'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(
  'blog-posts',
  () =>
    queryContent('/blog')
      .where({ _locale: locale.value })
      .sort({ date: -1 })
      .find()
      .catch(() => []),
  { watch: [locale], default: () => [] },
)

const formattedDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

useSeoMeta({
  title: `${t('blog.title')} — ML Architect`,
  description: t('blog.subtitle'),
  ogTitle: `${t('blog.title')} — ML Architect`,
  ogDescription: t('blog.subtitle'),
})

const pageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!pageRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.blog-header', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
    })
  }, pageRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div ref="pageRef" class="max-w-4xl mx-auto py-24 px-6">
    <!-- Heading -->
    <header class="blog-header mb-12">
      <h1 class="text-display-md text-white font-display font-bold mb-2">
        {{ t('blog.title') }}
      </h1>
      <p class="text-lg text-[#545454]">
        {{ t('blog.subtitle') }}
      </p>
    </header>

    <!-- Blog posts -->
    <div v-if="posts?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimationScrollReveal
        v-for="(post, index) in posts"
        :key="post._path"
        animation="fadeUp"
        :delay="index * 0.05"
      >
        <NuxtLink
          :to="post._path"
          class="block"
        >
          <UiCard class="p-6 h-full flex flex-col">
            <span class="text-xs text-[#545454] mb-2">
              {{ formattedDate(post.date) }}
            </span>
            <h2 class="text-lg font-semibold text-white font-display mb-2">
              {{ post.title }}
            </h2>
            <p class="text-sm text-[#545454] line-clamp-3 flex-1">
              {{ post.description }}
            </p>
            <span class="text-sm text-emerald-400 mt-4 inline-flex items-center gap-1">
              {{ t('blog.read_more') }}
              <Icon name="ph:arrow-right" size="14" />
            </span>
          </UiCard>
        </NuxtLink>
      </AnimationScrollReveal>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-16">
      <Icon name="ph:article" size="48" class="text-[#545454] mb-4 opacity-50" />
      <p class="text-[#545454] text-lg">
        {{ t('blog.empty') }}
      </p>
    </div>
  </div>
</template>

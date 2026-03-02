<script setup lang="ts">
import { gsap } from 'gsap'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { formatDate } = useFormatDate()

const slug = computed(() => route.params.slug as string)

const { data: post } = await useAsyncData(
  `blog-post-${slug.value}`,
  () =>
    queryContent('/blog')
      .where({ _locale: locale.value, _path: { $contains: slug.value } })
      .findOne(),
  { watch: [locale] },
)

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  return formatDate(post.value.date, 'full')
})

useSeo(
  post.value ? `${post.value.title} — AI Architect` : 'AI Architect',
  post.value?.description || '',
)

const pageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!pageRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo('.blog-back-link', {
      y: 20,
      opacity: 0,
      filter: 'blur(10px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.fromTo('.blog-post-header', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      delay: 0.1,
      ease: 'power2.out',
    })

    gsap.fromTo('.blog-post-body', {
      y: 40,
      opacity: 0,
      filter: 'blur(16px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: 0.25,
      ease: 'power2.out',
    })
  }, pageRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div ref="pageRef" class="max-w-4xl mx-auto py-24 px-6">
    <!-- Back link -->
    <UiBackLink
      :to="localePath('/blog')"
      :label="t('blog.title')"
      class="blog-back-link mb-8"
    />

    <template v-if="post">
      <!-- Header -->
      <header class="blog-post-header mb-12">
        <h1 class="text-display-md text-white font-display font-bold mb-4">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-4 text-sm text-text-muted">
          <span v-if="formattedDate" class="flex items-center gap-2">
            <Icon name="ph:calendar" size="16" />
            {{ formattedDate }}
          </span>
        </div>
      </header>

      <!-- Body -->
      <article class="blog-post-body prose prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </article>
    </template>

    <!-- Not found -->
    <UiEmptyState
      v-else
      icon="ph:warning"
      :message="t('common.not_found')"
    />
  </div>
</template>

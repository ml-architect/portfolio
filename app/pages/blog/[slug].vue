<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

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
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.value.date))
})

useSeoMeta({
  title: () => post.value ? `${post.value.title} — ML Architect` : 'ML Architect',
  description: () => post.value?.description || '',
  ogTitle: () => post.value ? `${post.value.title} — ML Architect` : 'ML Architect',
  ogDescription: () => post.value?.description || '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-24 px-6">
    <!-- Back link -->
    <NuxtLink
      :to="localePath('/blog')"
      class="
        inline-flex items-center gap-2 text-sm text-[#545454]
        hover:text-primary-400 transition-colors mb-8
      "
    >
      <Icon name="ph:arrow-left" size="16" />
      {{ t('blog.title') }}
    </NuxtLink>

    <template v-if="post">
      <!-- Header -->
      <header class="mb-12">
        <h1 class="text-display-md text-white font-display font-bold mb-4">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-4 text-sm text-[#545454]">
          <span v-if="formattedDate" class="flex items-center gap-2">
            <Icon name="ph:calendar" size="16" />
            {{ formattedDate }}
          </span>
        </div>
      </header>

      <!-- Body -->
      <article class="prose prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </article>
    </template>

    <!-- Not found -->
    <div v-else class="text-center py-16">
      <Icon name="ph:warning" size="48" class="text-[#545454] mb-4" />
      <p class="text-[#545454]">{{ t('common.not_found') }}</p>
    </div>
  </div>
</template>

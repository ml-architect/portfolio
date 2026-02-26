<script setup lang="ts">
const { t } = useI18n()

interface Skill {
  name: string
  icon: string
}

interface SkillGroup {
  title: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Backend',
    skills: [
      { name: 'Python', icon: 'simple-icons:python' },
      { name: 'FastAPI', icon: 'simple-icons:fastapi' },
      { name: 'asyncio', icon: 'ph:lightning' },
      { name: 'WebSocket', icon: 'ph:plugs-connected' },
    ],
  },
  {
    title: 'ML/AI',
    skills: [
      { name: 'PyTorch', icon: 'simple-icons:pytorch' },
      { name: 'Transformers', icon: 'noto:hugging-face' },
      { name: 'LangChain', icon: 'ph:chain' },
      { name: 'Ollama', icon: 'ph:robot' },
      { name: 'CatBoost', icon: 'ph:chart-line-up' },
    ],
  },
  {
    title: 'Data',
    skills: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'Redis', icon: 'simple-icons:redis' },
      { name: 'Elasticsearch', icon: 'simple-icons:elasticsearch' },
      { name: 'pgvector', icon: 'ph:vector-three' },
    ],
  },
  {
    title: 'Infrastructure',
    skills: [
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'GitLab CI/CD', icon: 'simple-icons:gitlab' },
      { name: 'Traefik', icon: 'ph:traffic-sign' },
      { name: 'Grafana', icon: 'simple-icons:grafana' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue 3', icon: 'simple-icons:vuedotjs' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
      { name: 'Nuxt', icon: 'simple-icons:nuxtdotjs' },
    ],
  },
]

interface ContactLink {
  icon: string
  label: string
  href: string
}

const contacts: ContactLink[] = [
  { icon: 'simple-icons:github', label: 'GitHub', href: 'https://github.com/versus666jzx' },
  { icon: 'simple-icons:telegram', label: 'Telegram', href: 'https://t.me/andrew_the_one' },
  { icon: 'ph:envelope-simple', label: 'Email', href: 'mailto:mattias666@mail.ru' },
]

useSeoMeta({
  title: `${t('about.title')} — ML Architect`,
  description: t('about.bio_1'),
  ogTitle: `${t('about.title')} — ML Architect`,
  ogDescription: t('about.bio_1'),
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-24 px-6">
    <!-- Heading -->
    <header class="mb-12">
      <h1 class="text-display-md text-white font-display font-bold mb-2">
        {{ t('about.title') }}
      </h1>
      <p class="text-lg text-primary-400">
        {{ t('about.subtitle') }}
      </p>
    </header>

    <!-- Bio -->
    <AnimationScrollReveal animation="fadeUp">
      <section class="mb-16 space-y-4">
        <p class="text-[#545454] text-lg leading-relaxed">
          {{ t('about.bio_1') }}
        </p>
        <p class="text-[#545454] text-lg leading-relaxed">
          {{ t('about.bio_2') }}
        </p>
      </section>
    </AnimationScrollReveal>

    <!-- Skills -->
    <AnimationScrollReveal animation="fadeUp" :delay="0.1">
      <section class="mb-16">
        <h2 class="text-display-sm text-white font-display font-bold mb-8">
          {{ t('about.skills_title') }}
        </h2>
        <div class="space-y-6">
          <div
            v-for="group in skillGroups"
            :key="group.title"
            class="bg-surface-800 rounded-card border border-[#1e1e1e] p-5"
          >
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {{ group.title }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <UiSkillTag
                v-for="skill in group.skills"
                :key="skill.name"
                :name="skill.name"
                :icon="skill.icon"
              />
            </div>
          </div>
        </div>
      </section>
    </AnimationScrollReveal>

    <!-- Contact -->
    <AnimationScrollReveal animation="fadeUp" :delay="0.2">
      <section>
        <h2 class="text-display-sm text-white font-display font-bold mb-8">
          {{ t('sections.contact') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            v-for="contact in contacts"
            :key="contact.label"
            :href="contact.href"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <UiCard class="p-6 flex flex-col items-center gap-3 text-center">
              <Icon :name="contact.icon" size="32" class="text-primary-400" />
              <span class="text-white font-medium">{{ contact.label }}</span>
            </UiCard>
          </a>
        </div>
      </section>
    </AnimationScrollReveal>
  </div>
</template>

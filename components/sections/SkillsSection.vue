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
      { name: 'OpenAI', icon: 'simple-icons:openai' },
      { name: 'vLLM', icon: 'ph:brain' },
      { name: 'CrewAI', icon: 'simple-icons:crewai' },
      { name: 'Ray', icon: 'ph:rays' },
    ],
  },
  {
    title: 'Data',
    skills: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'Redis', icon: 'simple-icons:redis' },
      { name: 'Elasticsearch', icon: 'simple-icons:elasticsearch' },
      { name: 'pgvector', icon: 'ph:vector-three' },
      { name: 'SQLite', icon: 'simple-icons:sqlite' },
      { name: 'DuckDB', icon: 'simple-icons:duckdb' },
      { name: 'Milvus', icon: 'logos:milvus-icon' },
      { name: 'FAISS', icon: 'ph:magnifying-glass' },
    ],
  },
  {
    title: 'Infrastructure',
    skills: [
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'GitLab CI/CD', icon: 'simple-icons:gitlab' },
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
</script>

<template>
  <section class="max-w-6xl mx-auto py-24 px-4">
    <!-- Heading -->
    <div class="text-center mb-12">
      <h2 class="text-display-sm text-[#F0F0F8] font-bold">
        {{ t('sections.skills') }}
      </h2>
      <p class="text-[#A0A3BD] mt-3">
        {{ t('sections.skills_subtitle') }}
      </p>
    </div>

    <!-- Skill groups -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimationScrollReveal
        v-for="(group, index) in skillGroups"
        :key="group.title"
        animation="fadeUp"
        :delay="index * 0.1"
      >
        <UiCard class="p-6 h-full">
          <h3 class="text-lg font-semibold text-[#F0F0F8] mb-4">
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
        </UiCard>
      </AnimationScrollReveal>
    </div>
  </section>
</template>

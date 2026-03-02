<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

// --- Data ---

interface Metric {
  value: number
  suffix: string
  labelKey: string
}

const metrics: Metric[] = [
  { value: 18, suffix: '+', labelKey: 'about.metrics_projects' },
  { value: 16, suffix: '', labelKey: 'about.metrics_commercial' },
  { value: 5, suffix: '+', labelKey: 'about.metrics_experience' },
  { value: 40, suffix: '+', labelKey: 'about.metrics_technologies' },
]

interface ExpertiseCard {
  icon: string
  color: string
  titleKey: string
  descKey: string
  exampleKey: string
}

const expertiseCards: ExpertiseCard[] = [
  {
    icon: 'ph:brain-bold',
    color: 'text-purple-400 bg-purple-500/10',
    titleKey: 'about.exp_llm_title',
    descKey: 'about.exp_llm_desc',
    exampleKey: 'about.exp_llm_example',
  },
  {
    icon: 'ph:eye-bold',
    color: 'text-blue-400 bg-blue-500/10',
    titleKey: 'about.exp_cv_title',
    descKey: 'about.exp_cv_desc',
    exampleKey: 'about.exp_cv_example',
  },
  {
    icon: 'ph:code-bold',
    color: 'text-green-400 bg-green-500/10',
    titleKey: 'about.exp_backend_title',
    descKey: 'about.exp_backend_desc',
    exampleKey: 'about.exp_backend_example',
  },
  {
    icon: 'ph:cube-bold',
    color: 'text-amber-400 bg-amber-500/10',
    titleKey: 'about.exp_mlops_title',
    descKey: 'about.exp_mlops_desc',
    exampleKey: 'about.exp_mlops_example',
  },
]

interface Differentiator {
  icon: string
  titleKey: string
  descKey: string
}

const differentiators: Differentiator[] = [
  { icon: 'ph:rocket-launch-bold', titleKey: 'about.diff_ownership_title', descKey: 'about.diff_ownership_desc' },
  { icon: 'ph:cpu-bold', titleKey: 'about.diff_prod_title', descKey: 'about.diff_prod_desc' },
  { icon: 'ph:flow-arrow-bold', titleKey: 'about.diff_e2e_title', descKey: 'about.diff_e2e_desc' },
  { icon: 'ph:package-bold', titleKey: 'about.diff_code_title', descKey: 'about.diff_code_desc' },
]

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
      { name: 'Pydantic', icon: 'ph:shield-check' },
      { name: 'SQLAlchemy', icon: 'ph:database' },
      { name: 'aiogram 3', icon: 'ph:telegram-logo' },
      { name: 'WebSocket', icon: 'ph:plugs-connected' },
      { name: 'gRPC', icon: 'ph:arrows-left-right' },
    ],
  },
  {
    title: 'ML/AI',
    skills: [
      { name: 'PyTorch', icon: 'simple-icons:pytorch' },
      { name: 'TensorFlow', icon: 'simple-icons:tensorflow' },
      { name: 'Transformers', icon: 'simple-icons:huggingface' },
      { name: 'scikit-learn', icon: 'simple-icons:scikitlearn' },
      { name: 'LangChain', icon: 'ph:chain' },
      { name: 'OpenCV', icon: 'simple-icons:opencv' },
      { name: 'YOLOv8', icon: 'ph:bounding-box' },
      { name: 'Ollama', icon: 'ph:robot' },
      { name: 'vLLM', icon: 'ph:lightning' },
      { name: 'NVIDIA Triton', icon: 'ph:gpu' },
      { name: 'TensorRT', icon: 'ph:lightning' },
      { name: 'CatBoost', icon: 'ph:chart-line-up' },
      { name: 'RAG', icon: 'ph:files' },
      { name: 'QLoRA', icon: 'ph:faders' },
    ],
  },
  {
    title: 'Data',
    skills: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'Redis', icon: 'simple-icons:redis' },
      { name: 'Elasticsearch', icon: 'simple-icons:elasticsearch' },
      { name: 'pgvector', icon: 'ph:vector-three' },
      { name: 'FAISS', icon: 'ph:magnifying-glass' },
      { name: 'Milvus', icon: 'ph:database' },
      { name: 'DuckDB', icon: 'simple-icons:duckdb' },
    ],
  },
  {
    title: 'Infrastructure',
    skills: [
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'GitLab CI/CD', icon: 'simple-icons:gitlab' },
      { name: 'GitHub Actions', icon: 'simple-icons:githubactions' },
      { name: 'Traefik', icon: 'ph:traffic-sign' },
      { name: 'Nginx', icon: 'simple-icons:nginx' },
      { name: 'Grafana', icon: 'simple-icons:grafana' },
      { name: 'Prometheus', icon: 'simple-icons:prometheus' },
      { name: 'VMware', icon: 'simple-icons:vmware' },
      { name: 'ClearML', icon: 'ph:flask' },
      { name: 'Roboflow', icon: 'ph:camera' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue 3', icon: 'simple-icons:vuedotjs' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
      { name: 'Nuxt', icon: 'simple-icons:nuxtdotjs' },
      { name: 'Streamlit', icon: 'simple-icons:streamlit' },
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

// --- SEO ---

useSeo(`${t('about.title')} — AI Architect`, t('about.intro'))

// --- Animations ---

const pageRef = ref<HTMLElement | null>(null)
const numberRefs = ref<(HTMLElement | null)[]>([])

const setNumberRef = (el: any, index: number) => {
  numberRefs.value[index] = el as HTMLElement | null
}

onMounted(() => {
  if (!pageRef.value) return

  const ctx = gsap.context(() => {
    // Hero blur-in
    gsap.fromTo('.about-hero', {
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

    // Metrics counter animation
    numberRefs.value.forEach((el, index) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: metrics[index].value,
        duration: 4,
        delay: 0.6 + index * 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString()
        },
      })
    })

    // Metrics cards stagger
    gsap.fromTo('.metric-card', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power2.out',
    })

    // Expertise cards stagger
    gsap.fromTo('.expertise-card', {
      y: 40,
      opacity: 0,
      filter: 'blur(16px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.expertise-grid',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    })

    // Differentiator cards stagger
    gsap.fromTo('.diff-card', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.diff-grid',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    })

    // Skill groups stagger
    gsap.fromTo('.skill-group', {
      y: 30,
      opacity: 0,
      filter: 'blur(12px)',
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    })
  }, pageRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <div ref="pageRef" class="max-w-5xl mx-auto py-24 px-6">
    <!-- 1. Hero -->
    <header class="about-hero mb-16">
      <AnimationAnimatedText
        :text="t('about.title')"
        tag="h1"
        class="text-display-md text-white font-display font-bold mb-3"
      />
      <p class="text-lg text-green-400 mb-6">
        {{ t('about.subtitle') }}
      </p>
      <p class="text-lg text-text-secondary leading-relaxed max-w-3xl">
        {{ t('about.intro') }}
      </p>
    </header>

    <!-- 2. Metrics -->
    <section class="mb-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UiCard
          v-for="(metric, index) in metrics"
          :key="metric.labelKey"
          variant="glass"
          class="metric-card p-5 text-center"
        >
          <div class="text-display-sm text-white font-bold">
            <span :ref="(el) => setNumberRef(el, index)">0</span>
            <span v-if="metric.suffix" class="text-green-400">{{ metric.suffix }}</span>
          </div>
          <p class="text-sm text-text-dimmed mt-1">{{ t(metric.labelKey) }}</p>
        </UiCard>
      </div>
    </section>

    <!-- 3. Story -->
    <AnimationScrollReveal animation="fadeUp">
      <section class="mb-20">
        <h2 class="text-display-md text-white font-display font-semibold mb-8">
          {{ t('about.story_title') }}
        </h2>
        <div class="space-y-5 max-w-3xl">
          <p class="text-lg text-text-secondary leading-relaxed">
            {{ t('about.story_1') }}
          </p>
          <p class="text-lg text-text-secondary leading-relaxed">
            {{ t('about.story_2') }}
          </p>
          <p class="text-lg text-text-secondary leading-relaxed">
            {{ t('about.story_3') }}
          </p>
        </div>
      </section>
    </AnimationScrollReveal>

    <!-- 4. Expertise -->
    <AnimationScrollReveal animation="fadeUp" :delay="0.1">
      <section class="mb-20">
        <h2 class="text-display-md text-white font-display font-semibold mb-8">
          {{ t('about.expertise_title') }}
        </h2>
        <div class="expertise-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          <UiCard
            v-for="card in expertiseCards"
            :key="card.titleKey"
            variant="glass"
            class="expertise-card p-6"
          >
            <div class="w-10 h-10 rounded-full flex items-center justify-center mb-4" :class="card.color.split(' ')[1]">
              <Icon :name="card.icon" size="24" :class="card.color.split(' ')[0]" />
            </div>
            <h3 class="text-lg text-white font-semibold mb-2">
              {{ t(card.titleKey) }}
            </h3>
            <p class="text-sm text-text-secondary leading-relaxed mb-3">
              {{ t(card.descKey) }}
            </p>
            <p class="text-xs text-text-dimmed">
              {{ t(card.exampleKey) }}
            </p>
          </UiCard>
        </div>
      </section>
    </AnimationScrollReveal>

    <!-- 5. Differentiators -->
    <AnimationScrollReveal animation="fadeUp" :delay="0.1">
      <section class="mb-20">
        <h2 class="text-display-md text-white font-display font-semibold mb-8">
          {{ t('about.diff_title') }}
        </h2>
        <div class="diff-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <UiCard
            v-for="diff in differentiators"
            :key="diff.titleKey"
            variant="glass"
            class="diff-card p-5"
          >
            <Icon :name="diff.icon" size="28" class="text-green-400 mb-3" />
            <h3 class="text-sm text-white font-semibold mb-1">
              {{ t(diff.titleKey) }}
            </h3>
            <p class="text-xs text-text-dimmed leading-relaxed">
              {{ t(diff.descKey) }}
            </p>
          </UiCard>
        </div>
      </section>
    </AnimationScrollReveal>

    <!-- 6. Technologies -->
    <AnimationScrollReveal animation="fadeUp" :delay="0.1">
      <section class="mb-20">
        <h2 class="text-display-md text-white font-display font-semibold mb-8">
          {{ t('about.skills_title') }}
        </h2>
        <div class="skills-grid space-y-4">
          <UiCard
            v-for="group in skillGroups"
            :key="group.title"
            variant="glass"
            class="skill-group p-5"
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
          </UiCard>
        </div>
      </section>
    </AnimationScrollReveal>

    <!-- 7. Contact -->
    <AnimationScrollReveal animation="fadeUp" :delay="0.2">
      <section>
        <h2 class="text-display-md text-white font-display font-semibold mb-2">
          {{ t('about.contact_title') }}
        </h2>
        <p class="text-sm text-text-dimmed mb-8">
          {{ t('about.contact_subtitle') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            v-for="contact in contacts"
            :key="contact.label"
            :href="contact.href"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <UiCard variant="glass" class="p-6 flex flex-col items-center gap-3 text-center">
              <Icon :name="contact.icon" size="32" class="text-green-400" />
              <span class="text-white font-medium">{{ contact.label }}</span>
            </UiCard>
          </a>
        </div>
      </section>
    </AnimationScrollReveal>
  </div>
</template>

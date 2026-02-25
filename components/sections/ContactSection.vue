<script setup lang="ts">
const { t } = useI18n()

interface ContactLink {
  icon: string
  label: string
  href: string
}

const contacts: ContactLink[] = [
  {
    icon: 'simple-icons:github',
    label: 'GitHub',
    href: 'https://github.com/ml-architect',
  },
  {
    icon: 'simple-icons:telegram',
    label: 'Telegram',
    href: 'https://t.me/ml_architect',
  },
  {
    icon: 'ph:envelope-simple',
    label: 'Email',
    href: 'mailto:contact@example.com',
  },
]
</script>

<template>
  <section class="py-24 px-4">
    <!-- Heading -->
    <div class="text-center mb-12">
      <h2 class="text-display-sm text-[#F0F0F8] font-bold">
        {{ t('sections.contact') }}
      </h2>
      <p class="text-[#A0A3BD] mt-3">
        {{ t('sections.contact_subtitle') }}
      </p>
    </div>

    <!-- Contact cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      <AnimationScrollReveal
        v-for="(contact, index) in contacts"
        :key="contact.label"
        animation="fadeUp"
        :delay="index * 0.1"
      >
        <a
          :href="contact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="block"
        >
          <UiCard class="p-6 flex flex-col items-center gap-3 text-center">
            <Icon
              :name="contact.icon"
              size="32"
              class="text-primary-400"
            />
            <span class="text-[#F0F0F8] font-medium">
              {{ contact.label }}
            </span>
          </UiCard>
        </a>
      </AnimationScrollReveal>
    </div>
  </section>
</template>

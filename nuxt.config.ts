export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    baseURL: '/portfolio/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/portfolio/favicon.svg' },
      ],
      meta: [
        { name: 'description', content: 'Portfolio of an ML Engineer & Software Architect' },
        { property: 'og:title', content: 'ML Architect Portfolio' },
        { property: 'og:description', content: 'Portfolio of an ML Engineer & Software Architect' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#0a0b14' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/icon',
  ],

  css: ['~/assets/css/main.css'],

  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  content: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    highlight: {
      theme: 'github-dark',
      langs: ['python', 'typescript', 'javascript', 'bash', 'yaml', 'json', 'sql', 'dockerfile'],
    },
    markdown: {
      anchorLinks: false,
    },
  },

  i18n: {
    restructureDir: false,
    locales: [
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      fallbackLocale: 'ru',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
  },

  icon: {
    size: '24px',
    class: 'icon',
  },

  compatibilityDate: '2025-01-01',
})

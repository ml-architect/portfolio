export default defineNuxtConfig({
  srcDir: 'app/',

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
        { property: 'og:title', content: 'AI Architect Portfolio' },
        { property: 'og:description', content: 'Portfolio of an ML Engineer & Software Architect' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#000000' },
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=107082980','ym');ym(107082980,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
        },
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/107082980" style="position:absolute; left:-9999px;" alt="" /></div>',
        },
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

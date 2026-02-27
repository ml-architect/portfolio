# Portfolio — ml-architect.github.io/portfolio

Сайт-портфолио с блогом, хостится на GitHub Pages (SSG).

## Стек технологий

### Core
- **Nuxt 3** — режим SSG (`nuxi generate`), `srcDir: 'app/'`
- **Vue 3** — Composition API + `<script setup>`
- **TypeScript**

### Стилизация
- **Tailwind CSS v4** — через `@nuxtjs/tailwindcss` + `@tailwindcss/typography`
- Тема оформления — тёмная (единственная, без переключателя)
- Кастомная дизайн-система в `tailwind.config.ts`:
  - Цвета: `primary` (фиолетовый #6C63FF), `surface` (чёрно-серые оттенки)
  - Шрифты: `Sora` (sans/display), `JetBrains Mono` (mono)
  - Кастомные fontSize: `display-hero`, `display-xl/lg/md/sm`, `marquee`
  - Кастомные borderRadius: `card`, `card-inner`, `button`, `badge`
  - Анимации: `shimmer`, `float`, `pulse-slow`, `spin-slow`

### Контент
- **@nuxt/content** — Markdown-контент для страниц проектов и блога
- Подсветка синтаксиса: `github-dark` (Python, TS, JS, Bash, YAML, JSON, SQL, Dockerfile)

### Интернационализация
- **@nuxtjs/i18n**
- Стратегия: `prefix_except_default`
- Язык по умолчанию: русский (`ru`)
- Второй язык: английский (`en`)
- Маршруты: `/about`, `/blog`, `/projects` (рус.) → `/en/about`, `/en/blog`, `/en/projects` (англ.)
- Переключатель языка на странице — мгновенная смена через `switchLocalePath()`
- Переводы хранятся в JSON-файлах (`app/locales/ru.json`, `app/locales/en.json`)

### Анимации
- **GSAP** — все плагины (ScrollTrigger, SplitText, ScrollSmoother, Flip, DrawSVG и др.)
- Регистрация плагинов через Nuxt-plugin (`app/plugins/gsap.client.ts`)

### Иконки
- **@nuxt/icon** — Iconify (коллекции: `mdi`, `ph`, `simple-icons`, `noto`)

### SEO
- OG-метатеги через `app.head` в `nuxt.config.ts`
- `<html lang>` автоматически через i18n

### Деплой
- **GitHub Actions** (`.github/workflows/deploy.yml`) → GitHub Pages
- Команда сборки: `nuxi generate`
- Выходная директория: `.output/public` (симлинк `dist`)
- `baseURL: '/portfolio/'`

## Git-ветки
- `main` — продакшен
- `dev` — разработка
- `glass` — текущая ветка (дизайн в стиле glass)

## Ограничения GitHub Pages (учтены в стеке)
- Только статика — никакого SSR, API-роутов, серверных middleware
- Нет серверных редиректов — маршрутизация клиентская (vue-router)
- 404-обработка через кастомный `404.html`
- Все страницы обоих языков пре-рендерятся при сборке
- Форма обратной связи — без бэкенда (mailto или внешний сервис)
- Максимальный размер репозитория: 1 GB, размер файла: 100 MB

## Структура проекта
```
├── app/                        # Исходный код (srcDir)
│   ├── app.vue                 # Корневой компонент
│   ├── error.vue               # Страница ошибки
│   ├── assets/css/             # Стили (main.css, tailwind.css)
│   ├── components/
│   │   ├── animation/          # AnimatedText, GridBackground, ScrollReveal
│   │   ├── layout/             # TheHeader, TheFooter, TheNavigation, TheMobileMenu, LanguageSwitcher
│   │   ├── project/            # ProjectCard, ProjectFilter, ProjectGrid
│   │   ├── sections/           # HeroSection, FeaturedProjects, FeaturedProjectCard, SkillsSection, StatsSection, MarqueeSection, ContactSection
│   │   └── ui/                 # UiBadge, UiButton, UiCard, UiDivider, UiSkillTag
│   ├── composables/            # useGsap, useScrollAnimation
│   ├── content/                # Markdown-контент (@nuxt/content)
│   │   ├── ru/                 # Русскоязычный контент
│   │   │   ├── blog/
│   │   │   └── projects/       # 19 проектов
│   │   └── en/                 # Англоязычный контент
│   │       ├── blog/
│   │       └── projects/       # 19 проектов
│   ├── layouts/                # default.vue
│   ├── locales/                # ru.json, en.json
│   ├── pages/
│   │   ├── index.vue           # Главная
│   │   ├── about.vue           # О себе
│   │   ├── blog/               # index.vue, [slug].vue
│   │   └── projects/           # index.vue, [slug].vue
│   ├── plugins/                # gsap.client.ts
│   ├── public/                 # favicon.svg
│   └── types/                  # project.ts
├── docs/                       # Документация и референсы
│   ├── design-brief.md         # Дизайн-бриф проекта
│   ├── portfolio-inspiration.md # Вдохновение для портфолио
│   ├── glass/                  # Референсы glass-дизайна (Linear, Vercel, Reflect и др.)
│   └── ui_ux_tips_and_tricks/  # Конспекты по UI/UX
├── project_analyze_results/    # Аналитика проектов (исходные данные для контента)
├── .github/workflows/          # deploy.yml
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Справочные материалы

### UI/UX дизайн (`docs/ui_ux_tips_and_tricks/`)
Конспекты видеоуроков — референс при создании компонентов, анимаций и визуального оформления:
- **11 Micro Animations...** — hover-эффекты, toast-уведомления, анимации клавиш
- **4 UI Design Hacks...** — контекстные иллюстрации, doodle-элементы, декоративные акценты
- **7 UI UX mistakes...** — типичные ошибки (user flow, состояния, навигация)
- **How to think like a GENIUS...** — user intent, паттерны компоновки
- **The 7 Color Mistakes...** — правило 60-30-10, тёмная тема, состояния элементов
- **The 8 UI UX Cheat Codes...** — кернинг, вложенные скругления, letter-spacing
- **Top 5 Advanced UX UI...** — персонализация, адаптивный поиск

### Glass-дизайн (`docs/glass/`)
Детальные разборы референсных сайтов для glass-стиля: Linear, Vercel, Reflect, Robinhood, Spotify Wrapped, Tomorrow.io, Apple Liquid Glass.

### Аналитика проектов (`project_analyze_results/`)
Подробные аналитические документы по проектам — используются как исходные данные при написании Markdown-контента для `app/content/`.

## Правила разработки
- Весь UI — тёмная тема, без light mode
- Компоненты — `<script setup lang="ts">` + Composition API
- GSAP-анимации — только в `.client.ts` плагинах и `onMounted()`
- Контент блога и проектов — Markdown в `app/content/`
- Все тексты интерфейса — через i18n (`$t('key')`)
- Коммиты — на русском языке

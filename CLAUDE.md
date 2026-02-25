# Portfolio — ml-architect.github.io/portfolio

Сайт-портфолио с блогом, хостится на GitHub Pages (SSG).

## Стек технологий

### Core
- **Nuxt 3** — режим SSG (`nuxi generate`)
- **Vue 3** — Composition API + `<script setup>`
- **TypeScript**

### Стилизация
- **Tailwind CSS v4** — через `@nuxtjs/tailwindcss`
- Тема оформления — тёмная (единственная, без переключателя)

### Контент
- **@nuxt/content** — Markdown-контент для страниц проектов и блога

### Интернационализация
- **@nuxtjs/i18n**
- Стратегия: `prefix_except_default`
- Язык по умолчанию: русский (`ru`)
- Второй язык: английский (`en`)
- Маршруты: `/about`, `/blog` (рус.) → `/en/about`, `/en/blog` (англ.)
- Переключатель языка на странице — мгновенная смена через `switchLocalePath()`
- Переводы хранятся в JSON-файлах (`locales/ru.json`, `locales/en.json`)

### Анимации
- **GSAP** — все плагины (ScrollTrigger, SplitText, ScrollSmoother, Flip, DrawSVG и др.)
- Регистрация плагинов через Nuxt-plugin (`plugins/gsap.client.ts`)

### Иконки
- **@nuxt/icon** — Iconify (200k+ иконок)

### SEO
- **@nuxtjs/seo** — sitemap, robots.txt, OG-метатеги
- `<html lang>` автоматически через i18n
- hreflang-теги для мультиязычности

### Деплой
- **GitHub Actions** → GitHub Pages
- Команда сборки: `nuxi generate`
- Выходная директория: `.output/public`
- `baseURL: '/portfolio/'`

## Ограничения GitHub Pages (учтены в стеке)
- Только статика — никакого SSR, API-роутов, серверных middleware
- Нет серверных редиректов — маршрутизация клиентская (vue-router)
- 404-обработка через кастомный `404.html`
- Все страницы обоих языков пре-рендерятся при сборке
- Форма обратной связи — без бэкенда (mailto или внешний сервис)
- Максимальный размер репозитория: 1 GB, размер файла: 100 MB

## Структура проекта (целевая)
```
├── assets/            # Стили, шрифты, статичные ресурсы
├── components/        # Vue-компоненты
├── composables/       # Композиции (useGsap и др.)
├── content/           # Markdown-контент (@nuxt/content)
│   ├── ru/            # Русскоязычный контент
│   │   ├── blog/
│   │   └── projects/
│   └── en/            # Англоязычный контент
│       ├── blog/
│       └── projects/
├── layouts/           # Layouts (default)
├── locales/           # Переводы i18n
│   ├── ru.json
│   └── en.json
├── pages/             # Страницы (файловая маршрутизация)
├── plugins/           # Nuxt-плагины (gsap.client.ts)
├── public/            # Статичные файлы (favicon, og-images)
├── .github/workflows/ # GitHub Actions
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

## Справочные материалы по UI/UX дизайну

В `docs/ui_ux_tips_and_tricks/` хранятся конспекты видеоуроков по UI/UX дизайну. Используй их как референс при создании компонентов, анимаций и визуального оформления:

- **11 Micro Animations That Will Instantly Level Up Your UI.txt** — 11 микроанимаций (hover-эффекты кнопок, toast-уведомления, анимации клавиш и др.) с примерами из Linear, Apple, Vercel
- **4 UI Design Hacks to KILL boring designs.txt** — 4 приёма для оживления скучного дизайна: контекстные иллюстрации, doodle-элементы, декоративные акценты
- **7 UI UX mistakes that SCREAM you're a beginner.txt** — 7 типичных ошибок начинающих дизайнеров (user flow, состояния, навигация) с примерами до/после
- **How to think like a GENIUS UI UX designer.txt** — принципы проектирования: user intent, устоявшиеся паттерны компоновки, множественные намерения пользователя
- **The 7 Color Mistakes that RUIN your UI Designs.txt** — ошибки в работе с цветом: правило 60-30-10, построение тёмной темы, состояния элементов
- **The 8 UI UX Cheat Codes for INSTANTLY Better Designs.txt** — 8 быстрых правил: кернинг крупного текста, вложенные скругления, letter-spacing и др.
- **Top 5 Advanced UX UI Design Tips and Tricks - Part 3.txt** — продвинутые приёмы: персонализация по сегментам, адаптивный поиск, пост-покупочный UX

## Правила разработки
- Весь UI — тёмная тема, без light mode
- Компоненты — `<script setup lang="ts">` + Composition API
- GSAP-анимации — только в `.client.ts` плагинах и `onMounted()`
- Контент блога и проектов — Markdown в `content/`
- Все тексты интерфейса — через i18n (`$t('key')`)
- Коммиты — на русском языке

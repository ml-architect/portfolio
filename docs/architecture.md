# Архитектура проекта

Техническая документация по архитектуре портфолио.

## Обзор

Проект представляет собой статический сайт-портфолио с блогом, построенный на:

- **Nuxt 3** — режим SSG (Static Site Generation)
- **Vue 3** — Composition API + `<script setup>`
- **TypeScript** — типизация
- **Tailwind CSS v4** — стилизация (тёмная тема)
- **GSAP** — анимации
- **@nuxt/content** — Markdown-контент

Хостинг: **GitHub Pages** (только статика, без SSR).

## Структура каталогов

```
portfolio/
├── app/                           # Исходный код (srcDir: 'app/')
│   ├── app.vue                    # Корневой компонент
│   ├── error.vue                  # Страница ошибки
│   │
│   ├── assets/css/                # Стили
│   │   ├── main.css               # Основные стили
│   │   └── tailwind.css           # Конфигурация Tailwind
│   │
│   ├── components/                # Vue-компоненты
│   │   ├── animation/             # Анимационные компоненты
│   │   ├── layout/                # Компоненты лейаута
│   │   ├── project/               # Компоненты проектов
│   │   ├── sections/              # Секции страниц
│   │   └── ui/                    # UI-примитивы
│   │
│   ├── composables/               # Композиции (hooks)
│   │   ├── useGsap.ts             # GSAP-утилиты
│   │   ├── useFormatDate.ts       # Форматирование дат
│   │   ├── useNavigation.ts       # Навигация
│   │   └── useSeo.ts              # SEO-метатеги
│   │
│   ├── content/                   # Markdown-контент
│   │   ├── ru/                    # Русский
│   │   │   ├── blog/              # Статьи блога
│   │   │   └── projects/          # Проекты
│   │   └── en/                    # Английский
│   │       ├── blog/              # Blog posts
│   │       └── projects/          # Projects
│   │
│   ├── layouts/                   # Layouts
│   │   └── default.vue            # Основной layout
│   │
│   ├── locales/                   # Переводы i18n
│   │   ├── ru.json                # Русский
│   │   └── en.json                # Английский
│   │
│   ├── pages/                     # Маршруты (file-based routing)
│   │   ├── index.vue              # Главная страница
│   │   ├── about.vue              # О себе
│   │   ├── blog/
│   │   │   ├── index.vue          # Список статей
│   │   │   └── [slug].vue         # Страница статьи
│   │   └── projects/
│   │       ├── index.vue          # Список проектов
│   │       └── [slug].vue         # Страница проекта
│   │
│   ├── plugins/                   # Nuxt-плагины
│   │   └── gsap.client.ts         # Регистрация GSAP (только клиент)
│   │
│   ├── public/                    # Статические файлы
│   │   └── favicon.svg
│   │
│   └── types/                     # TypeScript-типы
│       ├── project.ts             # Тип ProjectContent
│       └── navigation.ts          # Типы навигации
│
├── docs/                          # Документация для разработчиков
├── .github/workflows/             # CI/CD
│   └── deploy.yml                 # Деплой на GitHub Pages
│
├── nuxt.config.ts                 # Конфигурация Nuxt
├── tailwind.config.ts             # Конфигурация Tailwind
├── tsconfig.json                  # Конфигурация TypeScript
└── package.json                   # Зависимости
```

## Система компонентов

### animation/

Компоненты для визуальных эффектов и анимаций:

| Компонент | Назначение |
|-----------|-----------|
| `AnimatedText` | Анимированный текст с эффектами появления |
| `GridBackground` | Фоновая сетка |
| `NoiseDotMatrix` | Шумовая матрица точек |
| `ScrollReveal` | Обёртка для анимации при скролле |

### layout/

Структурные компоненты:

| Компонент | Назначение |
|-----------|-----------|
| `TheHeader` | Шапка сайта с навигацией |
| `TheFooter` | Подвал сайта |
| `TheMobileMenu` | Мобильное меню |
| `LanguageSwitcher` | Переключатель языка (ru/en) |

### project/

Компоненты для отображения проектов:

| Компонент | Назначение |
|-----------|-----------|
| `ProjectCard` | Карточка проекта в списке |
| `ProjectFilter` | Фильтр по категориям (all/commercial/research) |
| `ProjectGrid` | Сетка проектов |

### sections/

Секции главной и других страниц:

| Компонент | Назначение |
|-----------|-----------|
| `HeroSection` | Главный экран (hero) |
| `FeaturedProjects` | Избранные проекты |
| `FeaturedProjectCard` | Карточка избранного проекта |
| `SkillsSection` | Секция навыков |
| `StatsSection` | Секция статистики |
| `ImpactSection` | Секция достижений |
| `MarqueeSection` | Бегущая строка |
| `ContactSection` | Секция контактов |

### ui/

UI-примитивы:

| Компонент | Назначение |
|-----------|-----------|
| `UiBadge` | Бейдж категории (commercial/research) |
| `UiButton` | Кнопка |
| `UiCard` | Карточка |
| `UiDivider` | Разделитель |
| `UiSkillTag` | Тег технологии |
| `UiBackLink` | Ссылка "назад" |
| `UiEmptyState` | Пустое состояние (нет контента) |
| `UiSectionHeader` | Заголовок секции |

## Дизайн-система

### Цвета

- **Primary:** `#6C63FF` (фиолетовый) — акцентный цвет
- **Surface:** градации от `#000000` до `#1a1a2e` — фоновые цвета

### Шрифты

- **Sora** — основной шрифт (sans-serif и display)
- **JetBrains Mono** — моноширинный шрифт (код)

### Размеры текста (кастомные)

- `display-hero` — главный заголовок
- `display-xl` / `display-lg` / `display-md` / `display-sm` — заголовки секций
- `marquee` — бегущая строка

### Скругления (кастомные)

- `card` — карточки
- `card-inner` — внутренние элементы карточек
- `button` — кнопки
- `badge` — бейджи

## Интернационализация (i18n)

### Конфигурация

- **Стратегия:** `prefix_except_default` — русский без префикса, английский с `/en/`
- **Язык по умолчанию:** `ru`
- **Второй язык:** `en`

### Маршруты

| Русский | Английский |
|---------|-----------|
| `/` | `/en/` |
| `/about` | `/en/about` |
| `/blog` | `/en/blog` |
| `/blog/slug` | `/en/blog/slug` |
| `/projects` | `/en/projects` |
| `/projects/slug` | `/en/projects/slug` |

### Переводы интерфейса

Файлы: `app/locales/ru.json`, `app/locales/en.json`

Использование в компонентах:
```vue
<template>
  <h1>{{ $t('sections.all_projects') }}</h1>
</template>
```

### Контент

Контент автоматически выбирается по текущей локали из соответствующей директории (`app/content/ru/` или `app/content/en/`).

## Анимации (GSAP)

### Плагин

Файл: `app/plugins/gsap.client.ts`

Регистрирует плагины GSAP:
- ScrollTrigger
- SplitText
- ScrollSmoother
- Flip
- DrawSVG

### Правила использования

1. GSAP-код выполняется **только на клиенте** (SSG-совместимость)
2. Анимации создаются в `onMounted()` хуке
3. Используется composable `useGsap` для утилит
4. Все анимации должны корректно очищаться в `onUnmounted()`

### Типичный паттерн

```typescript
onMounted(() => {
  gsap.from('.element', {
    y: 30,
    opacity: 0,
    filter: 'blur(12px)',
    duration: 0.8,
    delay: 0.1,
  })
})
```

## Контентная система (@nuxt/content)

### Типы контента

1. **Проекты** — подробнее в [projects.md](projects.md)
2. **Блог** — подробнее в [blog.md](blog.md)

### Запросы контента

```typescript
// Все проекты текущей локали, отсортированные по дате
const projects = await queryContent('/projects')
  .where({ _locale: locale.value })
  .sort({ date: -1 })
  .find()

// Проект по slug
const project = await queryContent('/projects')
  .where({ _locale: locale.value, _path: { $contains: slug } })
  .findOne()
```

### Автоматические поля

`@nuxt/content` добавляет служебные поля:
- `_path` — путь к файлу (используется как URL)
- `_locale` — локаль контента
- `body` — распарсенное тело Markdown

## Деплой

### GitHub Actions

Файл: `.github/workflows/deploy.yml`

Процесс:
1. Push в `main` → запуск workflow
2. `pnpm install` → `nuxi generate`
3. Выходная директория `.output/public` деплоится на GitHub Pages

### Ограничения GitHub Pages

- Только статика (никакого SSR)
- Клиентская маршрутизация (vue-router)
- Максимальный размер репозитория: 1 GB
- Максимальный размер файла: 100 MB
- Нет серверных редиректов
- 404 обрабатывается кастомным `404.html`

### Команды

```bash
pnpm dev          # Dev-сервер
pnpm generate     # SSG-сборка
pnpm preview      # Превью сборки
```

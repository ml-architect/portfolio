# Анализ глассморфизма в Spotify Wrapped и десктоп-приложении Spotify

## 1. Обзор

Spotify Wrapped -- ежегодная кампания, в которой Spotify визуализирует персональную
статистику прослушиваний за год в формате story-карточек. Кампания стала культурным
феноменом не только благодаря данным, но и за счёт выдающегося визуального дизайна.

Wrapped эволюционировал каждый год:
- **2018-2020** -- яркие плоские градиенты, дуотон, геометрические паттерны
- **2021-2022** -- 3D-элементы, аура-эффекты, motion design с параллаксом
- **2023** -- хаотичный "анти-дизайн", пиксели, волнистые формы, отсылки к раннему интернету
- **2024** -- возврат к bold-типографике (новый шрифт Spotify Mix), высококонтрастная палитра
- **2025** -- аналоговая эстетика микстейпов и CD, street-inspired стиль

Глассморфизм в Spotify проявляется не столько в самом Wrapped, сколько в **основном
интерфейсе приложения** -- Now Playing экран, overlay-панели, карточки плейлистов.
Wrapped же использует отдельные элементы glass-эстетики: полупрозрачные overlay,
blur-фоны, layered карточки с глубиной.

---

## 2. Глассморфизм в Spotify Wrapped

### Стеклянные overlay-карточки

Wrapped использует систему layered карточек (story-формат), где контент размещается
поверх динамических фонов. Ключевые приёмы:

- **Полупрозрачные панели** поверх градиентных или фото-фонов
- **Blur подложки** для отделения текста от фона и создания глубины
- **Слои на разных Z-плоскостях** -- параллакс между фоном, overlay и текстом
- **Icy backgrounds** -- холодные, "ледяные" размытые фоны в отдельных экранах

### Структура карточки Wrapped

```
+--------------------------------------------------+
|  [Градиентный / фото фон]                        |
|                                                    |
|    +------------------------------------------+   |
|    |  Glass overlay panel                      |   |
|    |  background: rgba(0, 0, 0, 0.3)           |   |
|    |  backdrop-filter: blur(16px)              |   |
|    |                                            |   |
|    |   СТАТИСТИКА / ДАННЫЕ                     |   |
|    |   Крупная типографика                     |   |
|    |   Иконки и визуализации                   |   |
|    |                                            |   |
|    +------------------------------------------+   |
|                                                    |
+--------------------------------------------------+
```

### Многослойная глубина

Wrapped строит визуальную иерархию через слои:

1. **Задний план** -- градиент или размытое album art
2. **Средний план** -- glass overlay с blur и полупрозрачностью
3. **Передний план** -- крупный текст, числа, иконки

Этот подход создаёт ощущение "стеклянной витрины", через которую видно
цветовое содержимое фона.

---

## 3. Десктоп-приложение Spotify

### Динамический фон Now Playing

Экран "Сейчас играет" (Now Playing) -- главная витрина glass-эффектов в Spotify:

- **Извлечение цвета из обложки альбома** через алгоритм (аналог node-vibrant)
- **Размытый фон** на основе доминантных цветов artwork
- **Overlay поверх размытия** для обеспечения контрастности текста
- **Контрастность 10.9:1** между текстом и фоном -- высокий стандарт доступности

### Карточки плейлистов

В десктопном приложении glassmorphic-карточки используются при просмотре плейлистов:

- Полупрозрачные контейнеры поверх размытого превью обложки
- Тонкие полупрозрачные границы для визуального отделения
- Subtle shadow для создания эффекта парения

### Панель навигации

Боковая панель и верхняя навигация используют полупрозрачность:

- Мягкий blur для отделения навигации от контентной области
- Затемнённый overlay в тёмной теме
- Плавные переходы при скролле

---

## 4. Цветовая палитра

### Брендовые цвета Spotify

```css
:root {
  /* Основные брендовые цвета */
  --spotify-green: #1DB954;
  --spotify-green-light: #1ED760;
  --spotify-black: #191414;
  --spotify-white: #FFFFFF;

  /* Фоновые цвета интерфейса */
  --spotify-bg-dark: #121212;
  --spotify-bg-card: #181818;
  --spotify-bg-elevated: #282828;
  --spotify-text-subdued: #B3B3B3;
}
```

### Палитра Wrapped 2024

```css
:root {
  /* Wrapped 2024 -- высококонтрастные цвета */
  --wrapped-red: #E8115B;
  --wrapped-blood-red: #8B0000;
  --wrapped-neon-pink: #FF1493;
  --wrapped-canary-yellow: #FFFF00;
  --wrapped-deep-purple: #2D1B69;
  --wrapped-electric-blue: #1E90FF;
}
```

### Интеграция цвета с glass-эффектами

В Spotify цвет album art динамически интегрируется с glass-overlay:

```css
/* Динамический фон на основе album art */
.now-playing-background {
  /* Цвета извлекаются из обложки программно */
  background: linear-gradient(
    135deg,
    var(--dominant-color) 0%,
    var(--secondary-color) 50%,
    var(--accent-color) 100%
  );
  filter: blur(80px) saturate(1.5);
  transform: scale(1.5); /* Убирает края blur */
}

/* Glass overlay поверх динамического фона */
.now-playing-overlay {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px) saturate(1.2);
}
```

---

## 5. CSS-техники

### Базовый glass-эффект в стиле Spotify

```css
.spotify-glass-card {
  /* Полупрозрачный фон */
  background: rgba(255, 255, 255, 0.08);

  /* Размытие фона за элементом */
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);

  /* Тонкая полупрозрачная граница */
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* Скругление углов */
  border-radius: 12px;

  /* Тень для эффекта парения */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Варианты для тёмной темы

```css
/* Лёгкий glass -- для навигации и sidebar */
.glass-light {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Средний glass -- для карточек контента */
.glass-medium {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(1.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Плотный glass -- для модалов и overlay */
.glass-heavy {
  background: rgba(18, 18, 18, 0.75);
  backdrop-filter: blur(24px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
}

/* Акцентный glass -- с цветовым тонированием */
.glass-accent {
  background: rgba(29, 185, 84, 0.12); /* Spotify Green */
  backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(29, 185, 84, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### Диапазоны значений blur

| Элемент              | blur      | opacity фона  | Назначение                  |
|----------------------|-----------|---------------|-----------------------------|
| Навигация            | 8-12px    | 0.03-0.06     | Лёгкое отделение            |
| Карточка контента    | 12-16px   | 0.06-0.12     | Основные контейнеры         |
| Modal / overlay      | 20-30px   | 0.5-0.8       | Фокусировка внимания        |
| Фон Now Playing      | 60-100px  | --            | Полное размытие artwork     |
| Декоративный фон     | 40-80px   | --            | Цветовые пятна, градиенты   |

### Вложенные скругления (nested border-radius)

```css
/* Внешний контейнер */
.card-outer {
  border-radius: 16px;
  padding: 8px;
}

/* Внутренний контейнер: radius = outer - padding */
.card-inner {
  border-radius: 8px; /* 16px - 8px = 8px */
}
```

---

## 6. Карточки и overlay

### Анатомия glass-карточки в стиле Spotify

```css
/* Карточка статистики (в стиле Wrapped) */
.wrapped-stat-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;

  /* Glass-фон */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  /* Граница */
  border: 1px solid rgba(255, 255, 255, 0.08);

  /* Тень */
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  /* Padding для контента */
  padding: 32px;
}

/* Внутреннее свечение сверху (имитация отражения) */
.wrapped-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
}

/* Цветовой акцент на фоне */
.wrapped-stat-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 30% 40%,
    rgba(29, 185, 84, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
  z-index: -1;
}
```

### Overlay поверх фона (Now Playing стиль)

```css
.now-playing-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Размытый фон из album art */
.now-playing-bg {
  position: absolute;
  inset: -20%; /* Выходит за границы для скрытия краёв blur */
  background-size: cover;
  background-position: center;
  filter: blur(80px) saturate(1.5) brightness(0.6);
  z-index: 0;
}

/* Glass overlay для контента */
.now-playing-content {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}
```

### Карточка с эффектом парения

```css
.floating-glass-card {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 16px 48px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.floating-glass-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.2),
    0 24px 64px rgba(0, 0, 0, 0.25);
}
```

---

## 7. Анимации

### Технологический стек анимаций Wrapped

Spotify использует:
- **Lottie** -- JSON-анимации из After Effects для брендовых элементов
- **Нативные view/layer трансформации** -- на iOS и Android
- **Параллакс через Z-плоскости** -- слои на разных уровнях глубины

### Transitions между экранами (story-формат)

```css
/* Появление карточки */
@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    backdrop-filter: blur(16px);
  }
}

.wrapped-card-enter {
  animation: card-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### Appear-эффекты для glass-элементов

```css
/* Fade-in с нарастающим blur */
@keyframes glass-appear {
  0% {
    opacity: 0;
    backdrop-filter: blur(0px);
    transform: scale(0.98);
  }
  50% {
    opacity: 0.7;
    backdrop-filter: blur(8px);
  }
  100% {
    opacity: 1;
    backdrop-filter: blur(16px);
    transform: scale(1);
  }
}

/* Параллакс-эффект при свайпе */
@keyframes parallax-slide {
  from {
    transform: translateX(100%) translateZ(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateZ(0);
    opacity: 1;
  }
}
```

### GSAP-версия для Nuxt-проекта

```typescript
// Появление glass-карточки с GSAP
import { gsap } from 'gsap'

function animateGlassCard(element: HTMLElement) {
  gsap.fromTo(element,
    {
      opacity: 0,
      y: 40,
      scale: 0.96,
      // backdrop-filter анимируется через CSS custom property
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    }
  )
}

// Stagger-анимация для группы карточек
function animateCardGroup(cards: HTMLElement[]) {
  gsap.fromTo(cards,
    {
      opacity: 0,
      y: 60,
      scale: 0.94,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    }
  )
}
```

### Анимация динамического фона

```typescript
// Плавная смена цвета фона (как в Spotify Now Playing)
function animateBackgroundTransition(
  element: HTMLElement,
  newColors: { primary: string; secondary: string }
) {
  gsap.to(element, {
    '--dominant-color': newColors.primary,
    '--secondary-color': newColors.secondary,
    duration: 1.2,
    ease: 'power2.inOut',
  })
}
```

---

## 8. Динамические фоны

### Принцип работы в Spotify

Spotify создаёт динамические фоны в несколько этапов:

1. **Извлечение цвета** -- алгоритм анализирует album art и определяет
   доминантные цвета (аналог библиотеки Vibrant.js / node-vibrant)
2. **Генерация градиента** -- из 2-3 доминантных цветов создаётся multi-stop gradient
3. **Масштабирование и blur** -- градиент/изображение увеличивается (scale 1.5x)
   и размывается (blur 60-100px)
4. **Overlay** -- поверх размытого фона накладывается затемняющий слой

### Реализация на CSS

```css
/* Контейнер для динамического фона */
.dynamic-bg-container {
  position: relative;
  overflow: hidden;
  background: #121212;
}

/* Слой с цветовыми пятнами */
.dynamic-bg-blobs {
  position: absolute;
  inset: -100px; /* Выход за границы */
  z-index: 0;
  filter: blur(80px) saturate(1.4);
  opacity: 0.7;
}

/* Цветовое пятно -- круг */
.blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen; /* Для тёмной темы */
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #1DB954 0%, transparent 70%);
  top: 10%;
  left: 20%;
}

.blob-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #E8115B 0%, transparent 70%);
  top: 50%;
  right: 15%;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #1E90FF 0%, transparent 70%);
  bottom: 10%;
  left: 40%;
}

/* Overlay для читаемости */
.dynamic-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(18, 18, 18, 0.5);
  z-index: 1;
}

/* Контент поверх */
.dynamic-bg-content {
  position: relative;
  z-index: 2;
}
```

### Извлечение цвета из изображений (JS)

```typescript
// Пример с использованием node-vibrant
import Vibrant from 'node-vibrant'

async function extractColors(imageUrl: string) {
  const palette = await Vibrant.from(imageUrl).getPalette()

  return {
    dominant: palette.Vibrant?.hex ?? '#1DB954',
    secondary: palette.DarkVibrant?.hex ?? '#191414',
    accent: palette.LightVibrant?.hex ?? '#1ED760',
    muted: palette.Muted?.hex ?? '#535353',
  }
}
```

---

## 9. Типографика

### Spotify Mix -- фирменный шрифт

В 2024 году Spotify впервые использовал в Wrapped свой новый шрифт **Spotify Mix**,
созданный совместно с берлинской студией Dinamo Typefaces. Шрифт заменил ранее
используемый Circular.

Характеристики Spotify Mix:
- Сочетание геометрических, гротескных и гуманистических форм
- Резкие гуманистические штрихи + мягкие гротескные кривые
- Формы, вдохновлённые звуковыми волнами
- Широкий диапазон: от ultra-bold до condensed

### Типографика поверх glass

Чтение текста на glass-поверхностях требует дополнительных мер:

```css
/* Крупный заголовок поверх glass */
.glass-heading {
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.03em; /* Отрицательный кернинг для крупного текста */
  line-height: 1.05;
  color: #ffffff;

  /* Усиление читаемости */
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Подзаголовок / описание */
.glass-subheading {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.85);

  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

/* Числовая статистика (как в Wrapped) */
.glass-stat-number {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.9;
  color: #ffffff;

  /* Градиент на тексте */
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Мелкий текст -- нужна максимальная контрастность */
.glass-caption {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.7);

  /* Для мелкого текста -- более плотный фон под текстом */
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
```

### Контрастность и доступность

- Минимальный контраст для обычного текста: **4.5:1** (WCAG AA)
- Минимальный контраст для крупного текста: **3:1**
- Spotify достигает **10.9:1** на Now Playing -- рекомендуемый ориентир
- Увеличение opacity фона до 0.3-0.4 или text-shadow помогает читаемости

---

## 10. Применимость к портфолио

### Рекомендации для тёмного портфолио

На основе анализа Spotify, для портфолио на стеке Nuxt 3 + Tailwind CSS + GSAP
рекомендуется следующий подход:

#### Что взять из Spotify

1. **Динамический фон из цветовых пятен** -- blob-градиенты с blur 60-100px,
   mix-blend-mode: screen, на тёмной подложке #0a0a0a / #121212
2. **Система glass-карточек** -- для проектов и статей блога,
   три уровня плотности (light / medium / heavy)
3. **Hover-анимации карточек** -- подъём (translateY), усиление тени,
   лёгкое масштабирование
4. **Bold-типографика** -- крупные заголовки с отрицательным кернингом,
   градиентный текст для акцентных элементов
5. **Плавные переходы** -- GSAP для stagger-появления карточек,
   ScrollTrigger для активации анимаций при скролле

#### Palette для тёмного портфолио с glass

```css
:root {
  /* Фоны */
  --bg-primary: #0a0a0f;
  --bg-card: rgba(255, 255, 255, 0.05);
  --bg-card-hover: rgba(255, 255, 255, 0.08);

  /* Glass */
  --glass-blur: 16px;
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-hover: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  /* Текст */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.45);

  /* Акценты (вместо Spotify Green -- свой цвет) */
  --accent-primary: #6366f1;   /* Пример: индиго */
  --accent-secondary: #8b5cf6; /* Фиолетовый */
  --accent-glow: rgba(99, 102, 241, 0.15);
}
```

#### Компонент glass-карточки (Tailwind CSS v4)

```vue
<template>
  <div
    class="
      relative overflow-hidden rounded-2xl
      bg-white/5 backdrop-blur-xl
      border border-white/8
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      transition-all duration-300 ease-out
      hover:bg-white/8 hover:border-white/12
      hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
    "
  >
    <!-- Верхний блик -->
    <div
      class="absolute top-0 left-0 right-0 h-px
             bg-gradient-to-r from-transparent via-white/15 to-transparent"
    />

    <!-- Контент -->
    <div class="relative z-10 p-8">
      <slot />
    </div>
  </div>
</template>
```

#### Что НЕ копировать

- **Story-формат** -- подходит только для мобильного Wrapped, не для портфолио
- **Чрезмерные градиенты** -- Wrapped 2024 использует агрессивные цвета,
  для портфолио лучше сдержанная палитра
- **Перегрузку blur-эффектами** -- ограничить glass до ключевых элементов
  (карточки, навигация, модалы), не применять повсеместно
- **Анимацию backdrop-filter** -- тяжёлая для производительности,
  лучше анимировать opacity и transform

#### Оптимизация производительности

```css
/* Включить GPU-ускорение для glass-элементов */
.glass-card {
  will-change: transform;
  transform: translateZ(0); /* Создание нового compositing layer */
}

/* Снизить blur на мобильных */
@media (max-width: 768px) {
  .glass-card {
    backdrop-filter: blur(8px);  /* Вместо 16px */
  }

  .dynamic-bg-blobs {
    filter: blur(40px); /* Вместо 80px */
  }
}
```

#### Поддержка браузеров

- `backdrop-filter`: Chrome 76+, Safari 9+, Firefox 103+
- Для Safari обязателен `-webkit-backdrop-filter`
- Fallback для старых браузеров:

```css
.glass-card {
  /* Fallback без blur */
  background: rgba(18, 18, 18, 0.85);
}

@supports (backdrop-filter: blur(16px)) {
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
  }
}
```

---

## Источники

- [Spotify Wrapped 2024 -- deep dive (Envato Elements)](https://elements.envato.com/learn/spotify-wrapped-2024)
- [Reinvention and evolution: Inside the design of Spotify Wrapped 2024 (It's Nice That)](https://www.itsnicethat.com/features/spotify-wrapped-2024-graphic-design-041224)
- [Three Design Elements That Made Spotify Wrapped 2024 Great (Alex Jimenez Design)](https://alexjimenezdesign.medium.com/three-design-elements-that-made-spotify-wrapped-2024-great-0a8e2b133b72)
- [Spotify Wrapped 2025 -- analog inspired (Fast Company)](https://www.fastcompany.com/91451332/spotify-wrapped-2025-goes-analog-in-the-age-of-ai)
- [Glassmorphism Examples (Onyx8 Agency)](https://onyx8agency.com/blog/glassmorphism-inspiring-examples/)
- [Glassmorphism UI Features and Best Practices (UXPilot)](https://uxpilot.ai/blogs/glassmorphism-ui)
- [Glassmorphism: Definition and Best Practices (NN/g)](https://www.nngroup.com/articles/glassmorphism/)
- [How Spotify Creates Stunning Backdrops (Medium)](https://medium.com/@shanmugashree3/how-spotify-creates-those-stunning-backdrops-that-match-every-song-playlist-00fe13eab033)
- [Spotify Brand Colors (U.S. Brand Colors)](https://usbrandcolors.com/spotify-colors/)
- [Introducing Spotify Mix Typeface (Spotify Newsroom)](https://newsroom.spotify.com/2024-05-22/introducing-spotify-mix-our-new-and-exclusive-font/)
- [Making Moves: Designing Motion for 2022 Wrapped (Spotify Design)](https://spotify.design/article/making-moves-designing-motion-for-2022-wrapped)
- [Exploring the Animation Landscape of 2023 Wrapped (Spotify Engineering)](https://engineering.atspotify.com/2024/01/exploring-the-animation-landscape-of-2023-wrapped)
- [Glassmorphism CSS Generator (Glass UI)](https://ui.glass/generator/)
- [Next-level frosted glass with backdrop-filter (Josh W. Comeau)](https://www.joshwcomeau.com/css/backdrop-filter/)
- [Spotify Glassmorphism concept (Behance)](https://www.behance.net/gallery/119095473/Spotify-Glassmorphism)

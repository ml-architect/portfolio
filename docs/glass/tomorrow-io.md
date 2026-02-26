# Tomorrow.io -- Анализ глассморфизма

> Детальный анализ дизайн-подхода погодной платформы [Tomorrow.io](https://www.tomorrow.io) с фокусом на глассморфизм, CSS-техники и применимость к портфолио.

---

## 1. Обзор

**Tomorrow.io** -- погодная разведывательная платформа (Weather Intelligence & Resilience Platform), основанная в 2016 году. Компания специализируется на гиперлокальных прогнозах погоды с использованием AI и собственных спутников.

### Почему Tomorrow.io -- эталон глассморфизма

Tomorrow.io признан одним из лучших примеров глассморфизма среди продакшн-сайтов ([Onyx8 Agency](https://onyx8agency.com/blog/glassmorphism-inspiring-examples/), [UXPilot](https://uxpilot.ai/blogs/glassmorphism-ui)). Причины:

- **Контекстуальность** -- стеклянный эффект органично сочетается с погодной тематикой (стекло окна, через которое видна погода)
- **Функциональность** -- полупрозрачные карточки с данными поверх карт и фонов передают слоистость информации
- **Консистентность** -- glass-эффект применяется системно: на главной, на страницах API, в виджетах и в дашборде app.tomorrow.io

### Технический стек сайта

По данным BuiltWith, сайт использует ~52 технологии:
- **Frontend:** Angular, Loadable-Components
- **CMS:** WordPress (маркетинговые страницы)
- **CDN:** Cloudflare
- **Аналитика:** Amplitude, Hotjar
- **SEO:** Yoast SEO Premium

---

## 2. Глассморфизм-элементы

### 2.1 Hero-секция (главная страница)

Главная страница Tomorrow.io построена по принципу "данные поверх атмосферы":

- **Фон** -- динамический градиент или анимированное weather-видео (небо, облака, осадки)
- **Поверх фона** -- полупрозрачные карточки с погодными данными
- **Эффект** -- карточки "плавают" над контентом, создавая ощущение слоёв атмосферы

```
+----------------------------------------------------------+
|                                                          |
|     [Градиентный/анимированный погодный фон]             |
|                                                          |
|   +-------------------+  +-------------------+           |
|   | Glass Card        |  | Glass Card        |           |
|   | Temperature: 24C  |  | Wind: 15 km/h    |           |
|   | Humidity: 65%     |  | Pressure: 1013    |           |
|   +-------------------+  +-------------------+           |
|                                                          |
+----------------------------------------------------------+
```

### 2.2 Weather-карточки (Data Tiles)

Основной элемент интерфейса -- интерактивные тайлы дашборда:

- Полупрозрачный фон с размытием
- Тонкая светлая граница (1px)
- Мягкая тень для отделения от фона
- Иконки погодных условий внутри стеклянных контейнеров

### 2.3 Навигация

- **Верхняя панель** -- sticky-навигация с glass-эффектом
- При скролле фон навбара становится полупрозрачным с blur
- Логотип и ссылки контрастируют на стеклянном фоне

### 2.4 Панель API-страницы

Страница Weather API (tomorrow.io/weather-api/) демонстрирует:
- Стеклянные карточки с описанием 60+ data-слоёв
- Overlay-панели с code-snippets поверх градиентных фонов
- Полупрозрачные badge-элементы

### 2.5 Дашборд (app.tomorrow.io)

Продуктовый дашборд использует glassmorphism для:
- Боковой навигации (sidebar с полупрозрачным фоном)
- Weather-виджетов поверх интерактивной карты
- Модальных окон и tooltip-ов
- Панелей управления настройками

---

## 3. CSS-техники

### 3.1 Основа: backdrop-filter + rgba

Ядро glass-эффекта Tomorrow.io строится на сочетании полупрозрачного фона и размытия заднего плана:

```css
/* Базовая glass-карточка в стиле Tomorrow.io */
.weather-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### 3.2 Параметры blur

Tomorrow.io использует дифференцированные значения blur в зависимости от контекста:

| Элемент | Blur | Opacity фона | Назначение |
|---------|------|-------------|-----------|
| Навигация | 8-12px | 0.6-0.8 | Читаемость при скролле |
| Weather-карточки | 10-16px | 0.08-0.15 | Лёгкость, «парящий» эффект |
| Модальные окна | 16-24px | 0.2-0.3 | Фокус на контенте модалки |
| Sidebar | 12-16px | 0.1-0.2 | Разделение навигации и контента |
| Tooltip | 6-10px | 0.15-0.25 | Информативность без отвлечения |

### 3.3 Многослойные тени

Для создания глубины используются составные box-shadow:

```css
.weather-card {
  box-shadow:
    /* Внешняя мягкая тень для глубины */
    0 8px 32px rgba(0, 0, 0, 0.25),
    /* Внутренний highlight сверху -- имитация отражения */
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    /* Тонкий glow по краям */
    0 0 0 1px rgba(255, 255, 255, 0.05);
}
```

### 3.4 Границы (borders)

Тонкие полупрозрачные границы критически важны для восприятия «стекла»:

```css
/* Вариант 1: Однородная тонкая граница */
border: 1px solid rgba(255, 255, 255, 0.1);

/* Вариант 2: Градиентная граница (через background-clip) */
.glass-border {
  border: 1px solid transparent;
  background-clip: padding-box;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.03)
  );
}
```

### 3.5 Saturate-фильтр

Tomorrow.io дополняет blur фильтром `saturate()`, чтобы цвета фона под стеклом оставались насыщенными:

```css
backdrop-filter: blur(12px) saturate(180%);
```

Без saturate цвета под стеклом выглядят "вымытыми". Значение 150-200% компенсирует потерю насыщенности от blur.

---

## 4. Цветовая схема

### 4.1 Основная палитра

Tomorrow.io использует палитру, вдохновлённую атмосферными явлениями:

```css
:root {
  /* Основной тёмный фон */
  --bg-primary: #0a0e1a;          /* Глубокий тёмно-синий */
  --bg-secondary: #111827;        /* Тёмный серо-синий */

  /* Accent-цвета (бренд) */
  --accent-blue: #3b82f6;         /* Основной синий */
  --accent-cyan: #06b6d4;         /* Бирюзовый */
  --accent-purple: #8b5cf6;       /* Фиолетовый */

  /* Погодные accent-цвета */
  --weather-sun: #fbbf24;         /* Солнечно */
  --weather-rain: #60a5fa;        /* Дождь */
  --weather-storm: #ef4444;       /* Шторм */
  --weather-snow: #e2e8f0;        /* Снег */

  /* Glass-поверхности */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-highlight: rgba(255, 255, 255, 0.06);

  /* Текст */
  --text-primary: #f8fafc;        /* Почти белый */
  --text-secondary: #94a3b8;      /* Приглушённый серый */
  --text-muted: #64748b;          /* Серый для мета-информации */
}
```

### 4.2 Градиенты фонов

Погодная тематика позволяет использовать атмосферные градиенты:

```css
/* Основной фоновый градиент -- "ночное небо" */
.hero-bg {
  background: linear-gradient(
    180deg,
    #0a0e1a 0%,
    #1a1f3a 40%,
    #0f172a 100%
  );
}

/* Радиальный glow за glass-элементами */
.glow-bg {
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(59, 130, 246, 0.15) 0%,
    transparent 70%
  );
}

/* Атмосферный градиент для hero */
.atmospheric-gradient {
  background: linear-gradient(
    135deg,
    #0c1445 0%,
    #1e3a5f 30%,
    #0d2137 60%,
    #0a0e1a 100%
  );
}
```

### 4.3 Правило 60-30-10

Tomorrow.io следует классическому распределению цветов:
- **60%** -- тёмный фон (#0a0e1a ... #111827)
- **30%** -- glass-поверхности (rgba с низкой opacity)
- **10%** -- accent-цвета (синий, бирюзовый, погодные цвета)

---

## 5. Карточки с данными (Weather Data Cards)

### 5.1 Структура карточки

Типичная weather-карточка Tomorrow.io имеет следующую структуру:

```html
<div class="weather-card">
  <div class="card-header">
    <span class="card-icon"><!-- Weather icon --></span>
    <span class="card-title">Temperature</span>
  </div>
  <div class="card-value">
    <span class="value-number">24</span>
    <span class="value-unit">°C</span>
  </div>
  <div class="card-footer">
    <span class="card-trend">+2° vs yesterday</span>
  </div>
</div>
```

### 5.2 Стилизация карточки

```css
.weather-card {
  /* Glass-фон */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);

  /* Границы и скругления */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  /* Тени */
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  /* Внутренние отступы */
  padding: 20px 24px;

  /* Transition для hover */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.weather-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

/* Основное значение -- крупный шрифт */
.card-value .value-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1;
}

.card-value .value-unit {
  font-size: 1.25rem;
  font-weight: 400;
  color: #94a3b8;
  margin-left: 4px;
}

/* Trend-индикатор */
.card-trend {
  font-size: 0.75rem;
  color: #94a3b8;
}

.card-trend.positive {
  color: #34d399; /* Зелёный для положительного тренда */
}

.card-trend.negative {
  color: #f87171; /* Красный для отрицательного */
}
```

### 5.3 Сетка карточек

Карточки располагаются в адаптивной grid-сетке:

```css
.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 24px;
}
```

### 5.4 Карточки поверх карты

В дашборде карточки накладываются на интерактивную карту:

```css
.map-overlay-cards {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 10;
  pointer-events: auto;
}

.map-card {
  background: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
}
```

---

## 6. Анимации

### 6.1 Hover-эффекты карточек

При наведении карточки слегка приподнимаются и становятся ярче:

```css
.weather-card {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.35);
}
```

### 6.2 Scroll-анимации

Tomorrow.io использует scroll-triggered анимации для появления секций:

```css
/* Появление карточек при скролле (с GSAP ScrollTrigger) */
.card-enter {
  opacity: 0;
  transform: translateY(40px);
}

.card-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
```

Для реализации подобного через GSAP (как в нашем проекте):

```typescript
// plugins/gsap.client.ts или composable
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Анимация появления weather-карточек
function animateWeatherCards() {
  gsap.utils.toArray('.weather-card').forEach((card, i) => {
    gsap.from(card as Element, {
      scrollTrigger: {
        trigger: card as Element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out',
    })
  })
}
```

### 6.3 Анимация навигации при скролле

```css
/* Навбар: прозрачный -> glass при скролле */
.navbar {
  background: transparent;
  backdrop-filter: blur(0px);
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease;
}

.navbar.scrolled {
  background: rgba(10, 14, 26, 0.8);
  backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

### 6.4 Погодные микроанимации

Tomorrow.io оживляет интерфейс контекстными анимациями:

```css
/* Пульсация иконки текущей погоды */
@keyframes weather-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.weather-icon-active {
  animation: weather-pulse 3s ease-in-out infinite;
}

/* Плавное обновление значений */
@keyframes value-update {
  0% { opacity: 0; transform: translateY(-8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.value-updated {
  animation: value-update 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 6.5 Shimmer-эффект на glass-элементах

Тонкий блик, скользящий по стеклянной поверхности:

```css
.glass-shimmer {
  position: relative;
  overflow: hidden;
}

.glass-shimmer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    60deg,
    transparent 30%,
    rgba(255, 255, 255, 0.04) 40%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 60%,
    transparent 70%
  );
  transform: rotate(30deg) translateX(-100%);
  transition: transform 0.8s ease;
}

.glass-shimmer:hover::before {
  transform: rotate(30deg) translateX(100%);
}
```

---

## 7. Фоны

### 7.1 Типы фонов под glass-элементами

Tomorrow.io использует несколько подходов к фонам, которые создают контекст для glass-эффекта:

#### Динамические weather-видео
Главная страница может использовать зацикленное видео с атмосферными явлениями (облака, дождь, рассвет):

```css
.hero-video-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-video-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4; /* Приглушённое видео */
}

/* Затемняющий gradient overlay */
.hero-video-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 26, 0.6) 0%,
    rgba(10, 14, 26, 0.8) 60%,
    rgba(10, 14, 26, 1) 100%
  );
}
```

#### Интерактивная карта (дашборд)
В дашборде glass-элементы размещены поверх интерактивной карты с weather-слоями:

```css
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map-glass-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
  background: rgba(10, 14, 26, 0.75);
  backdrop-filter: blur(16px);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 10;
}
```

#### Градиентные фоны секций
Маркетинговые страницы используют глубокие градиенты:

```css
/* Секция с радиальными glow-пятнами */
.section-bg {
  background: #0a0e1a;
  position: relative;
}

.section-bg::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.12) 0%,
    transparent 70%
  );
  filter: blur(60px);
}

.section-bg::after {
  content: '';
  position: absolute;
  bottom: 10%;
  right: 15%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.1) 0%,
    transparent 70%
  );
  filter: blur(60px);
}
```

### 7.2 Принцип контрастного фона

Glass-эффект работает только если за стеклом есть на что смотреть. Tomorrow.io обеспечивает это через:

1. **Яркие/контрастные подложки** -- gradient glow-пятна за карточками
2. **Визуальный шум** -- карты, графики, данные за стеклом
3. **Цветовые акценты** -- бирюзовые, синие, фиолетовые glow-зоны

---

## 8. Типографика

### 8.1 Шрифты

Tomorrow.io использует современную sans-serif-типографику:

- **Заголовки:** Геометрический гротеск (предположительно Inter или системный шрифт)
- **Body text:** System UI stack для оптимальной производительности
- **Моноширинный:** Для code-snippets на API-страницах

```css
/* Типографический стек в стиле Tomorrow.io */
:root {
  --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

### 8.2 Размеры и контрастность на glass

Ключевая проблема glassmorphism -- читаемость текста. Tomorrow.io решает это:

```css
/* Крупные заголовки -- максимальный контраст */
h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em; /* Отрицательный кернинг для крупного текста */
  line-height: 1.1;
}

/* На glass-поверхностях: text-shadow для читаемости */
.glass-text {
  color: #f8fafc;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Числовые значения погоды -- bold, крупный */
.weather-value {
  font-size: 2.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* Моноширинные цифры */
  color: #ffffff;
}

/* Подписи и мета -- уменьшенная opacity */
.weather-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}
```

### 8.3 Контрастность WCAG

Для обеспечения доступности на полупрозрачных фонах:

| Элемент | Цвет текста | Фон (эффективный) | Контраст |
|---------|------------|-------------------|----------|
| Заголовки | #f8fafc | ~#151a2c | ~13:1 |
| Body | #e2e8f0 | ~#151a2c | ~10:1 |
| Secondary | #94a3b8 | ~#151a2c | ~5.5:1 |
| Muted | #64748b | ~#151a2c | ~3.5:1 |

---

## 9. Responsive-адаптация

### 9.1 Подход к мобильной версии

Tomorrow.io адаптирует glass-эффекты для мобильных устройств:

```css
/* Desktop: полноценный glass */
.weather-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Tablet: уменьшенный blur для производительности */
@media (max-width: 1024px) {
  .weather-card {
    backdrop-filter: blur(10px) saturate(140%);
  }

  .weather-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

/* Mobile: минимальный blur, увеличенная opacity фона */
@media (max-width: 640px) {
  .weather-card {
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 16px;
  }

  .weather-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  /* Навбар на мобильных: более плотный glass */
  .navbar {
    background: rgba(10, 14, 26, 0.9);
    backdrop-filter: blur(8px);
  }
}
```

### 9.2 Производительность на мобильных

`backdrop-filter` -- дорогая операция. Tomorrow.io оптимизирует это:

```css
/* GPU-ускорение */
.weather-card {
  will-change: transform;
  transform: translateZ(0);
}

/* Fallback для слабых устройств (prefers-reduced-motion) */
@media (prefers-reduced-motion: reduce) {
  .weather-card {
    backdrop-filter: none;
    background: rgba(17, 24, 39, 0.92);
    transition: none;
  }
}

/* Fallback для браузеров без поддержки */
@supports not (backdrop-filter: blur(1px)) {
  .weather-card {
    background: rgba(17, 24, 39, 0.95);
  }
}
```

### 9.3 Виджеты

Tomorrow.io предлагает отзывчивые weather-виджеты для встраивания на сайты. Виджеты полностью адаптивны -- размер и компоновка определяются шириной контейнера-родителя.

---

## 10. Применимость к портфолио

### 10.1 Что можно перенять напрямую

#### Glass-навигация
```css
/* Навбар портфолио в стиле Tomorrow.io */
.portfolio-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 16px 24px;
  background: transparent;
  backdrop-filter: blur(0px);
  border-bottom: 1px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-navbar.scrolled {
  background: rgba(10, 14, 26, 0.75);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}
```

#### Карточки проектов
```vue
<!-- components/ProjectCard.vue -->
<template>
  <article class="project-card group">
    <div class="card-image">
      <img :src="project.cover" :alt="project.title" />
    </div>
    <div class="card-content">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="card-tags">
        <span v-for="tag in project.tags" :key="tag" class="glass-tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
}

.glass-tag {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.75rem;
  color: #94a3b8;
}
</style>
```

#### Glow-фоны для секций
```css
/* Атмосферные glow-пятна (как у Tomorrow.io за weather-карточками) */
.section-with-glow {
  position: relative;
  overflow: hidden;
}

.glow-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
}

.glow-blob--blue {
  width: 500px;
  height: 500px;
  background: #3b82f6;
  top: -10%;
  left: -5%;
}

.glow-blob--purple {
  width: 400px;
  height: 400px;
  background: #8b5cf6;
  bottom: -15%;
  right: -10%;
}
```

### 10.2 Адаптация для Tailwind CSS v4

Все glass-техники Tomorrow.io транслируются в Tailwind-классы:

```html
<!-- Glass-карточка через Tailwind -->
<div class="
  bg-white/[0.06]
  backdrop-blur-[14px]
  backdrop-saturate-[160%]
  border
  border-white/10
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.25)]
  p-6
  transition-all
  duration-300
  ease-[cubic-bezier(0.4,0,0.2,1)]
  hover:bg-white/[0.1]
  hover:border-white/[0.18]
  hover:-translate-y-1
  hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
">
  <!-- Контент -->
</div>
```

### 10.3 Что НЕ стоит копировать

1. **Перегруженность glass-элементами** -- для портфолио достаточно glass на навбаре, карточках проектов и модалках
2. **Видео-фоны** -- тяжёлые для GitHub Pages, лучше заменить CSS-градиентами с glow
3. **Карта как фон** -- не релевантно для портфолио
4. **Множество data-виджетов** -- портфолио не dashboard, ограничиться 3-4 карточками на экран

### 10.4 Рекомендуемый порядок интеграции

1. Настроить тёмный фон с gradient glow-пятнами
2. Реализовать glass-навбар с transition при скролле
3. Сделать карточки проектов с glass-эффектом и hover-анимациями
4. Добавить glass-элементы в блог (карточки постов)
5. Реализовать shimmer-эффект на ключевых карточках
6. Добавить scroll-triggered появление карточек через GSAP
7. Протестировать на мобильных и добавить fallbacks

---

## Источники

- [10 Mind-Blowing Glassmorphism Examples For 2026 -- Onyx8 Agency](https://onyx8agency.com/blog/glassmorphism-inspiring-examples/)
- [12 Glassmorphism UI Features, Best Practices, and Examples -- UXPilot](https://uxpilot.ai/blogs/glassmorphism-ui)
- [Glassmorphism: Definition and Best Practices -- NN/g](https://www.nngroup.com/articles/glassmorphism/)
- [Glassmorphism CSS Generator -- Glass UI](https://ui.glass/generator/)
- [How to implement glassmorphism with CSS -- LogRocket](https://blog.logrocket.com/implement-glassmorphism-css/)
- [Glassmorphism Design Trend: Implementation Guide -- Developer Playground](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide)
- [Tomorrow.io -- Weather Intelligence Platform](https://www.tomorrow.io/)
- [Tomorrow.io Weather Widget](https://weather.tomorrow.io/widget/)
- [How Glassmorphism in UX Is Reshaping Modern Interfaces -- Clay](https://clay.global/blog/glassmorphism-ui)
- [Design Trend: Frosted Glass Effect in Web Design -- Design Shack](https://designshack.net/articles/trends/frosted-glass-effect-web-design/)

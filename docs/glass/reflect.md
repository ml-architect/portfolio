# Reflect.app — Анализ глассморфизма и дизайна

> Детальный разбор дизайна сайта [reflect.app](https://reflect.app) — минималистичного приложения для заметок с glassmorphism-эстетикой, sci-fi темой и premium-подачей.

---

## 1. Обзор

**Reflect** — приложение для заметок и управления знаниями с поддержкой backlinks, AI-ассистента (GPT-4o / Claude 3.5 Sonnet) и end-to-end шифрования. Слоган позиционирует продукт как инструмент, который помогает думать.

Сайт спроектирован дизайнером Oguz Yagiz Kara (Lue Studio). Ключевая идея дизайна — sci-fi тема с элементом «портала», из которого появляется AI. Это визуальная метафора: технология не навязывается, а органично возникает из пространства.

### Дизайн-философия

- **Минимализм** — чистый интерфейс, минимум отвлекающих элементов
- **Тёмная тема** — единственный режим, усиливает погружённость
- **Glassmorphism** — стеклянные элементы создают ощущение глубины и многослойности
- **Sci-fi эстетика** — портал, свечение, космические градиенты
- **Спокойствие** — дизайн не кричит, а шепчет; пользователь фокусируется на контенте

---

## 2. Глассморфизм-элементы

### 2.1. Hero-секция

Hero-секция — центральная часть дизайна. Содержит анимацию «чёрной дыры» / портала на тёмном фоне. Стеклянный эффект проявляется в нескольких слоях:

- **Полупрозрачный overlay** поверх анимированного фона
- **Размытие фоновой анимации** через интерфейсные элементы
- **Свечение (glow)** вокруг портала создаёт иллюзию подсвеченного стекла

### 2.2. Карточки функций (Feature Cards)

Карточки с описанием фичей выполнены в glass-стиле:

- Полупрозрачный фон с низкой opacity
- Тонкая border линия (1px, белая с opacity 0.08-0.15)
- Лёгкий backdrop-blur, позволяющий видеть фоновые градиенты
- Скругленные углы (border-radius ~12-16px)

### 2.3. Навигационная панель

- Фиксированный header с прозрачным/полупрозрачным фоном
- При скролле появляется backdrop-blur, создавая эффект матового стекла
- Навбар «плавает» над контентом, не перекрывая его визуально

### 2.4. Thumbnail-изображения

Скриншоты приложения представлены с полупрозрачными обёртками:

- Изображения помещены в стеклянные контейнеры
- Мягкие тени создают эффект парения
- Плавные переходы прозрачности на краях (fade-out по краям)

### 2.5. CTA-кнопки

- Основные кнопки имеют стеклянный gradient-фон
- Hover-состояние усиливает свечение
- Вторичные кнопки — ghost-стиль с полупрозрачной границей

---

## 3. CSS-техники

### 3.1. Базовая стеклянная карточка (в стиле Reflect)

```css
.reflect-glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### 3.2. Навбар с glass-эффектом при скролле

```css
.reflect-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background: transparent;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.reflect-navbar--scrolled {
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

### 3.3. Glow-эффект (портал / подсветка)

```css
.reflect-glow {
  position: relative;
}

.reflect-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(120, 100, 255, 0.3) 0%,
    rgba(80, 60, 200, 0.1) 40%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
  z-index: -1;
}
```

### 3.4. Полупрозрачный thumbnail-контейнер

```css
.reflect-thumbnail {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.reflect-thumbnail img {
  opacity: 0.9;
  mix-blend-mode: luminosity;
  transition: opacity 0.4s ease;
}

.reflect-thumbnail:hover img {
  opacity: 1;
  mix-blend-mode: normal;
}

/* Fade-эффект по краям */
.reflect-thumbnail::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(10, 10, 15, 0.8) 100%
  );
  pointer-events: none;
}
```

### 3.5. Tailwind CSS эквиваленты

```html
<!-- Glass-карточка -->
<div class="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]
            rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
  <!-- контент -->
</div>

<!-- Навбар при скролле -->
<nav class="fixed top-0 w-full z-50 transition-all duration-300"
     :class="scrolled
       ? 'bg-[rgba(10,10,15,0.7)] backdrop-blur-2xl border-b border-white/[0.06]'
       : 'bg-transparent'">
  <!-- навигация -->
</nav>

<!-- CTA кнопка в glass-стиле -->
<button class="bg-white/10 backdrop-blur-md border border-white/20
               rounded-lg px-6 py-3 text-white
               hover:bg-white/15 hover:shadow-[0_0_20px_rgba(120,100,255,0.2)]
               transition-all duration-300">
  Начать бесплатно
</button>
```

---

## 4. Цветовая палитра

### 4.1. Основные цвета

| Роль | Цвет | HEX | RGB |
|------|-------|-----|-----|
| Фон (основной) | Почти чёрный | `#0A0A0F` | `rgb(10, 10, 15)` |
| Фон (вторичный) | Тёмно-серый | `#111118` | `rgb(17, 17, 24)` |
| Фон (третичный) | Серо-фиолетовый | `#16161F` | `rgb(22, 22, 31)` |
| Текст (основной) | Белый | `#FFFFFF` | `rgb(255, 255, 255)` |
| Текст (вторичный) | Серый | `#9999AA` | `rgb(153, 153, 170)` |
| Текст (приглушённый) | Тёмно-серый | `#666677` | `rgb(102, 102, 119)` |

### 4.2. Акцентные цвета

| Роль | Цвет | HEX | Применение |
|------|-------|-----|------------|
| Accent (primary) | Фиолетовый | `#7C5CFC` | CTA, ссылки, иконки |
| Accent (glow) | Лавандовый | `#9B7FFF` | Свечение, hover |
| Accent (warm) | Розово-фиолетовый | `#C77DFF` | Градиенты, декор |

### 4.3. Градиенты

```css
/* Основной hero-градиент */
.reflect-hero-gradient {
  background: radial-gradient(
    ellipse at center,
    rgba(124, 92, 252, 0.15) 0%,
    rgba(80, 50, 180, 0.05) 30%,
    rgba(10, 10, 15, 1) 70%
  );
}

/* Градиент для подсветки карточек */
.reflect-card-glow {
  background: linear-gradient(
    135deg,
    rgba(124, 92, 252, 0.08) 0%,
    rgba(199, 125, 255, 0.04) 50%,
    transparent 100%
  );
}

/* Градиент текста (заголовки) */
.reflect-text-gradient {
  background: linear-gradient(
    to right,
    #ffffff 0%,
    #c4b5fd 50%,
    #9b7fff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 4.4. Правило 60-30-10

- **60% — Тёмный фон** (`#0A0A0F` - `#16161F`) — фоны секций, подложки
- **30% — Серые тона** (`#666677` - `#9999AA`) — вторичный текст, borders, muted-элементы
- **10% — Фиолетовый акцент** (`#7C5CFC` - `#C77DFF`) — CTA, glow, hover-состояния

---

## 5. Минимализм: как достигается «спокойный» UI

### 5.1. Принципы

1. **Negative space** — обильные отступы между секциями (120-200px по вертикали). Контент «дышит», не давит.
2. **Один фокус на экран** — каждая секция viewport-а передаёт одну мысль.
3. **Минимум цветов** — почти монохромная палитра с единственным акцентом (фиолетовый).
4. **Отсутствие визуального шума** — нет decorative borders, нет background-паттернов, нет лишних иконок.
5. **Приглушённые элементы** — второстепенная информация имеет низкий контраст (`opacity: 0.5-0.7`).
6. **Мягкие переходы** — никаких резких границ между секциями; gradients плавно перетекают.

### 5.2. Техники снижения визуальной нагрузки

```css
/* Приглушённый вторичный текст */
.text-muted {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* Мягкий разделитель секций (вместо линии) */
.section-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.06),
    transparent
  );
  margin: 80px 0;
}

/* Затухание контента к краям экрана */
.content-fade {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
}
```

### 5.3. Информационная иерархия

| Уровень | Пример | Стиль |
|---------|--------|-------|
| L1 — Главное | Заголовок hero | `text-5xl font-semibold text-white` |
| L2 — Подзаголовок | Описание секции | `text-xl font-normal text-white/70` |
| L3 — Контент | Текст карточки | `text-base font-normal text-white/50` |
| L4 — Мета | Label, дата | `text-sm font-medium text-white/40 uppercase tracking-wider` |

---

## 6. Изображения и thumbnails

### 6.1. Подход к скриншотам

Reflect использует скриншоты своего приложения как основной визуальный контент. Их подача:

- **Полупрозрачные контейнеры** — скриншот помещён в glass-обёртку
- **Перспектива** — лёгкий 3D-наклон (`perspective + rotateX/Y`) для динамики
- **Мягкие тени** — большие размытые тени (`box-shadow: 0 40px 80px rgba(0,0,0,0.5)`)
- **Fade-края** — градиентная маска убирает резкие границы изображения
- **Десатурация** — слегка приглушённая насыщенность, чтобы скриншоты не выбивались из палитры

### 6.2. CSS-реализация

```css
/* Контейнер для app-скриншота */
.reflect-app-screenshot {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transform: perspective(1200px) rotateX(2deg) rotateY(-1deg);
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.reflect-app-screenshot:hover {
  transform: perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1.02);
}

.reflect-app-screenshot img {
  width: 100%;
  display: block;
  filter: saturate(0.85) brightness(0.95);
  transition: filter 0.6s ease;
}

.reflect-app-screenshot:hover img {
  filter: saturate(1) brightness(1);
}

/* Gradient-маска для fade-эффекта */
.reflect-app-screenshot::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(10, 10, 15, 0.6) 85%,
    rgba(10, 10, 15, 0.95) 100%
  );
  pointer-events: none;
}
```

### 6.3. Tailwind-эквивалент

```html
<div class="relative rounded-2xl overflow-hidden
            shadow-[0_40px_80px_rgba(0,0,0,0.5)]
            ring-1 ring-white/5
            transform perspective-[1200px] rotate-x-2 -rotate-y-1
            hover:rotate-x-0 hover:rotate-y-0 hover:scale-[1.02]
            transition-transform duration-600 ease-out">
  <img src="/screenshot.png" alt="Reflect App"
       class="w-full block saturate-[0.85] brightness-95
              hover:saturate-100 hover:brightness-100
              transition-[filter] duration-600" />
  <!-- Fade overlay -->
  <div class="absolute inset-0 bg-gradient-to-b
              from-transparent via-transparent to-[rgba(10,10,15,0.95)]
              pointer-events-none"></div>
</div>
```

---

## 7. Анимации

### 7.1. Micro-interactions

Reflect использует сдержанные, но заметные анимации:

| Элемент | Анимация | Параметры |
|---------|----------|-----------|
| Навбар | Появление blur при скролле | `transition: 0.3s ease` |
| Карточки | Lift + glow при hover | `transform: translateY(-4px)`, `box-shadow` усиливается |
| Кнопки | Мягкое свечение при hover | `box-shadow: 0 0 20px rgba(124,92,252,0.2)` |
| Ссылки | Underline slide-in | `width: 0 -> 100%` при hover |
| Скриншоты | Выравнивание перспективы | `rotateX/Y -> 0` при hover |
| Портал (hero) | Непрерывная пульсация | `scale` + `opacity` loop |

### 7.2. Scroll-анимации (Intersection Observer / GSAP)

```js
// Появление секций при скролле (стиль Reflect)
gsap.from('.feature-card', {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.features-section',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
})

// Параллакс для hero-фона
gsap.to('.hero-glow', {
  y: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
})
```

### 7.3. Анимация портала (hero)

```js
// Пульсация glow-элемента
gsap.to('.portal-glow', {
  scale: 1.1,
  opacity: 0.6,
  duration: 3,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true
})

// Мерцание частиц
gsap.to('.portal-particle', {
  opacity: 'random(0.2, 0.8)',
  scale: 'random(0.8, 1.2)',
  duration: 'random(1.5, 3)',
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  stagger: {
    each: 0.2,
    from: 'random'
  }
})
```

### 7.4. CSS-анимации

```css
/* Мягкая пульсация glow */
@keyframes reflect-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.portal-glow {
  animation: reflect-pulse 4s ease-in-out infinite;
}

/* Hover lift для карточек */
.feature-card {
  transition:
    transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(124, 92, 252, 0.1);
}
```

---

## 8. Типографика

### 8.1. Шрифты

Reflect использует современные sans-serif шрифты, типичные для продуктового сайта:

| Применение | Шрифт | Fallback |
|------------|-------|----------|
| Заголовки | Inter / собственный sans-serif | `system-ui, -apple-system, sans-serif` |
| Основной текст | Inter | `system-ui, sans-serif` |
| Код / моно | JetBrains Mono / SF Mono | `ui-monospace, monospace` |

### 8.2. Типографическая шкала

```css
/* Типографическая система в стиле Reflect */
:root {
  --font-display: 'Inter', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

/* Hero заголовок */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em; /* Отрицательный tracking для крупного текста */
  color: #ffffff;
}

/* Подзаголовок секции */
.section-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.6);
}

/* Мелкие лейблы */
.label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.05em; /* Положительный tracking для мелкого текста */
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}
```

### 8.3. Ключевые правила типографики

1. **Отрицательный letter-spacing для заголовков** — `-0.02em` до `-0.04em` для текста > 32px. Крупный текст визуально расползается без negative tracking.
2. **Положительный letter-spacing для лейблов** — `0.05em` до `0.1em` для текста < 14px в uppercase.
3. **Line-height зависит от размера** — 1.1 для hero, 1.4 для body, 1.6 для подзаголовков.
4. **Контраст через opacity, а не через цвет** — вместо разных серых используется один белый цвет с разной прозрачностью.
5. **Font-weight:** минимальное количество весов (400, 500, 600) — без bold/800.

---

## 9. Общее ощущение (feel) и premium-эффект

### 9.1. Что создаёт ощущение «дорого»

| Фактор | Реализация в Reflect |
|--------|---------------------|
| **Пространство** | Огромные отступы. Контент не прижат к краям. Breathing room. |
| **Скорость** | Сайт загружается быстро. Анимации плавные (60fps). Нет лагов. |
| **Консистентность** | Единая палитра, единые скругления, единые тени. Нет случайных значений. |
| **Детали** | Каждый hover-эффект продуман. Transitions на всём, что может измениться. |
| **Сдержанность** | Глассморфизм не перегружен. 2-3 glass-элемента на viewport, не больше. |
| **Градиенты как подсветка** | Градиенты не заполняют, а подсвечивают. Они тонкие и на фоне. |
| **Фотография / скриншоты** | Высокое качество. Обработка: десатурация, тонирование в палитру. |
| **Типографика** | Крупные заголовки, чистые линии, отрицательный tracking. |

### 9.2. Антипаттерны (чего Reflect избегает)

- Яркие кричащие цвета
- Перегруженные секции с десятком элементов
- Стоковые фотографии
- Толстые borders и тяжёлые тени
- Анимации ради анимаций (всё имеет цель)
- Glass-on-glass (наложение стеклянных слоёв)
- Полностью прозрачные элементы (всегда есть фон, хотя бы `0.03-0.05` alpha)

### 9.3. Эмоциональная карта

```
Спокойствие ────────────────── Энергия
     ███████░░░░░░░░░░░░░░░░
     (~30% — ближе к спокойствию)

Минимализм ────────────────── Деталировка
     ████████████░░░░░░░░░░░
     (~55% — минималистично, но с деталями)

Строгость ─────────────────── Игривость
     ██████████░░░░░░░░░░░░░
     (~45% — строго, но не формально)

Темнота ───────────────────── Свет
     █████████████████░░░░░░
     (~75% — доминирует тёмная тема)
```

---

## 10. Применимость к портфолио

### 10.1. Что можно перенять

#### A. Glass-навбар с blur при скролле

```vue
<script setup lang="ts">
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-[rgba(10,10,15,0.7)] backdrop-blur-2xl border-b border-white/[0.06]'
      : 'bg-transparent'"
  >
    <!-- nav content -->
  </nav>
</template>
```

#### B. Glass feature-карточки для проектов

```vue
<template>
  <div
    class="group relative bg-white/[0.04] backdrop-blur-xl
           border border-white/[0.08] rounded-2xl p-6
           shadow-[0_8px_32px_rgba(0,0,0,0.3)]
           hover:-translate-y-1
           hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(124,92,252,0.1)]
           transition-all duration-400 ease-out"
  >
    <!-- Скриншот проекта -->
    <div class="rounded-xl overflow-hidden mb-4">
      <img
        :src="project.thumbnail"
        :alt="project.title"
        class="w-full saturate-[0.85] brightness-95
               group-hover:saturate-100 group-hover:brightness-100
               transition-[filter] duration-500"
      />
    </div>

    <!-- Контент -->
    <h3 class="text-lg font-semibold text-white mb-2">
      {{ project.title }}
    </h3>
    <p class="text-sm text-white/50 leading-relaxed">
      {{ project.description }}
    </p>

    <!-- Теги -->
    <div class="flex gap-2 mt-4">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="text-xs text-white/40 bg-white/[0.06] px-2 py-1 rounded-md"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
```

#### C. Glow-подсветка hero-секции

```vue
<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[500px] h-[500px] rounded-full
             bg-[radial-gradient(circle,rgba(124,92,252,0.15),rgba(80,50,180,0.05)_40%,transparent_70%)]
             blur-[60px] animate-pulse-slow pointer-events-none"
    ></div>

    <!-- Контент -->
    <div class="relative z-10 text-center">
      <h1 class="text-5xl font-semibold text-white tracking-tight leading-tight">
        <!-- заголовок -->
      </h1>
    </div>
  </section>
</template>
```

#### D. Мягкий разделитель секций

```html
<div class="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-20"></div>
```

### 10.2. Рекомендации для тёмного портфолио

1. **Фон** — не чисто-чёрный. Используй `#0A0A0F` или `#0D0D14` — это даёт глубину и позволяет glass-эффектам работать.

2. **Glass-элементы** — ограничь до 2-3 на viewport. Навбар + карточки проектов + CTA — достаточно. Не стеклить всё подряд.

3. **Acent-цвет** — один фиолетовый (или другой на выбор) для CTA, hover, glow. Правило 10%.

4. **Текст** — только белый с разной opacity. Не подбирай серые оттенки вручную; `text-white/50`, `text-white/70`, `text-white/90` — достаточно.

5. **Анимации** — subtle и functional. Каждая анимация должна отвечать на вопрос: «Зачем она здесь?» Если ответа нет — удалить.

6. **Скриншоты проектов** — десатурировать + тонировать в палитру. На hover — восстановить исходные цвета. Это создаёт визуальное единство.

7. **Performance** — `backdrop-filter` тяжёлый. На мобильных сократить blur до 6-8px или заменить полупрозрачным solid-цветом. Не анимировать элементы с `backdrop-filter`.

8. **Fallback** — для браузеров без поддержки `backdrop-filter` (редкие, но бывают):

```css
@supports not (backdrop-filter: blur(1px)) {
  .glass-card {
    background: rgba(17, 17, 24, 0.95);
  }
}
```

### 10.3. Итоговый чеклист

- [ ] Фон: тёмный, не чёрный (`#0A0A0F`)
- [ ] Навбар: прозрачный -> glass при скролле
- [ ] Hero: glow-подсветка + крупная типографика
- [ ] Карточки проектов: glass-стиль с hover-lift
- [ ] Разделители: gradient-fade, не solid-линии
- [ ] Типографика: Inter, negative tracking для заголовков
- [ ] Цвета: один accent + белый с opacity
- [ ] Анимации: scroll-reveal + hover-transitions
- [ ] Скриншоты: десатурация + fade-края
- [ ] Performance: ограниченный blur, fallbacks

---

## Источники

- [Reflect.app](https://reflect.app/) — официальный сайт
- [Reflect.app Re-Design на Dribbble](https://dribbble.com/shots/21339985-Reflect-app-Re-Design) — дизайн-кейс Oguz Yagiz Kara
- [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f) — статья о тёмном глассморфизме
- [NN/g: Glassmorphism Definition and Best Practices](https://www.nngroup.com/articles/glassmorphism/) — UX-рекомендации
- [How to implement glassmorphism with CSS (LogRocket)](https://blog.logrocket.com/implement-glassmorphism-css/) — техническая реализация
- [Glassmorphism with Tailwind CSS (FlyonUI)](https://flyonui.com/blog/glassmorphism-with-tailwind-css/) — Tailwind-реализация
- [Josh W. Comeau: Frosted glass with backdrop-filter](https://www.joshwcomeau.com/css/backdrop-filter/) — глубокий разбор backdrop-filter
- [Glass UI Generator](https://ui.glass/generator/) — интерактивный CSS-генератор

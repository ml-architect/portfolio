# Linear.app — Анализ глассморфизма и дизайн-системы

> Детальный разбор дизайна [Linear](https://linear.app) — эталонного примера современного тёмного UI с элементами глассморфизма. Материал собран для применения в тёмном портфолио-сайте.

---

## 1. Обзор

### Что такое Linear

Linear — инструмент управления проектами для инженерных команд. Создан Карри Саариненом (Karri Saarinen, ранее — дизайн-система Airbnb). Linear стал нарицательным названием для целого направления в UI-дизайне — **«Linear-style design»**.

### Почему считается эталоном

- **Для инженеров, инженерами.** Тёмный UI основан на привычных средах разработки (тёмные IDE), минимизирует нагрузку на глаза и расход батареи.
- **Безупречная детализация.** Каждый пиксель продуман: микроанимации, тонкие градиенты, продуманная иерархия.
- **Влияние на индустрию.** Породил тренд «Linear-style»: тёмный фон, жирная типографика, сложные градиенты, глассморфизм, монохромные цвета, высокий контраст.
- **Открытая тематизация.** Более 70 пользовательских тем на [linear.style](https://linear.style/).

### Ключевые дизайн-принципы

| Принцип | Реализация |
|---------|-----------|
| Линейность | Прямое взаимодействие, минимум выборов |
| Тёмный режим по умолчанию | Профессиональный, сфокусированный UI |
| Монохромность | Минимум ярких цветов, акцент — через контраст |
| Типографическая иерархия | Bold заголовки, приглушённый вторичный текст |
| Микро-motion | Subtle анимации для обратной связи |

---

## 2. Цветовая схема

### 2.1. Система генерации цветов

Linear использует **LCH-цветовое пространство** вместо HSL. Преимущество LCH — перцептуальная равномерность: красный и жёлтый с одинаковой светлотой (Lightness = 50) выглядят одинаково яркими для глаза.

Вместо 98 переменных для каждой темы определяются **три базовых значения**:

| Переменная | Назначение |
|-----------|-----------|
| **Base color** | Основной цвет фона и поверхностей |
| **Accent color** | Цвет акцентов (кнопки, активные элементы) |
| **Contrast** | Степень контрастности темы |

Из этих трёх значений генерируются все производные: тени, границы, elevated-поверхности.

### 2.2. Брендовая палитра

Linear использует пять основных цветов:

| Название | Hex | RGB | Применение |
|----------|-----|-----|-----------|
| **Indigo** (основной бренд) | `#5E6AD2` | `94, 106, 210` | Акцентный цвет, логотип, ссылки, CTA |
| **Woodsmoke** (тёмный фон) | `#1B1B1E` | `27, 27, 30` | Основной фон приложения |
| **Oslo Gray** (нейтральный) | `#8A8F98` | `138, 143, 152` | Вторичный текст, иконки |
| **Black Haze** (светлый нейтральный) | `#F7F8F8` | `247, 248, 248` | Текст в тёмной теме, фон в светлой |
| **White** | `#FFFFFF` | `255, 255, 255` | Основной текст в тёмной теме |

### 2.3. Палитра тёмной темы (реконструкция)

```css
:root {
  /* === Фоны === */
  --bg-page:         #0A0A0B;   /* Основной фон страницы */
  --bg-surface:      #131316;   /* Поверхность карточек, панелей */
  --bg-elevated:     #1B1B1F;   /* Приподнятые элементы (модалки, тултипы) */
  --bg-overlay:      #222228;   /* Overlay, dropdown */

  /* === Текст === */
  --text-primary:    #EDEDEF;   /* Основной текст */
  --text-secondary:  #8A8F98;   /* Вторичный текст (Oslo Gray) */
  --text-tertiary:   #5C5F66;   /* Третичный текст, плейсхолдеры */
  --text-accent:     #5E6AD2;   /* Акцентный текст (Indigo) */

  /* === Границы === */
  --border-default:  rgba(255, 255, 255, 0.06);  /* Стандартная граница */
  --border-hover:    rgba(255, 255, 255, 0.10);  /* Граница при hover */
  --border-active:   rgba(255, 255, 255, 0.15);  /* Граница активного элемента */
  --border-accent:   rgba(94, 106, 210, 0.40);   /* Акцентная граница */

  /* === Акцент (Indigo) === */
  --accent:          #5E6AD2;   /* Основной акцент */
  --accent-hover:    #6C78DB;   /* Hover-состояние акцента */
  --accent-subtle:   rgba(94, 106, 210, 0.15);  /* Фоновый акцент */
}
```

### 2.4. Правило глубины через цвет

В тёмной теме тени практически невидимы. Linear создаёт глубину через **градацию фонов**:

```
Layer 0 (страница): #0A0A0B — самый тёмный
Layer 1 (карточка):  #131316 — +5 яркости
Layer 2 (вложенный): #1B1B1F — ещё +5 яркости
Layer 3 (overlay):   #222228 — ещё +5 яркости
```

Каждый следующий слой — чуть светлее и чуть менее насыщен.

### 2.5. Эволюция палитры (2024-2025)

В редизайне 2024-2025 Linear:
- Сократил использование синего (chrome) в расчётах цветовой системы
- Перешёл от монохромного синего к **монохромному чёрно-белому** с ещё меньшим количеством ярких цветов
- Увеличил контраст: текст и нейтральные иконки стали **светлее** в тёмном режиме

---

## 3. Элементы глассморфизма

### 3.1. Навигация (Top Navigation Bar)

Навигационная панель Linear — классический пример subtle glass:

```css
.linear-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;

  /* Стекло */
  background: rgba(10, 10, 11, 0.70);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);

  /* Нижняя граница — тонкая линия света */
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  /* Без выраженных теней */
  padding: 0 24px;
  height: 64px;
}
```

**Принципы:**
- Полупрозрачный фон с blur — контент «просвечивает» при скролле
- Минимальная граница снизу — имитация ребра стекла
- Высокая прозрачность фона (0.70-0.80) — навбар не должен быть непроницаемым
- Saturate — усиливает цвета под стеклом, делая blur более «живым»

### 3.2. Command Palette (Cmd+K)

Command palette — ключевой UI-паттерн Linear. Модальное окно с поиском по всему приложению:

```css
/* Overlay за модалкой */
.command-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.50);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 100;
}

/* Само модальное окно */
.command-palette {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 640px;
  max-height: 480px;

  /* Glass-эффект — чуть светлее фона для «foreground» */
  background: rgba(27, 27, 30, 0.92);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;

  /* Мягкая тень для отделения от overlay */
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 16px 48px rgba(0, 0, 0, 0.50),
    0 4px 16px rgba(0, 0, 0, 0.30);

  overflow: hidden;
}

/* Поле ввода */
.command-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 20px;
  color: #EDEDEF;
  font-size: 16px;
}

/* Элемент списка результатов */
.command-item {
  padding: 8px 20px;
  border-radius: 6px;
  transition: background 0.1s ease;
}

.command-item:hover,
.command-item[data-selected] {
  background: rgba(255, 255, 255, 0.06);
}
```

**Принципы:**
- Модалка **чуть светлее** фона — создаёт ощущение «передний план»
- Overlay затемняет и блюрит — фокус на command palette
- Высокий blur (20px) + saturate на модалке
- Минимальный blur (2px) на overlay

### 3.3. Карточки и панели

```css
.linear-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;

  transition: all 0.2s ease;
}

.linear-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.10);
}

/* Карточка с акцентным glow */
.linear-card-featured {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(94, 106, 210, 0.20);
  border-radius: 12px;
  padding: 20px;

  box-shadow:
    0 0 20px rgba(94, 106, 210, 0.08),
    0 0 40px rgba(94, 106, 210, 0.04);
}
```

**Принципы:**
- Минимальная прозрачность фона (0.03-0.05) — карточки «еле заметны» на фоне
- Граница — единственный чёткий разделитель слоёв
- На hover — плавное увеличение прозрачности фона и границы
- Featured-карточки — glow через box-shadow с акцентным цветом

### 3.4. Тултипы и dropdown

```css
.linear-tooltip {
  background: rgba(30, 30, 35, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 6px 12px;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.40),
    0 0 0 1px rgba(255, 255, 255, 0.04);

  font-size: 13px;
  color: #EDEDEF;
}

.linear-dropdown {
  background: rgba(25, 25, 30, 0.95);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 4px;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.50),
    0 2px 8px rgba(0, 0, 0, 0.30),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

### 3.5. Боковая панель (Sidebar)

```css
.linear-sidebar {
  width: 240px;
  height: 100vh;
  background: rgba(10, 10, 11, 0.50);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-right: 1px solid rgba(255, 255, 255, 0.04);
  padding: 16px 8px;
}

.sidebar-item {
  padding: 6px 12px;
  border-radius: 6px;
  color: #8A8F98;
  font-size: 14px;
  transition: all 0.15s ease;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #EDEDEF;
}

.sidebar-item.active {
  background: rgba(255, 255, 255, 0.06);
  color: #EDEDEF;
}
```

---

## 4. CSS-техники

### 4.1. Основные свойства глассморфизма

| Свойство | Значения Linear | Назначение |
|----------|----------------|-----------|
| `backdrop-filter: blur()` | 8px — 20px | Размытие фона за элементом |
| `backdrop-filter: saturate()` | 150% — 180% | Усиление цветов за стеклом |
| `background: rgba()` | alpha 0.03 — 0.95 | Полупрозрачный фон |
| `border` | 1px solid rgba(255,255,255, 0.04-0.15) | Имитация ребра стекла |
| `box-shadow` | Множественные, rgba(0,0,0, ...) | Глубина и отделение слоёв |
| `border-radius` | 6px — 16px | Скруглённые углы |

### 4.2. Таблица прозрачности по элементам

| Элемент | Background alpha | Blur | Saturate |
|---------|-----------------|------|----------|
| Навигация | 0.70 — 0.80 | 12px | 150% |
| Command Palette | 0.90 — 0.95 | 20px | 180% |
| Dropdown/Popover | 0.90 — 0.95 | 16px | 150% |
| Тултип | 0.92 — 0.95 | 8px | — |
| Sidebar | 0.40 — 0.60 | 12px | — |
| Карточка | 0.03 — 0.05 | — | — |
| Overlay | 0.40 — 0.60 | 2px | — |

### 4.3. Fallback для старых браузеров

```css
.glass-element {
  /* Fallback — сплошной фон, если backdrop-filter не поддерживается */
  background: #1B1B1F;
}

@supports (backdrop-filter: blur(10px)) {
  .glass-element {
    background: rgba(27, 27, 30, 0.80);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
  }
}
```

### 4.4. Производительность

- `backdrop-filter` триггерит GPU-композитинг — может влиять на производительность на слабых устройствах
- Ограничивать glass-эффект **ключевыми элементами**: навбар, модалки, тултипы
- Избегать стекинга нескольких blur-слоёв друг на друге
- Для статичных фонов можно запекать blur в само изображение

---

## 5. Glow и свечение

### 5.1. Accent Glow (кнопки и активные элементы)

```css
.linear-button-primary {
  background: #5E6AD2;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;

  /* Glow */
  box-shadow:
    0 0 12px rgba(94, 106, 210, 0.30),
    0 0 4px rgba(94, 106, 210, 0.20);

  transition: all 0.2s ease;
}

.linear-button-primary:hover {
  background: #6C78DB;
  box-shadow:
    0 0 20px rgba(94, 106, 210, 0.40),
    0 0 8px rgba(94, 106, 210, 0.30);
}
```

### 5.2. Gradient Glow (hero-секция)

```css
/* Радиальный glow на фоне hero */
.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(94, 106, 210, 0.15) 0%,
    rgba(94, 106, 210, 0.05) 40%,
    transparent 70%
  );

  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

/* Вариант с несколькими цветами */
.hero-glow-multi {
  background:
    radial-gradient(
      ellipse at 30% 50%,
      rgba(94, 106, 210, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 70% 30%,
      rgba(139, 92, 246, 0.08) 0%,
      transparent 50%
    );
}
```

### 5.3. Border Glow (карточки)

```css
/* Glow-граница для featured элементов */
.glow-border {
  position: relative;
}

.glow-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(94, 106, 210, 0.40),
    rgba(94, 106, 210, 0.05) 40%,
    transparent 60%,
    rgba(94, 106, 210, 0.10)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### 5.4. Cursor Glow (интерактивный)

```typescript
// Glow, следующий за курсором на карточке
function handleMouseMove(e: MouseEvent, card: HTMLElement) {
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  card.style.setProperty('--mouse-x', `${x}px`)
  card.style.setProperty('--mouse-y', `${y}px`)
}
```

```css
.cursor-glow-card {
  position: relative;
  overflow: hidden;
}

.cursor-glow-card::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  left: var(--mouse-x, 50%);
  top: var(--mouse-y, 50%);
  transform: translate(-50%, -50%);

  background: radial-gradient(
    circle,
    rgba(94, 106, 210, 0.12) 0%,
    transparent 60%
  );

  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor-glow-card:hover::after {
  opacity: 1;
}
```

---

## 6. Типографика

### 6.1. Шрифты

| Контекст | Шрифт | Стиль |
|----------|-------|-------|
| **Заголовки (Landing)** | Inter Display | Semi-Bold / Bold, tight tracking |
| **UI текст** | Inter | Regular / Medium |
| **Код** | Системный monospace / JetBrains Mono | Regular |

**Inter** выбран за:
- Отличную читаемость на экранах (оптимизирован для 11-16px)
- Широкий набор начертаний (100-900)
- Variable font — плавная регулировка веса
- Open-source и бесплатный

### 6.2. Размеры и начертания

```css
/* Hero заголовок (Landing page) */
.hero-title {
  font-family: 'Inter Display', 'Inter', sans-serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 600;
  letter-spacing: -0.03em;    /* Negative tracking для крупного текста */
  line-height: 1.05;
  color: #FFFFFF;
}

/* Подзаголовок */
.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.5;
  color: #8A8F98;
}

/* Секционный заголовок */
.section-title {
  font-family: 'Inter Display', 'Inter', sans-serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #EDEDEF;
}

/* Тело текста */
.body-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.65;
  color: #8A8F98;
}

/* Мелкий текст / метаданные */
.caption {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.4;
  color: #5C5F66;
}

/* ALL-CAPS лейблы */
.label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #5C5F66;
}
```

### 6.3. Иерархия текста через цвет (а не только размер)

| Уровень | Цвет | Tailwind-аналог | Использование |
|---------|------|-----------------|--------------|
| Primary | `#FFFFFF` / `#EDEDEF` | `text-white` / `text-zinc-100` | Заголовки, ключевые элементы |
| Secondary | `#8A8F98` | `text-zinc-400` | Описания, body text |
| Tertiary | `#5C5F66` | `text-zinc-500` | Метаданные, плейсхолдеры |
| Disabled | `#3A3A42` | `text-zinc-600` | Неактивные элементы |
| Accent | `#5E6AD2` | кастомный | Ссылки, активные элементы |

### 6.4. Рекомендации для тёмной темы

- **Medium или Semi-Bold** для body text — лучше видимость без ощущения тяжести
- Никогда не использовать тёмный текст на тёмном glass
- `#FFFFFF` (чистый белый) — только для самого важного элемента на экране
- Шрифты Inter, Roboto, SF Pro — лучшие для тёмного фона благодаря чёткости

---

## 7. Микроанимации

### 7.1. Hover-эффекты

```css
/* Кнопка — мягкое осветление */
.linear-btn {
  transition: all 0.15s ease;
}
.linear-btn:hover {
  filter: brightness(1.1);
}
.linear-btn:active {
  transform: scale(0.97);
  filter: brightness(0.95);
}

/* Карточка — подъём фона и границы */
.linear-card {
  transition: background 0.2s ease, border-color 0.2s ease;
}
.linear-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.10);
}

/* Навигационная ссылка — подчёркивание */
.nav-link {
  position: relative;
  transition: color 0.15s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0%;
  height: 1px;
  background: #5E6AD2;
  transition: width 0.2s ease;
}
.nav-link:hover {
  color: #EDEDEF;
}
.nav-link:hover::after {
  width: 100%;
}
```

### 7.2. Появление элементов (Enter animations)

```typescript
// Модальное окно — scale + fade
gsap.fromTo('.modal',
  { opacity: 0, scale: 0.96, y: 8 },
  { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power3.out' }
)

// Dropdown — slide down + fade
gsap.fromTo('.dropdown',
  { opacity: 0, y: -8 },
  { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
)

// Тултип — fade + slight move
gsap.fromTo('.tooltip',
  { opacity: 0, y: 4 },
  { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }
)

// Карточки — staggered entrance
gsap.from('.card', {
  scrollTrigger: { trigger: '.cards-grid', start: 'top 80%' },
  opacity: 0,
  y: 24,
  duration: 0.5,
  stagger: 0.08,
  ease: 'power3.out'
})
```

### 7.3. Scroll-анимации (Landing page)

```typescript
// Заголовки — SplitText по словам
const split = new SplitText('.section-title', { type: 'words' })
gsap.from(split.words, {
  scrollTrigger: { trigger: '.section-title', start: 'top 85%' },
  opacity: 0,
  y: 20,
  stagger: 0.04,
  duration: 0.6,
  ease: 'power3.out'
})

// Параллакс декоративных элементов
gsap.to('.gradient-orb', {
  scrollTrigger: { trigger: '.gradient-orb', scrub: 1.5 },
  y: -100,
  ease: 'none'
})

// Feature-секции — fade + slide
gsap.from('.feature-block', {
  scrollTrigger: { trigger: '.feature-block', start: 'top 80%' },
  opacity: 0,
  x: -30,
  duration: 0.7,
  ease: 'power3.out'
})
```

### 7.4. Transitions

| Элемент | Duration | Easing | Свойства |
|---------|----------|--------|----------|
| Hover кнопки | 0.15s | ease | background, color, filter |
| Hover карточки | 0.2s | ease | background, border-color, box-shadow |
| Появление модалки | 0.25s | power3.out | opacity, scale, y |
| Появление dropdown | 0.2s | power2.out | opacity, y |
| Появление тултипа | 0.15s | power2.out | opacity, y |
| Скрытие элемента | 0.1s — 0.15s | ease-in | opacity |
| Scroll-entrance | 0.5s — 0.7s | power3.out | opacity, y, x |

**Принцип:** Появление медленнее, чем исчезновение. Входящие элементы — `ease-out`, уходящие — `ease-in`.

---

## 8. Фоны и градиенты

### 8.1. Основной фон страницы

```css
body {
  background-color: #0A0A0B;
  color: #EDEDEF;
}
```

Не чистый `#000000` — в фоне присутствует минимальный тёплый оттенок.

### 8.2. Mesh-градиент (Hero-секция)

```css
.hero-background {
  position: relative;
  background: #0A0A0B;
  overflow: hidden;
}

.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;

  background:
    /* Основной gradient orb — индиго */
    radial-gradient(
      ellipse 50% 50% at 50% 0%,
      rgba(94, 106, 210, 0.12) 0%,
      transparent 60%
    ),
    /* Вторичный — фиолетовый */
    radial-gradient(
      ellipse 40% 40% at 30% 20%,
      rgba(139, 92, 246, 0.06) 0%,
      transparent 50%
    ),
    /* Третичный — тёплый */
    radial-gradient(
      ellipse 30% 30% at 70% 60%,
      rgba(236, 72, 153, 0.04) 0%,
      transparent 50%
    );

  pointer-events: none;
}
```

### 8.3. Noise-текстура

```css
/* SVG-шум поверх всей страницы */
.noise-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;  /* Очень subtle — 2.5% */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
```

**Или через отдельный PNG:**

```css
.noise-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url('/textures/noise.png');
  background-repeat: repeat;
  background-size: 128px 128px;
  mix-blend-mode: overlay;
}
```

### 8.4. Gradient Streamers (динамические полосы)

Linear использует анимированные «потоки» градиентов для визуального интереса:

```css
.gradient-streamer {
  position: absolute;
  width: 400px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(94, 106, 210, 0.40) 50%,
    transparent 100%
  );
  animation: streamer-move 8s ease-in-out infinite;
}

@keyframes streamer-move {
  0%, 100% { transform: translateX(-100%) rotate(-5deg); opacity: 0; }
  50% { transform: translateX(100%) rotate(5deg); opacity: 1; }
}
```

### 8.5. Сфера логотипа (Gradient Sphere)

Логотип Linear — градиентная фиолетовая сфера. На landing page она анимируется:

```css
.gradient-sphere {
  width: 120px;
  height: 120px;
  border-radius: 50%;

  background: radial-gradient(
    circle at 35% 35%,
    #8B7FE8 0%,
    #5E6AD2 30%,
    #4C51BF 60%,
    #3730A3 100%
  );

  box-shadow:
    0 0 40px rgba(94, 106, 210, 0.30),
    0 0 80px rgba(94, 106, 210, 0.15),
    inset -8px -8px 16px rgba(0, 0, 0, 0.20),
    inset 4px 4px 8px rgba(255, 255, 255, 0.10);
}
```

---

## 9. Spacing и layout

### 9.1. Система отступов

Linear придерживается **8px-сетки** с шагом 4px для мелких элементов:

| Токен | Значение | Применение |
|-------|----------|-----------|
| `space-1` | 4px | Минимальный зазор (иконка-текст) |
| `space-2` | 8px | Внутренний padding мелких элементов |
| `space-3` | 12px | Padding кнопок, зазоры в списках |
| `space-4` | 16px | Стандартный padding карточек |
| `space-5` | 20px | Увеличенный padding |
| `space-6` | 24px | Gap между карточками |
| `space-8` | 32px | Отступы между блоками |
| `space-10` | 40px | Секционные отступы |
| `space-12` | 48px | Крупные секционные отступы |
| `space-16` | 64px | Вертикальные секционные отступы |
| `space-20` | 80px | Landing page section padding |
| `space-24` | 96px | Крупные секционные разделители |
| `space-32` | 128px | Hero-секция, крупные секции |

### 9.2. Layout Landing Page

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}

/* Секции */
.section {
  padding: 96px 0;   /* space-24 сверху и снизу */
}

@media (max-width: 768px) {
  .section {
    padding: 64px 0;  /* space-16 на мобильных */
  }
}
```

### 9.3. Сетка карточек

```css
/* Feature-grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;   /* space-6 */
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### 9.4. Border-radius система

| Элемент | Radius |
|---------|--------|
| Мелкие элементы (бейджи, теги) | 4px — 6px |
| Кнопки, инпуты | 6px — 8px |
| Карточки, dropdown | 10px — 12px |
| Модальные окна | 12px — 16px |
| Hero-блоки, крупные секции | 16px — 24px |

**Правило вложенных скруглений:**
```
inner_radius = outer_radius - gap
```

---

## 10. Применимость к портфолио

### 10.1. Что конкретно перенять

| Паттерн | Приоритет | Реализация для портфолио |
|---------|-----------|-------------------------|
| **Glass navbar** | Высокий | Фиксированный навбар с `backdrop-filter: blur(12px)` и `rgba()` фоном |
| **Цветовая система через LCH/OKLCH** | Высокий | 3 переменные (base, accent, contrast) → генерация палитры |
| **Accent glow на CTA** | Высокий | `box-shadow` с rgba акцентного цвета на главных кнопках |
| **Градиентные орбы на hero** | Высокий | Radial gradients с blur для hero-фона |
| **Noise-текстура** | Средний | SVG noise overlay с opacity 2-3% |
| **Card hover с border glow** | Средний | `border-color` transition + subtle glow на hover |
| **SplitText scroll reveals** | Высокий | GSAP SplitText для заголовков секций |
| **Staggered card entrance** | Высокий | GSAP ScrollTrigger + stagger для карточек проектов |
| **Cursor glow на карточках** | Средний | CSS переменные `--mouse-x/y` + radial gradient pseudo-element |
| **Command palette (Cmd+K)** | Низкий | Опционально — для навигации по портфолио и блогу |
| **Gradient border (featured cards)** | Средний | CSS mask-composite для gradient-бордера featured проектов |
| **LCH-основанная палитра** | Средний | CSS `lch()` для более равномерных цветов |

### 10.2. Конкретная палитра для портфолио (на основе Linear)

```css
:root {
  /* Фоны */
  --bg-primary:     #0A0A0B;
  --bg-secondary:   #111113;
  --bg-tertiary:    #1A1A1E;
  --bg-elevated:    #222227;

  /* Текст */
  --text-primary:   #EDEDEF;
  --text-secondary: #8A8F98;
  --text-muted:     #5C5F66;

  /* Акцент (можно заменить на свой бренд-цвет) */
  --accent:         #5E6AD2;
  --accent-light:   #7C85E0;
  --accent-glow:    rgba(94, 106, 210, 0.20);

  /* Границы */
  --border:         rgba(255, 255, 255, 0.06);
  --border-hover:   rgba(255, 255, 255, 0.12);

  /* Glass */
  --glass-bg:       rgba(10, 10, 11, 0.75);
  --glass-blur:     blur(12px) saturate(150%);
  --glass-border:   1px solid rgba(255, 255, 255, 0.06);
}
```

### 10.3. Tailwind CSS v4 конфигурация

```css
/* В assets/css/main.css или tailwind конфигурации */
@theme {
  --color-bg-primary:   #0A0A0B;
  --color-bg-secondary: #111113;
  --color-bg-tertiary:  #1A1A1E;
  --color-bg-elevated:  #222227;

  --color-text-primary:   #EDEDEF;
  --color-text-secondary: #8A8F98;
  --color-text-muted:     #5C5F66;

  --color-accent:       #5E6AD2;
  --color-accent-light: #7C85E0;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

### 10.4. Чего НЕ копировать

- **Полную сложность LCH-системы** — для портфолио достаточно фиксированной палитры
- **Overuse blur** — glass-эффект только для навбара, модалок, тултипов. Карточки — без blur
- **Слишком приглушённый дизайн** — портфолио должно быть ярче и выразительнее, чем рабочий инструмент
- **Серый текст для всего** — важные тексты (hero, заголовки проектов) должны быть яркими

---

## Источники

- [Linear Brand Guidelines](https://linear.app/brand)
- [How we redesigned the Linear UI (part II)](https://linear.app/now/how-we-redesigned-the-linear-ui)
- [Linear Style — Custom Themes](https://linear.style/)
- [Linear Brand Color Palette — Mobbin](https://mobbin.com/colors/brand/linear)
- [The rise of Linear style design — Medium](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)
- [Linear design: The SaaS design trend — LogRocket](https://blog.logrocket.com/ux-design/linear-design/)
- [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026 — Medium](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- [Glassmorphism CSS Generator — Glass UI](https://ui.glass/generator/)
- [Linear Design System — Figma Community](https://www.figma.com/community/file/1222872653732371433/linear-design-system)
- [Linear App Style Landing Page Collection — Figma Community](https://www.figma.com/community/file/1367670334751609522/linear-app-style-landing-page-collection-50-sections-100-editable-free)

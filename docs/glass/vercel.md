# Vercel.com --- Анализ глассморфизма и тёмного дизайна

> **URL:** https://vercel.com
> **Тип:** Developer-платформа для деплоя (Frontend Cloud)
> **Дизайн-система:** Geist (https://vercel.com/geist)
> **Стиль:** Тёмная тема, subtle glass, gradient glow, high-contrast UI

---

## 1. Обзор

Vercel --- эталон developer-ориентированного тёмного дизайна. Сайт сочетает минималистичную эстетику с продуманными деталями: gradient glow-эффекты, полупрозрачные поверхности, чёткая типографика и анимации, подчинённые принципу "clarify cause and effect".

Ключевые визуальные характеристики:
- **Глубокий чёрный фон** с многоуровневой системой серых поверхностей
- **Gradient glow** --- цветовые акценты через радиальные градиенты и свечения
- **Subtle glass** --- сдержанный глассморфизм (навбар, карточки, модалки)
- **Geist** --- собственная типографика и дизайн-система
- **Призматические градиенты** --- фирменный приём с преломлением света (prism)

---

## 2. Глассморфизм-элементы

Vercel применяет глассморфизм сдержанно --- как инструмент для создания глубины и иерархии, а не как декоративный приём.

### 2.1. Навигационная панель (Navbar)

Навбар --- главный glass-элемент на сайте. Полупрозрачный фон с backdrop-blur, контент просвечивает при скролле.

```css
/* Примерная реконструкция навбара Vercel */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

Характеристики:
- Полупрозрачный чёрный фон (`rgba(0, 0, 0, 0.5)`)
- `backdrop-filter: blur(12px)` --- средний уровень размытия
- `saturate(180%)` --- усиление насыщенности для визуального интереса
- Тонкая нижняя граница для отделения от контента
- Без box-shadow (чистота линий)

### 2.2. Карточки (Feature Cards)

Карточки используют subtle glass --- полупрозрачный фон на 1--2 уровня светлее основного, с тонкой границей.

```css
/* Карточка в стиле Vercel */
.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 200ms ease;
}

.feature-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}
```

Особенности:
- Фон едва заметно отличается от основного (3--5% белого)
- Граница крайне тонкая (`rgba(255,255,255, 0.06)`)
- Hover увеличивает контраст границы
- Скругление 12px (среднее)
- Нет выраженного blur --- это "плоский glass", а не frosted glass

### 2.3. Модальные окна и Dropdown-меню

```css
/* Dropdown в стиле Vercel */
.dropdown {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow:
    0 16px 70px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}
```

### 2.4. Command Palette (Cmd+K)

Command palette --- ещё один glass-элемент с выраженным blur и глубокой тенью.

```css
/* Command Palette */
.command-palette {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(255, 255, 255, 0.1);
}

/* Overlay за Command Palette */
.command-overlay {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}
```

---

## 3. Geist Design System

### 3.1. Шрифты

Vercel разработала два фирменных шрифта:

- **Geist Sans** --- гротеск с геометрическими принципами. Для заголовков, body-текста, UI-элементов.
- **Geist Mono** --- моноширинный шрифт. Для кода, терминала, технических интерфейсов.

Оба поддерживают полный спектр начертаний (100--900).

```css
/* Подключение Geist */
@font-face {
  font-family: 'Geist Sans';
  src: url('/fonts/GeistVF.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'Geist Mono';
  src: url('/fonts/GeistMonoVF.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

### 3.2. Компоненты

Geist включает полный набор UI-компонентов: кнопки, инпуты, карточки, таблицы, тосты, модалки, command palette и др. Все компоненты поддерживают тёмную и светлую темы.

### 3.3. Токены (Design Tokens)

Система токенов включает:
- **Background** --- 2 уровня фона (Background 1 для основного, Background 2 для дифференциации)
- **Surface** --- 3 уровня для компонентов
- **Border** --- 3 уровня для границ
- **Gray** --- полная шкала серых
- **Gray Alpha** --- серые с прозрачностью (ключевое для glass)
- **Accent** --- цветовые акценты

---

## 4. Цветовая схема

### 4.1. Основная палитра (Dark Theme)

```
Фоны:
  --background-100:     #000000     /* Основной фон страницы */
  --background-200:     #0a0a0a     /* Вторичный фон (subtle) */

Поверхности (Surface):
  --gray-100:           #111111     /* Карточки, секции */
  --gray-200:           #1a1a1a     /* Hover-состояния */
  --gray-300:           #333333     /* Активные элементы */

Границы (Border):
  --border-100:         rgba(255, 255, 255, 0.06)   /* Тонкие разделители */
  --border-200:         rgba(255, 255, 255, 0.10)   /* Границы карточек */
  --border-300:         rgba(255, 255, 255, 0.15)   /* Hover-границы */

Текст:
  --text-primary:       #ededed     /* Основной текст */
  --text-secondary:     #a1a1a1     /* Вторичный текст */
  --text-tertiary:      #666666     /* Приглушённый текст */

Акценты:
  --accent-blue:        #0070f3     /* Основной акцент (Blue Ribbon) */
  --accent-cyan:        #00dfd8     /* Дополнительный акцент */
  --accent-purple:      #7928ca     /* Градиентный акцент */
  --accent-pink:        #ff0080     /* Градиентный акцент */
  --accent-orange:      #f5a623     /* Warning */
  --accent-red:         #e00       /* Error */
  --accent-green:       #0070f3     /* Success */
```

### 4.2. Серая шкала (Geist Gray Scale)

```
--gray-000:  #000000
--gray-100:  #111111
--gray-200:  #1a1a1a
--gray-300:  #333333
--gray-400:  #444444
--gray-500:  #666666
--gray-600:  #888888
--gray-700:  #999999
--gray-800:  #eaeaea
--gray-900:  #fafafa
```

### 4.3. Gray Alpha (полупрозрачные серые)

Ключевая система для glass-эффектов --- серые с прозрачностью:

```css
--gray-alpha-100: rgba(255, 255, 255, 0.03);
--gray-alpha-200: rgba(255, 255, 255, 0.06);
--gray-alpha-300: rgba(255, 255, 255, 0.10);
--gray-alpha-400: rgba(255, 255, 255, 0.15);
--gray-alpha-500: rgba(255, 255, 255, 0.25);
--gray-alpha-600: rgba(255, 255, 255, 0.40);
```

### 4.4. Правило 60-30-10

- **60%** --- Чёрный/почти чёрный фон (#000, #0a0a0a)
- **30%** --- Серые поверхности и текст (#111, #1a1a1a, #ededed)
- **10%** --- Акцентные цвета (Blue Ribbon #0070f3, градиенты)

---

## 5. CSS-техники

### 5.1. Backdrop-filter

```css
/* Уровни blur в Vercel */

/* Навбар --- средний blur */
backdrop-filter: blur(12px) saturate(180%);

/* Модалки --- усиленный blur */
backdrop-filter: blur(16px) saturate(150%);

/* Command Palette --- максимальный blur */
backdrop-filter: blur(24px) saturate(200%);

/* Overlay --- лёгкий blur */
backdrop-filter: blur(4px);

/* Совместимость Safari */
-webkit-backdrop-filter: blur(12px) saturate(180%);
```

### 5.2. Box-shadow для глубины

Vercel использует многослойные тени для создания глубины:

```css
/* Карточка приподнятая */
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.05),    /* Тонкий outline */
  0 2px 4px rgba(0, 0, 0, 0.2),           /* Близкая тень */
  0 12px 40px rgba(0, 0, 0, 0.3);         /* Дальняя тень */

/* Модалка / dropdown */
box-shadow:
  0 16px 70px rgba(0, 0, 0, 0.5),         /* Глубокая тень */
  0 0 0 1px rgba(255, 255, 255, 0.05);    /* Ring */
```

### 5.3. Gradient Borders

Техника создания полупрозрачных gradient-бордеров через `border-image` или `::before` с `background`:

```css
/* Метод 1: border-image */
.gradient-border {
  border: 1px solid transparent;
  border-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.03)
  ) 1;
}

/* Метод 2: pseudo-element + mask (более гибкий) */
.gradient-border-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.gradient-border-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

/* Метод 3: conic-gradient для анимированного бордера */
.rotating-border {
  position: relative;
}

.rotating-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 30%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 70%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
  animation: rotate-border 4s linear infinite;
}

@keyframes rotate-border {
  to { --angle: 360deg; }
}
```

---

## 6. Glow-эффекты

### 6.1. Ambient Glow (фоновое свечение)

Vercel использует большие радиальные градиенты для создания ambient glow --- мягкого свечения за контентом.

```css
/* Фоновое свечение за hero-секцией */
.hero-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.hero-glow::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 112, 243, 0.15) 0%,
    rgba(121, 40, 202, 0.08) 40%,
    transparent 70%
  );
  filter: blur(60px);
}
```

### 6.2. Card Glow (свечение карточек)

При hover за карточкой появляется цветное свечение:

```css
/* Glow за карточкой при hover */
.card-with-glow {
  position: relative;
}

.card-with-glow::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(0, 112, 243, 0.1),
    transparent 40%
  );
  z-index: -1;
  opacity: 0;
  transition: opacity 300ms ease;
}

.card-with-glow:hover::after {
  opacity: 1;
}
```

### 6.3. Spotlight Effect (эффект прожектора)

Vercel применяет эффект "прожектора", который следует за курсором:

```css
/* Spotlight, следующий за курсором */
.spotlight-container {
  position: relative;
  overflow: hidden;
}

.spotlight-container::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.06) 0%,
    transparent 60%
  );
  transform: translate(
    calc(var(--mouse-x, 0px) - 200px),
    calc(var(--mouse-y, 0px) - 200px)
  );
  pointer-events: none;
  transition: transform 0ms;
}
```

```javascript
// JS для отслеживания курсора
const container = document.querySelector('.spotlight-container');
container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  container.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  container.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
});
```

### 6.4. Prismatic Gradient (фирменный эффект Vercel)

Hero-секция Vercel использует призматический градиент --- имитацию преломления света через призму.

```css
/* Призматический градиент */
.prism-gradient {
  background: linear-gradient(
    135deg,
    #ff0080 0%,
    #7928ca 25%,
    #0070f3 50%,
    #00dfd8 75%,
    #f5a623 100%
  );
  /* Для текста */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

/* Анимированный gradient text */
.animated-gradient-text {
  background: linear-gradient(
    90deg,
    #ff0080,
    #7928ca,
    #0070f3,
    #00dfd8,
    #ff0080
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  to {
    background-position: 200% center;
  }
}
```

---

## 7. Анимации

### 7.1. Принципы анимации Vercel

Vercel следует строгой иерархии:

1. **CSS** --- предпочтительный способ (transitions, animations)
2. **Web Animations API** --- для сложных случаев
3. **JavaScript-библиотеки** (motion, GSAP) --- только когда CSS недостаточно

Ключевые правила:
- Использовать только compositor-friendly свойства: `transform`, `opacity`
- Избегать свойств, вызывающих reflow: `width`, `height`, `top`, `left`
- Никогда не использовать `transition: all` --- указывать конкретные свойства
- Анимации должны быть отменяемыми пользовательским вводом
- Не использовать autoplay --- анимировать в ответ на действия

### 7.2. Hover-эффекты

```css
/* Карточка --- subtle hover */
.card {
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 200ms ease, background-color 200ms ease;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0.03);
}

/* Кнопка --- увеличение контраста на hover */
.button-primary {
  background: #fff;
  color: #000;
  border-radius: 6px;
  padding: 8px 16px;
  transition: opacity 200ms ease;
}

.button-primary:hover {
  opacity: 0.9;
}

/* Навигационная ссылка --- direction-aware highlight */
.nav-link {
  position: relative;
  padding: 8px 12px;
}

.nav-highlight {
  position: absolute;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  transition: transform 200ms ease, width 200ms ease, height 200ms ease;
  pointer-events: none;
}
```

### 7.3. Page Transitions

```css
/* Fade-in при загрузке */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease, transform 300ms ease;
}

/* Fade-out */
.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity 200ms ease;
}
```

### 7.4. Scroll Animations

```css
/* Элементы появляются при скролле */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease, transform 600ms ease;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 7.5. Easing-функции

Vercel использует кастомные easing-функции в зависимости от типа анимации:

```css
/* Для входящих элементов */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Для исходящих элементов */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);

/* Для hover-переходов */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);

/* Стандартная длительность */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-enter: 400ms;
```

---

## 8. Gradient Borders

### 8.1. Fade-to-transparent Border

Наиболее характерный для Vercel паттерн --- бордер, который затухает сверху вниз:

```css
/* Верхняя граница ярче, нижняя --- прозрачная */
.fade-border-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  overflow: hidden;
}

.fade-border-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.01) 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### 8.2. Glow Border на Hover

```css
/* Градиентный бордер с glow на hover */
.glow-border-card {
  position: relative;
  background: #111;
  border-radius: 12px;
  padding: 24px;
}

.glow-border-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: linear-gradient(
    135deg,
    rgba(0, 112, 243, 0.3),
    rgba(121, 40, 202, 0.3),
    rgba(255, 0, 128, 0.3)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
  opacity: 0;
  transition: opacity 300ms ease;
}

.glow-border-card:hover::before {
  opacity: 1;
}

/* Внешнее свечение */
.glow-border-card::after {
  content: '';
  position: absolute;
  inset: -20px;
  border-radius: 32px;
  background: linear-gradient(
    135deg,
    rgba(0, 112, 243, 0.05),
    rgba(121, 40, 202, 0.05),
    rgba(255, 0, 128, 0.05)
  );
  filter: blur(20px);
  z-index: -1;
  opacity: 0;
  transition: opacity 300ms ease;
}

.glow-border-card:hover::after {
  opacity: 1;
}
```

### 8.3. Accent-color Border

```css
/* Бордер с акцентным цветом (Blue Ribbon) */
.accent-border {
  border: 1px solid transparent;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(
      180deg,
      #0070f3 0%,
      rgba(0, 112, 243, 0.2) 100%
    ) border-box;
  border-radius: 12px;
}
```

---

## 9. Типографика

### 9.1. Geist Sans --- характеристики

- **Стиль:** Современный геометрический гротеск
- **Начертания:** 100--900 (variable font)
- **Назначение:** UI, заголовки, body-текст
- **Особенность:** Высокая читаемость на экранах, чистые формы

### 9.2. Типографическая шкала

```css
/* Типографическая шкала Vercel (приблизительная) */

/* Display --- для hero-секций */
.text-display {
  font-family: 'Geist Sans', -apple-system, sans-serif;
  font-size: 64px;     /* 4rem */
  line-height: 1.1;
  letter-spacing: -0.04em;  /* Отрицательный трекинг для крупного текста */
  font-weight: 700;
}

/* Heading 1 */
.text-h1 {
  font-size: 48px;     /* 3rem */
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 700;
}

/* Heading 2 */
.text-h2 {
  font-size: 36px;     /* 2.25rem */
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 600;
}

/* Heading 3 */
.text-h3 {
  font-size: 24px;     /* 1.5rem */
  line-height: 1.3;
  letter-spacing: -0.015em;
  font-weight: 600;
}

/* Body (Large) */
.text-body-lg {
  font-size: 18px;     /* 1.125rem */
  line-height: 1.6;
  letter-spacing: -0.01em;
  font-weight: 400;
}

/* Body */
.text-body {
  font-size: 16px;     /* 1rem */
  line-height: 1.6;
  letter-spacing: 0;
  font-weight: 400;
}

/* Small */
.text-small {
  font-size: 14px;     /* 0.875rem */
  line-height: 1.5;
  letter-spacing: 0;
  font-weight: 400;
}

/* Caption */
.text-caption {
  font-size: 12px;     /* 0.75rem */
  line-height: 1.5;
  letter-spacing: 0.01em;  /* Положительный трекинг для мелкого текста */
  font-weight: 400;
}

/* Code */
.text-code {
  font-family: 'Geist Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: 0;
}
```

### 9.3. Принципы типографики

- **Отрицательный letter-spacing для крупного текста** --- заголовки display/h1/h2 используют `letter-spacing: -0.02em .. -0.04em`
- **Нулевой или положительный для мелкого текста** --- body и caption не имеют сжатого трекинга
- **Line-height 1.1--1.2 для заголовков** --- плотный интерлиньяж
- **Line-height 1.5--1.6 для body** --- комфортный для чтения
- **font-weight 700 для display** --- жирный, но не Extra Bold
- **Контрастность текста:** основной (#ededed) --- ~13:1, вторичный (#a1a1a1) --- ~6:1 на чёрном фоне

---

## 10. Применимость к портфолио

### 10.1. Что перенять

1. **Сдержанный глассморфизм** --- использовать glass только на навбаре, модалках и command palette. Карточки --- subtle glass (3--5% белого фона) без выраженного blur.

2. **Gray Alpha система** --- использовать `rgba(255, 255, 255, 0.03..0.15)` для создания слоёв вместо жёстких hex-цветов. Это даёт визуальную глубину без конфликтов.

3. **Gradient glow как акцент** --- один-два ambient glow на странице (hero, ключевая секция). Не злоупотреблять --- glow должен быть "discovered, not imposed".

4. **Gradient borders** --- fade-to-transparent бордеры (ярче сверху, затухают вниз) --- отличный приём для карточек.

5. **Типографика** --- отрицательный letter-spacing для заголовков, Geist или аналогичный геометрический гротеск.

6. **Hover = увеличение контраста** --- не менять цвет, а увеличивать контрастность границ/фонов.

7. **CSS-first анимации** --- `transform` и `opacity`, кастомные easing, короткие длительности (150--300ms).

### 10.2. Конкретные компоненты для портфолио

```css
/* === Навбар портфолио (в стиле Vercel) === */
.portfolio-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 100;
}

/* === Карточка проекта === */
.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 200ms ease, background-color 200ms ease;
}

.project-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0.05);
}

/* === Hero Glow === */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(0, 112, 243, 0.12) 0%,
    rgba(121, 40, 202, 0.06) 40%,
    transparent 70%
  );
  filter: blur(80px);
  pointer-events: none;
}

/* === Градиентный текст для заголовка === */
.hero-title {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.6) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

### 10.3. Tailwind CSS v4 --- утилиты

```html
<!-- Навбар -->
<nav class="fixed top-0 w-full bg-black/50 backdrop-blur-[12px] backdrop-saturate-[180%]
            border-b border-white/[0.06] z-50">
  <!-- ... -->
</nav>

<!-- Карточка -->
<div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6
            hover:border-white/[0.12] hover:bg-white/[0.05]
            transition-[border-color,background-color] duration-200 ease-out">
  <!-- ... -->
</div>

<!-- Ambient glow -->
<div class="absolute top-[-30%] left-1/2 -translate-x-1/2
            w-[600px] h-[600px] rounded-full
            bg-[radial-gradient(circle,_rgba(0,112,243,0.12)_0%,_transparent_70%)]
            blur-[80px] pointer-events-none">
</div>
```

### 10.4. Чего избегать

- **Излишний blur** --- на Vercel blur используется точечно (навбар, модалки), не повсеместно
- **Gradient banding** --- при fade to dark CSS-маски могут давать полосы; тестировать на разных мониторах
- **Glass on glass** --- не накладывать glass-элементы друг на друга
- **Чрезмерные glow** --- один-два glow на viewport, не больше
- **Цветной текст** --- основной текст всегда белый/серый, цвет --- только для акцентов и ссылок

---

## Источники

- [Vercel Geist Design System](https://vercel.com/geist)
- [Vercel Geist Colors](https://vercel.com/geist/colors)
- [Vercel Geist Typography](https://vercel.com/geist/typography)
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Vercel Web Interface Guidelines (GitHub)](https://github.com/vercel-labs/web-interface-guidelines)
- [Geist Font](https://vercel.com/font)
- [Geist Colors (CSS variables)](https://github.com/ephraimduncan/geist-colors)
- [Vercel Hero Section Analysis (Hero Gallery)](https://hero.gallery/hero-gallery/vercel)
- [Create gradient text effect like Vercel (DEV)](https://dev.to/mohsenkamrani/create-a-gradient-text-effect-like-vercel-with-css-38g5)
- [Vercel Gradient Animation (Kevin Hufnagl)](https://kevinhufnagl.com/verceltext-gradient/)
- [Build a Glassmorphic Navbar with TailwindCSS](https://www.braydoncoyer.dev/blog/build-a-glassmorphic-navbar-with-tailwindcss-backdrop-filter-and-backdrop-blur)
- [Glow and Glass Effects in Dark Websites (Design Systems Collective)](https://www.designsystemscollective.com/building-glow-and-glass-ui-components-in-dark-themes-css-examples-ae402ade54d2)
- [Vercel-style Navigation Animation (Medium)](https://abubalogun.medium.com/how-to-create-vercel-style-navigation-animation-09d169961f12)
- [CSS in Real World: Recreate Vercel (thvu.dev)](https://www.thvu.dev/blog/css-in-real-world-recreate-vercel-develop-preview-ship-with-tailwind-css)
- [Frosted Glass with backdrop-filter (Josh W. Comeau)](https://www.joshwcomeau.com/css/backdrop-filter/)
- [Glassmorphism UI (v0.dev)](https://v0.dev/chat/glassmorphism-ui-GeKN4hLB7ae)
- [Vercel Brand Colors (Mobbin)](https://mobbin.com/colors/brand/vercel)

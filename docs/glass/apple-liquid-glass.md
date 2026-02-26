# Apple Liquid Glass -- Детальный анализ дизайн-системы

> **Дата анализа:** 26 февраля 2026
> **Контекст:** Apple WWDC 2025 (9 июня 2025), iOS 26, iPadOS 26, macOS Tahoe 26

---

## 1. Обзор

### Что такое Liquid Glass

Liquid Glass -- новый дизайн-язык Apple, представленный на WWDC 2025 9 июня 2025 года. Это единая визуальная система для всех операционных систем Apple: iOS 26, iPadOS 26, macOS Tahoe 26, watchOS 26 и tvOS 26.

Apple описывает Liquid Glass как динамический «материал» (material), который сочетает оптические свойства стекла с ощущением текучести. UI-элементы преломляют контент под собой, отражают окружающий свет и динамически реагируют на движение с помощью бликовых подсветок (specular highlights).

### Истоки

Liquid Glass стал эволюцией glassmorphism-подхода, который Apple применяла ещё в iOS 7 (2013), но теперь доведён до уровня реалистичного стеклянного материала. Технология родилась из тесного сотрудничества команд дизайна и инженерии Apple и использует рендеринг в реальном времени.

### Ключевые принципы

1. **Иерархия** -- элементы управления «парят» над контентом, используя стеклянные слои вместо сплошных блоков
2. **Гармония** -- единый визуальный язык на всех платформах, но с учётом уникальных особенностей каждой
3. **Контент-ориентированность** -- контент всегда на первом месте; стекло подчёркивает, а не заслоняет

---

## 2. Визуальные характеристики

### Преломление (Refraction)

Основной визуальный признак Liquid Glass -- элементы преломляют контент, расположенный под ними, подобно настоящему стеклу. Фон за стеклянным элементом искажается, создавая ощущение линзы.

### Отражение (Reflection)

Стеклянные поверхности отражают окружающий свет. При наклоне устройства (на мобильных) блики перемещаются, реагируя на гироскоп.

### Блики (Specular Highlights)

Яркие блики на краях элементов имитируют отражение источника света на стеклянной поверхности. Интенсивность варьируется от 0.20 до 0.50 opacity.

### Слоистость (Layering)

Liquid Glass строится на слоях:
- **Highlight** -- свет и его движение
- **Shadow** -- глубина и отделение переднего плана от фона
- **Illumination** -- гибкие свойства материала

### Полупрозрачность (Translucency)

Элементы полупрозрачны -- сквозь них просвечивает фон, но размыто. Цвет стекла наследуется от окружающего контента.

### Текучесть (Fluidity)

При прокрутке элементы динамически трансформируются: tab bar сжимается для фокуса на контенте, при обратной прокрутке -- плавно раскрывается.

---

## 3. Технические принципы

### Физика эффекта

В основе визуального эффекта лежит закон Снеллиуса (Snell's Law):

```
n1 * sin(theta1) = n2 * sin(theta2)
```

Где:
- `n1 = 1.0` -- показатель преломления воздуха
- `n2 = 1.5` -- показатель преломления стекла
- `theta` -- угол падения/преломления

Когда свет переходит из одной среды в другую (из воздуха в стекло), он меняет направление. Liquid Glass имитирует этот эффект цифровыми средствами.

### Формы поверхностей

Для разных типов элементов используются разные функции поверхности:
- **Convex Circle (выпуклый круг):** `y = sqrt(1 - (1-x)^2)`
- **Convex Squircle (выпуклый суперэллипс):** `y = (1 - (1-x)^4)^(1/4)`
- **Concave (вогнутый):** `y = 1 - Convex(x)`
- **Lip (комбинация):** смешение выпуклого и вогнутого через smootherstep

### Displacement Map (карта смещения)

Цветовые каналы кодируют направление смещения:
- **Red:** `128 + x * 127` -- смещение по оси X
- **Green:** `128 + y * 127` -- смещение по оси Y
- **Blue:** `128` -- не используется
- **Alpha:** `255` -- полная непрозрачность

Значение 128 является нейтральным (нет смещения). Типичное количество samples: 127 на радиус.

---

## 4. CSS-реализация

### 4.1. Базовый backdrop-filter подход

Простейшая реализация glassmorphism-эффекта:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 20px;
  color: #fff;
}
```

Рекомендуемый диапазон blur: **5-15px** (слишком большое значение выглядит неряшливо).

### 4.2. Продвинутый подход с saturate

Более близкий к Apple эффект с насыщением цветов фона:

```css
.glass {
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(2px) saturate(180%);
  -webkit-backdrop-filter: blur(2px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.2),
    inset 0 4px 20px rgba(255, 255, 255, 0.3);
}
```

Ключевые отличия:
- `saturate(180%)` -- усиливает насыщенность цветов за стеклом
- `inset box-shadow` -- внутреннее свечение для имитации рассеянного света
- Двойной `box-shadow` -- внешняя глубина + внутреннее свечение

### 4.3. Трёхслойная структура (highlight, shadow, illumination)

Максимально приближенная к Apple реализация. Эффект складывается из четырёх вложенных слоёв:

```html
<div class="glass-container">
  <!-- Слой 1: фильтр/рефракция (z-index: 0) -->
  <div class="glass-filter"></div>
  <!-- Слой 2: оверлей / тонировка (z-index: 1) -->
  <div class="glass-overlay"></div>
  <!-- Слой 3: блик (z-index: 2) -->
  <div class="glass-specular"></div>
  <!-- Слой 4: контент (z-index: 3) -->
  <div class="glass-content">
    <!-- Контент -->
  </div>
</div>
```

```css
.glass-container {
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  isolation: isolate;
}

/* Слой фильтра и рефракции */
.glass-filter {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(0px);
  filter: url(#lg-dist);
  z-index: 0;
}

/* Слой оверлея (тонировка) */
.glass-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.25);
  z-index: 1;
}

/* Слой specular highlight (блик) */
.glass-specular {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.75),
    inset 0 0 5px rgba(255, 255, 255, 0.75);
  z-index: 2;
}

/* Слой контента */
.glass-content {
  position: relative;
  padding: 1rem;
  z-index: 3;
}
```

### 4.4. Pseudo-элементы для shine-эффекта

Использование `::after` для создания характерного «жидкого» блика:

```css
.glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  backdrop-filter: blur(1px);
  box-shadow:
    inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
    inset 0px -9px 0px -8px rgba(255, 255, 255, 1);
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px) drop-shadow(10px 4px 6px black) brightness(115%);
  pointer-events: none;
}
```

Что делает каждое свойство:
- `inset box-shadow` с отрицательными значениями -- создаёт тонкие белые блики на краях, имитирующие преломление света
- `filter: blur(1px) drop-shadow(...) brightness(115%)` -- комбинация размытия, тени для глубины и увеличенной яркости
- `opacity: 0.6` -- подсветка остаётся мягкой
- `z-index: -1` -- блик размещается под основным контентом, но над фоном

### 4.5. Анимированный жидкий блик с `::before`

```css
.glass-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.2),
    transparent 70%
  );
  animation: liquidMove 6s infinite linear;
  pointer-events: none;
}

@keyframes liquidMove {
  0% {
    transform: rotate(0deg) translate(10px, 10px);
  }
  25% {
    transform: rotate(90deg) translate(-10px, 10px);
  }
  50% {
    transform: rotate(180deg) translate(-10px, -10px);
  }
  75% {
    transform: rotate(270deg) translate(10px, -10px);
  }
  100% {
    transform: rotate(360deg) translate(10px, 10px);
  }
}
```

### 4.6. SVG-фильтры для refraction

Полноценная рефракция через SVG-фильтры. **Важно:** `backdrop-filter: url(#...)` с SVG работает только в Chromium-браузерах.

#### Минимальный фильтр (turbulence + displacement):

```html
<svg style="display: none">
  <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.008 0.008"
      numOctaves="2"
      seed="92"
      result="noise"
    />
    <feGaussianBlur
      in="noise"
      stdDeviation="2"
      result="blurred"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="blurred"
      scale="70"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>
```

Применение:
```css
.glass-filter {
  filter: url(#lg-dist);
}
```

#### Полный фильтр (turbulence + specular lighting + displacement):

```html
<svg style="display: none">
  <filter id="glass-distortion"
          x="0%" y="0%" width="100%" height="100%"
          filterUnits="objectBoundingBox">
    <!-- 1. Генерация шума -->
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.01 0.01"
      numOctaves="1"
      seed="5"
      result="turbulence"
    />
    <!-- 2. Маппинг каналов -->
    <feComponentTransfer in="turbulence" result="mapped">
      <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
      <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
      <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
    </feComponentTransfer>
    <!-- 3. Размытие шума -->
    <feGaussianBlur
      in="turbulence"
      stdDeviation="3"
      result="softMap"
    />
    <!-- 4. Specular-освещение (блики) -->
    <feSpecularLighting
      in="softMap"
      surfaceScale="5"
      specularConstant="1"
      specularExponent="100"
      lighting-color="white"
      result="specLight">
      <fePointLight x="-200" y="-200" z="300" />
    </feSpecularLighting>
    <!-- 5. Композитинг света -->
    <feComposite
      in="specLight"
      operator="arithmetic"
      k1="0" k2="1" k3="1" k4="0"
      result="litImage"
    />
    <!-- 6. Displacement (рефракция) -->
    <feDisplacementMap
      in="SourceGraphic"
      in2="softMap"
      scale="150"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>
```

#### Фильтр на основе Displacement Map (по Snell's Law):

```html
<svg colorInterpolationFilters="sRGB">
  <filter id="refraction-filter">
    <feImage
      href="displacement-map.png"
      x="0" y="0"
      width="300" height="300"
      result="displacement_map"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="displacement_map"
      scale="30"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>
```

Displacement Map генерируется программно на основе закона Снеллиуса с параметрами:
- Показатель преломления воздуха: `1.0`
- Показатель преломления стекла: `1.5`

### 4.7. Параметры для тонкой настройки

| Параметр | Минимум | Типичное значение | Максимум |
|---|---|---|---|
| Specular Opacity | 0.20 | 0.35 | 0.50 |
| Specular Saturation | 4 | 6 | 9 |
| Refraction Level | 0.70 | 0.85 | 1.00 |
| Blur Level | 0.0 | 0.5 | 1.0 |
| Glass Background Opacity | 0.10 | 0.60 | 0.80 |
| Displacement Scale (SVG) | 30 | 70 | 150 |
| feTurbulence baseFrequency | 0.005 | 0.008-0.01 | 0.02 |
| feGaussianBlur stdDeviation | 1 | 2-3 | 5 |

---

## 5. Цветовая палитра

### Базовые цвета стекла

Liquid Glass использует нейтральную палитру, «наследуя» цвет от окружающего контента:

```css
/* Белое стекло (стандартное) */
--glass-bg: rgba(255, 255, 255, 0.10);
--glass-bg-hover: rgba(255, 255, 255, 0.15);
--glass-border: rgba(255, 255, 255, 0.20);
--glass-border-active: rgba(255, 255, 255, 0.80);
--glass-highlight: rgba(255, 255, 255, 0.75);

/* Тени */
--glass-shadow-outer: rgba(31, 38, 135, 0.20);
--glass-shadow-outer-alt: rgba(0, 0, 0, 0.20);
--glass-shadow-inner: rgba(255, 255, 255, 0.30);

/* Specular */
--glass-specular: rgba(255, 255, 255, 0.75);
--glass-shine: rgba(255, 255, 255, 0.10);
```

### Для тёмной темы

```css
/* Тёмное стекло */
--glass-dark-bg: rgba(17, 25, 40, 0.75);
--glass-dark-bg-alt: rgba(0, 0, 0, 0.40);
--glass-dark-border: rgba(255, 255, 255, 0.10);
--glass-dark-highlight: rgba(255, 255, 255, 0.05);
--glass-dark-shadow: rgba(0, 0, 0, 0.50);
```

### Градиенты

```css
/* Жидкий блик */
background: radial-gradient(
  circle at center,
  rgba(255, 255, 255, 0.2),
  transparent 70%
);

/* Тонкий градиент для бордюра */
border-image: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.4),
  rgba(255, 255, 255, 0.1)
) 1;

/* Верхний блик (top highlight) */
background: linear-gradient(
  180deg,
  rgba(255, 255, 255, 0.15) 0%,
  transparent 50%
);
```

### Правило цвета

Apple придерживается нейтральной палитры (серые, белые, beige тона) для самого стекла, чтобы контент оставался в фокусе. Цвет стекла динамически адаптируется к окружению -- он не фиксированный, а вычисляется на основе фона.

---

## 6. Типографика

### Проблемы текста на стекле

Liquid Glass вызвал значительную критику в сообществе дизайнеров из-за проблем с читаемостью текста:

- Tab bar меню часто сливаются с фоном, делая активную вкладку практически невидимой
- В некоторых приложениях (Music, Contacts) контрастность падала до **1.5:1** при требуемом минимуме **4.5:1** по WCAG
- Белый текст на светло-голубом фоне (например, в заметках Contacts) становился нечитаемым
- В тёмном режиме ситуация лучше, но проблемы сохраняются

### Рекомендации для текста поверх стекла

```css
/* Текст на стекле -- высокая контрастность */
.glass-text {
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 600; /* Semi-bold минимум */
}

/* Заголовки */
.glass-heading {
  color: #ffffff;
  font-weight: 700;
  letter-spacing: -0.02em; /* Отрицательный трекинг для крупного текста */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Второстепенный текст */
.glass-secondary {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}
```

### Правила

1. **Минимальный вес шрифта:** 500 (Medium) для основного текста, 600+ для навигации
2. **text-shadow обязателен** при размещении текста на стеклянной поверхности
3. **Контрастная подложка:** для мелкого текста добавлять полупрозрачную подложку
4. **Размер шрифта:** не менее 14px для текста на стекле
5. **Отрицательный letter-spacing** для заголовков (как Apple в своих интерфейсах)

---

## 7. Анимации и интерактивность

### Hover-эффект подъёма

```css
.glass-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.3),
    inset 0 4px 20px rgba(255, 255, 255, 0.4);
}
```

### Hover-эффект усиления блика

```css
.glass-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.20);
  backdrop-filter: blur(15px) saturate(200%);
  border-color: rgba(255, 255, 255, 0.35);
}
```

### Плавное появление стекла (scroll-triggered)

```css
.glass-card {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.glass-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

### Apple-style tab bar сжатие/расширение

```css
.glass-tabbar {
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  padding: 12px 24px;
}

.glass-tabbar.compact {
  padding: 6px 16px;
  backdrop-filter: blur(20px);
  transform: scale(0.9);
}
```

### Анимация жидкого перелива (GSAP-совместимо)

```css
@keyframes liquidShimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.glass-shimmer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: liquidShimmer 3s ease-in-out infinite;
  pointer-events: none;
  border-radius: inherit;
}
```

### GSAP ScrollTrigger интеграция (для Nuxt)

```typescript
// composables/useGlassAnimation.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGlassAnimation() {
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Появление стеклянных карточек при скролле
    gsap.utils.toArray('.glass-card').forEach((card: any) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
          backdropFilter: 'blur(0px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          backdropFilter: 'blur(10px)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  })
}
```

---

## 8. Accessibility

### Известные проблемы

1. **Контрастность ниже WCAG:** в ряде экранов iOS 26 контрастность составляла 1.5:1 при минимальных 4.5:1 (WCAG 2.1 AA)
2. **Активные вкладки невидимы:** в tab bar активный элемент сливается с фоном
3. **Зависимость от обоев:** читаемость напрямую зависит от выбранных обоев
4. **Мелкий текст нечитаем:** подписи и вспомогательный текст теряются на стеклянном фоне

### Решения Apple (iOS 26.1+)

- **Reduce Transparency** -- добавляет более тёмные фоны к полупрозрачным зонам
- **Increase Contrast** -- увеличивает контрастность, иконки теряют полупрозрачность
- **Tinted (iOS 26.1+)** -- Settings > Display & Brightness > Liquid Glass > Tinted; увеличивает opacity стеклянных элементов
- **Reduce Motion** -- отключает анимации

### Рекомендации для веб-реализации

```css
/* Respect user preference: reduce transparency */
@media (prefers-reduced-transparency: reduce) {
  .glass-card {
    background: rgba(20, 20, 30, 0.95);
    backdrop-filter: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* Respect user preference: reduce motion */
@media (prefers-reduced-motion: reduce) {
  .glass-card,
  .glass-card::before,
  .glass-card::after {
    animation: none !important;
    transition: none !important;
  }
}

/* Respect user preference: increase contrast */
@media (prefers-contrast: more) {
  .glass-card {
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid rgba(255, 255, 255, 0.6);
  }

  .glass-card * {
    text-shadow: none;
    color: #ffffff;
  }
}
```

### Чек-лист доступности

- [ ] Контрастность текста >= 4.5:1 после размытия (проверять на разных фонах)
- [ ] Контрастность крупного текста (18px+) >= 3:1
- [ ] `prefers-reduced-transparency` -- fallback на непрозрачный фон
- [ ] `prefers-reduced-motion` -- отключение анимаций
- [ ] `prefers-contrast: more` -- увеличенная контрастность
- [ ] Не более одного основного glass-слоя на экран (toolbar ИЛИ modal ИЛИ floating panel)
- [ ] Focus-индикаторы видимы поверх стекла
- [ ] Интерактивные элементы имеют чёткие границы

---

## 9. Рекомендации для тёмной темы

### Специфика dark mode

В тёмной теме Liquid Glass работает значительно лучше, чем в светлой, потому что:
- Белые блики более заметны на тёмном фоне
- Контрастность текста выше
- Эффект стекла выразительнее
- Меньше проблем с читаемостью

### CSS для тёмной темы

```css
/* Стекло для тёмной темы */
.dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.dark .glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

### Ключевые значения для тёмной темы

| Свойство | Light | Dark |
|---|---|---|
| `background` alpha | 0.10 - 0.25 | 0.03 - 0.10 |
| `border` alpha | 0.20 - 0.80 | 0.05 - 0.15 |
| `blur` | 2-10px | 10-20px |
| `saturate` | 150-200% | 120-160% |
| Внешний `box-shadow` alpha | 0.15 - 0.25 | 0.30 - 0.50 |
| Внутренний `box-shadow` alpha | 0.20 - 0.40 | 0.03 - 0.10 |

### Принципы тёмной темы

1. **Меньше белого, больше blur:** `background` opacity 0.03-0.10, blur 10-20px
2. **Тонкие бордюры:** alpha не более 0.15
3. **Глубокие тени:** внешние тени темнее и мягче
4. **Минимальный inset glow:** только тонкая верхняя линия с alpha 0.06
5. **Увеличенный blur:** компенсирует более тёмный фон для ощущения глубины

---

## 10. Применимость к портфолио

### Что можно взять для тёмного портфолио-сайта

#### Навигация / Header

```css
.nav-glass {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* При прокрутке -- компактнее (Apple-style) */
.nav-glass.scrolled {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
}
```

#### Карточки проектов

```css
.project-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.10);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Shine-эффект при наведении */
.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.project-card:hover::before {
  left: 100%;
}
```

#### Секции контента / Hero

```css
.hero-glass {
  position: relative;
  padding: 4rem 2rem;
}

.hero-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 2rem;
  z-index: -1;
}
```

#### Кнопки

```css
.btn-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
  font-weight: 500;
  transition: all 0.25s ease;
  cursor: pointer;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.20);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.btn-glass:active {
  transform: scale(0.97);
  background: rgba(255, 255, 255, 0.06);
}
```

#### Модальные окна / Tooltip

```css
.modal-glass {
  background: rgba(15, 15, 25, 0.80);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

### Конкретные рекомендации

1. **Навигация** -- glass navbar с `blur(20px)`, компактнее при прокрутке (GSAP ScrollTrigger)
2. **Hero-секция** -- тонкий glass-фон за текстом, shimmer-анимация при скролле
3. **Карточки проектов** -- glass-border + hover-подъём + shine-sweep
4. **Skills/Tech stack** -- маленькие glass-плашки с иконками
5. **Блог** -- glass-контейнеры для превью постов
6. **Footer** -- glass-разделитель или полностью glass-секция
7. **Не перегружать:** максимум 2-3 glass-элемента в видимой области одновременно

### Чего избегать

- Не применять glass к каждому элементу -- эффект потеряет ценность
- Не использовать SVG refraction-фильтры -- поддержка только в Chrome
- Не делать blur > 20px -- потеря деталей фона
- Не забывать `-webkit-backdrop-filter` для Safari
- Не использовать `backdrop-filter` без fallback
- Не размещать мелкий текст (< 14px) на стекле без подложки

### Tailwind CSS v4 утилиты

Для Tailwind CSS v4, используемого в проекте:

```html
<!-- Базовая стеклянная карточка -->
<div class="relative bg-white/5 backdrop-blur-lg border border-white/8
            rounded-2xl shadow-lg shadow-black/30
            transition-all duration-300 ease-out
            hover:bg-white/8 hover:border-white/12 hover:-translate-y-1">
  <!-- Контент -->
</div>

<!-- Glass navbar -->
<nav class="fixed inset-x-0 top-0 z-50
            bg-black/30 backdrop-blur-xl
            border-b border-white/6">
  <!-- Навигация -->
</nav>

<!-- Glass button -->
<button class="bg-white/8 backdrop-blur-md
               border border-white/12 rounded-xl
               px-6 py-3 text-white font-medium
               transition-all duration-250
               hover:bg-white/14 hover:border-white/20
               active:scale-97">
  Кнопка
</button>
```

---

## Совместимость браузеров

| Свойство | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| `backdrop-filter: blur()` | 76+ | 103+ | 9+ | 79+ |
| `-webkit-backdrop-filter` | -- | -- | 9+ | -- |
| `backdrop-filter: url(#svg)` | 76+ | Нет | Нет | 79+ |
| `filter: url(#svg)` | Да | Да | Да | Да |
| `prefers-reduced-transparency` | 118+ | 113+ | 17.5+ | 118+ |

**Общая поддержка `backdrop-filter`:** ~97% (декабрь 2024).

SVG-фильтры через `backdrop-filter: url(#...)` работают только в Chromium. Для кроссбраузерности рекомендуется использовать CSS-only подход (blur + saturate + box-shadow).

---

## Источники

- [Apple Newsroom -- Liquid Glass announcement](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Apple Developer Documentation -- Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass)
- [Meet Liquid Glass -- WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- [CSS-Tricks -- Getting Clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)
- [kube.io -- Liquid Glass in the Browser: Refraction with CSS and SVG](https://kube.io/blog/liquid-glass-css-svg/)
- [DEV.to -- Apple's Liquid Glass UI design + CSS guide](https://dev.to/gruszdev/apples-liquid-glass-revolution-how-glassmorphism-is-shaping-ui-design-in-2025-with-css-code-1221)
- [DEV.to -- Recreating Apple's Liquid Glass Effect with Pure CSS](https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl)
- [DEV.to -- Apple Liquid Glass Effect with CSS and SVG](https://dev.to/fabiosleal/how-to-create-the-apple-liquid-glass-effect-with-css-and-svg-2o06)
- [DEV.to -- Liquid Glass Effect for Portfolio](https://dev.to/jerophin_be9c10e686b76186/how-i-added-apples-liquid-glass-effect-to-my-portfolio-react-css-tricks-3gbk)
- [Pimp My Type -- Apple's Liquid Glass Shatters Typography](https://pimpmytype.com/liquid-glass/)
- [Designed for Humans -- Liquid Glass Accessibility](https://designedforhumans.tech/blog/liquid-glass-smart-or-bad-for-accessibility)
- [Infinum -- iOS 26 Liquid Glass Accessibility](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/)
- [Six Colors -- Soaping up Liquid Glass](https://sixcolors.com/post/2025/11/soaping-up-liquid-glass-less-transparency-more-contrast/)
- [Liquid Glass -- Wikipedia](https://en.wikipedia.org/wiki/Liquid_Glass)

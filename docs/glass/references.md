# Глассморфизм — Референсы для портфолио

> Коллекция лучших примеров глассморфизма (frosted glass / liquid glass) для вдохновения при реализации стеклянного дизайна сайта-портфолио.

---

## Топ продакшн-сайтов с глассморфизмом

### 1. Apple — Liquid Glass (macOS Tahoe / iOS 26)
- **URL:** https://www.apple.com
- **Контекст:** WWDC 2025 — первый крупный редизайн UI за 10 лет. Liquid Glass стал единой дизайн-системой для iOS 26, iPadOS 26, macOS Tahoe 26.
- **Особенности:** Динамическое преломление света (lensing), адаптивные материалы, трёхслойная структура (highlight, shadow, illumination), gel-like feel элементов.
- **Детальный анализ:** [apple-liquid-glass.md](./apple-liquid-glass.md)

### 2. Linear — Инструмент управления проектами
- **URL:** https://linear.app
- **Контекст:** Один из эталонов современного тёмного UI с элементами глассморфизма. Известен безупречным дизайном и микроанимациями.
- **Особенности:** Тёмная тема, прозрачные панели, glow-эффекты, subtle glass на навигации и модалках.
- **Детальный анализ:** [linear.md](./linear.md)

### 3. Tomorrow.io — Погодная платформа
- **URL:** https://www.tomorrow.io
- **Контекст:** Погодное приложение с выраженным глассморфизмом на главной и API-страницах.
- **Особенности:** Полупрозрачные карточки с weather-данными, blur-фоны, карточки «плавающие» над контентом.
- **Детальный анализ:** [tomorrow-io.md](./tomorrow-io.md)

### 4. Reflect — Приложение для заметок
- **URL:** https://reflect.app
- **Контекст:** Минималистичный сайт с glassmorphism-эстетикой.
- **Особенности:** Полупрозрачные thumbnail-изображения, размытые фоны, спокойный UI.
- **Детальный анализ:** [reflect.md](./reflect.md)

### 5. Robinhood — Финтех-платформа
- **URL:** https://robinhood.com
- **Контекст:** Торговая платформа с premium glass-look.
- **Особенности:** Полупрозрачные виджеты поверх рыночных данных и графиков, high-tech premium feel.
- **Детальный анализ:** [robinhood.md](./robinhood.md)

### 6. Spotify Wrapped — Интерактивный music-recap
- **URL:** https://open.spotify.com/wrapped
- **Контекст:** Ежегодный интерактивный recap с glassmorphism-элементами.
- **Особенности:** Стеклянные overlay-карточки поверх album art, icy background, динамичные фоны.
- **Детальный анализ:** [spotify-wrapped.md](./spotify-wrapped.md)

### 7. Vercel — Платформа для деплоя
- **URL:** https://vercel.com
- **Контекст:** Developer-ориентированный сайт с тёмной темой и subtle glass-эффектами.
- **Особенности:** Gradient glow, полупрозрачные карточки, dark glass aesthetic.
- **Детальный анализ:** [vercel.md](./vercel.md)

---

## CSS/UI коллекции и генераторы

| Ресурс | URL | Описание |
|--------|-----|----------|
| Glass UI Generator | https://ui.glass/generator/ | Интерактивный генератор glassmorphism CSS |
| Hype4 Generator | https://hype4.academy/tools/glassmorphism-generator | CSS генератор со слайдерами |
| Liquid Glass Kit | https://liquidglass-kit.dev | Набор ресурсов для Apple Liquid Glass |
| Liquid Glass CSS Gen | https://liquidglassgen.com | Генератор CSS для iOS-стиля glass |
| 66 CSS Examples | https://freefrontend.com/css-glassmorphism/ | 66 примеров CSS-кода glassmorphism |
| 16 CSS Liquid Glass | https://freefrontend.com/css-liquid-glass/ | Коллекция liquid glass CSS-эффектов |

---

## Дизайн-концепты (Dribbble/Behance)

| Проект | Автор | URL | Стиль |
|--------|-------|-----|-------|
| Banking Fintech Web | Bogusław Podhalicz | https://dribbble.com/shots/15303152 | Glass credit cards |
| Store Dashboard | Ghani Pradita | https://dribbble.com/shots/14915793 | Glass dashboard panels |
| Music Player | Rudi Hartono | https://dribbble.com/shots/15016985 | Glass + neumorphism |
| Header Concept | RH Agency | https://dribbble.com/shots/14778687 | Glass inputs & CTA |
| App Onboarding | Mikołaj Gałęziowski | https://dribbble.com/shots/15256437 | Glass + 3D shapes |
| UI Component Kit | Giuseppe Fasino | https://behance.net/gallery/113924121 | Full glass kit |
| Portfolio Header | Peramita Puja | https://behance.net/gallery/113623921 | Portfolio + 3D character |
| Finely Fintech | Gakh Yuriy | https://behance.net/gallery/111281909 | Glass icons & illustrations |

---

## Ключевые статьи и туториалы

1. **Apple Liquid Glass CSS Guide** — https://dev.to/gruszdev/apples-liquid-glass-revolution-how-glassmorphism-is-shaping-ui-design-in-2025-with-css-code-1221
2. **CSS-Tricks: Clarity on Liquid Glass** — https://css-tricks.com/getting-clarity-on-apples-liquid-glass/
3. **Recreating Liquid Glass with Pure CSS** — https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl
4. **Liquid Glass: Refraction with CSS & SVG** — https://kube.io/blog/liquid-glass-css-svg/
5. **10 Mind-Blowing Examples** — https://onyx8agency.com/blog/glassmorphism-inspiring-examples/
6. **UXPilot: 12 Glassmorphism Features** — https://uxpilot.ai/blogs/glassmorphism-ui

---

## Базовый CSS-сниппет

```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(2px) saturate(180%);
  -webkit-backdrop-filter: blur(2px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.2),
    inset 0 4px 20px rgba(255, 255, 255, 0.3);
}

/* Liquid shine overlay */
.glass-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  backdrop-filter: blur(1px);
  box-shadow:
    inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
    inset 0px -9px 0px -8px rgba(255, 255, 255, 1);
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px) drop-shadow(10px 4px 6px black) brightness(115%);
}
```

### Для тёмной темы

```css
.glass-card-dark {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

---

## Ключевые принципы глассморфизма

1. **Прозрачность + размытие** — `backdrop-filter: blur()` + `rgba()` фон
2. **Слоистость** — элементы «плавают» над контентом, создавая глубину
3. **Тонкие границы** — `border: 1px solid rgba(255,255,255,0.1-0.2)`
4. **Тени для глубины** — `box-shadow` для отделения слоёв
5. **Контрастный текст** — обязательная читаемость на полупрозрачном фоне
6. **Выборочное применение** — glass только для ключевых элементов (навбар, карточки, модалки)
7. **Яркий фон** — глассморфизм работает лучше всего поверх красочных/градиентных фонов
8. **Правило «no glass on glass»** — избегать наложения стеклянных элементов друг на друга
